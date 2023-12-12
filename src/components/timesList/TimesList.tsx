import { FlatList, StyleSheet, View } from 'react-native';
import { TimeListItem } from './TimeListItem';
import { Solve } from '../../models/realm-models/SolveSchema';
import { EmptyFallbackAnimation } from '../EmptyFallbackAnimation';
import { DIMENSIONS, PADDING } from '../../styles/base';
import { useEffect, useState } from 'react';
import { TopTimesListBar } from './TopTimesListBar';
import { useTranslation } from '../../hooks/useTranslation';
import { LinkButton } from '../UI/LinkButton';
import { TimesListFiltersList } from './TimesListFiltersList';
import { MoveElementsBar } from './MoveElementsBar';
import { Session } from '../../models/realm-models/SessionSchema';
import { useColors } from '../../hooks/useColors';
import { moveSolves } from '../../models/utils';
import { useCurrentSession } from '../../hooks/useCurrentSession';
import { useRealm } from '@realm/react';

interface TimesListProps {
    data: Realm.List<Solve> | undefined;
}

export type filterType = 'time' | 'createdAt' | 'inspection';

export interface TimesListFilterObj {
    filter?: filterType;
    order?: 'asc' | 'desc';
    starred?: boolean;
}

const filterAndSortData = (filters: TimesListFilterObj, search: string, prevData?: Realm.List<Solve>) => {
    if (!prevData) {
        return [];
    }

    let newData = [...prevData];

    if (search.length > 0 || filters.starred || filters.filter === 'inspection') {
        newData = newData.filter((el: Solve) => {
            let showItem = false;

            if (el.note) {
                showItem = el.note.toLowerCase().includes(search.toLowerCase());
            }

            if (filters.starred) {
                showItem = !!el.star;
            }

            if (filters.filter === 'inspection') {
                showItem = !!el.inspection;
            }
            return showItem;
        });
    }

    if (filters.filter) {
        if (filters.filter === 'time') {
            newData = newData.sort((a: Solve, b: Solve) => {
                if (filters.order === 'asc' && filters.filter) {
                    return a.time - b.time;
                }

                return b.time - a.time;
            });
        }

        if (filters.filter === 'createdAt') {
            newData = newData.sort((a: Solve, b: Solve) => {
                if (filters.order === 'asc' && filters.filter) {
                    return a.createdAt < b.createdAt ? 1 : -1;
                }

                return a.createdAt > b.createdAt ? 1 : -1;
            });
        }
    }

    const dataLength = newData.length;
    const addLastItem = dataLength % 3 === 2;

    if (addLastItem) {
        // @ts-ignore
        newData.push({ _id: Math.random(), isEmptyItem: true });
    }

    return newData;
};

export const TimesList = ({ data }: TimesListProps) => {
    const realm = useRealm();
    const [selectedElements, setSelectedElements] = useState<Solve[]>([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<TimesListFilterObj>({ filter: 'createdAt', order: 'asc' });
    const currentSession = useCurrentSession();
    const trans = useTranslation();
    const getColor = useColors();

    useEffect(() => {
        setSelectedElements([]);
    }, [filters.filter, filters.starred]);

    const selectItemHandler = (item: Solve) => {
        setSelectedElements(prevSelectedElements => {
            if (prevSelectedElements.length === 0) {
                return [item];
            }

            if (prevSelectedElements.find((el: Solve) => el._id.toString() === item._id.toString())) {
                const newSelectedElements = prevSelectedElements.filter(
                    (el: Solve) => el._id.toString() !== item._id.toString()
                );

                return newSelectedElements;
            } else {
                return [...prevSelectedElements, item];
            }
        });
    };

    const moveTimesHandler = (session: Session) => {
        moveSolves(currentSession, session, selectedElements, realm);
        setSelectedElements([]);
    };

    if (!currentSession) {
        return <EmptyFallbackAnimation title={trans('itsEmptyHere')} />;
    }

    return (
        <>
            {(!data || data.length === 0) && <EmptyFallbackAnimation title={trans('itsEmptyHere')} />}
            {currentSession.solves.length >= 0 && (
                <>
                    <TopTimesListBar filters={filters} search={search} setSearch={setSearch} setFilters={setFilters} />
                    {(!!filters.filter || filters.starred) && (
                        <TimesListFiltersList setFilters={setFilters} filters={filters} />
                    )}
                    {selectedElements.length > 0 && (
                        <MoveElementsBar
                            selectedAll={selectedElements.length === currentSession.solves.length}
                            amount={selectedElements.length}
                            onDeselectAll={() => setSelectedElements([])}
                            onSelectAll={() => setSelectedElements(currentSession.solves.map(el => el))}
                            onMoveElements={moveTimesHandler}
                        />
                    )}
                    {currentSession.solves.length === 0 && (
                        <EmptyFallbackAnimation
                            renderItem={
                                <LinkButton
                                    style={{ alignSelf: 'center' }}
                                    textStyle={{ color: getColor('primary200') }}
                                    onPress={() => {
                                        setFilters({});
                                        setSearch('');
                                    }}
                                    title={trans('timesList.resetFilters')}
                                />
                            }
                            title={trans('timesList.noSolvesForFilter')}
                        />
                    )}
                    {currentSession.solves.length > 0 && (
                        <FlatList
                            data={filterAndSortData(filters, search, currentSession.solves)}
                            style={{ flex: 1 }}
                            removeClippedSubviews
                            contentContainerStyle={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: PADDING.sm,
                            }}
                            keyExtractor={item => item._id.toString()}
                            renderItem={({ item }) => {
                                // @ts-ignore
                                if (item.hasOwnProperty('isEmptyItem') && item.isEmptyItem) {
                                    return <View style={styles.emptyContainer}></View>;
                                }

                                return (
                                    <TimeListItem
                                        isSelected={
                                            !!selectedElements.find(
                                                (el: Solve | undefined) => el?._id.toString() === item._id.toString()
                                            )
                                        }
                                        result={item as Solve}
                                        onSelectItem={selectItemHandler}
                                    />
                                );
                            }}
                        />
                    )}
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        height: DIMENSIONS.fullHeight * 0.08,
        marginBottom: PADDING.md,
        borderRadius: 9,
        minWidth: '30%',
        maxWidth: '100%',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
});
