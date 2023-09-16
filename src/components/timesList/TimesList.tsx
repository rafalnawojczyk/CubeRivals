import Realm from 'realm';
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
    const [selectedElements, setSelectedElements] = useState<Solve[]>([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<TimesListFilterObj>({});
    const [dataToShow, setDataToShow] = useState<Solve[]>(data ? [...data] : []);
    const trans = useTranslation();

    useEffect(() => {
        setDataToShow(filterAndSortData(filters, search, data));
    }, [search, filters.starred, filters.filter, filters.order]);

    // TODO: each item should be pressable with onLongPress. When its longPressed - it is selected and UI changes to "choose element" -
    // probably show checkbox in unused corner of item, or change whole UI - color clicked elements.
    // if user clicks element that is chosen already - it removes from chosen arr. If chosen arr.length === 0 - back to normal state (no checkbox)
    // when in this state, user can move all selected solves to any other session/cube
    // when moving - delete solves in current session, and add them to new session one after another(to let app recalc best/avg and so on)

    // if there are selected elements - show new bar below topBar which will tell user how many elements are selected and button to deselect, below that show "Move solves to session"

    // Think how to address problem with picking solves and then changing filters. Maybe if filter/session changes - reset all of the selected items?

    // TODO: show flat list horizontally with pressable items that are filters. So if user picks some filters - he can press these tiles and these filters will be removed

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

    return (
        <>
            {(!data || data.length === 0) && <EmptyFallbackAnimation title={trans('itsEmptyHere')} />}
            {dataToShow.length >= 0 && (
                <>
                    <TopTimesListBar filters={filters} search={search} setSearch={setSearch} setFilters={setFilters} />
                    {(!!filters.filter || filters.starred) && (
                        <TimesListFiltersList setFilters={setFilters} filters={filters} />
                    )}
                    {dataToShow.length === 0 && (
                        <EmptyFallbackAnimation
                            renderItem={
                                <LinkButton onPress={() => setFilters({})} title={trans('timesList.resetFilters')} />
                            }
                            title={trans('timesList.noSolvesForFilter')}
                        />
                    )}
                    {dataToShow.length > 0 && (
                        <FlatList
                            data={dataToShow}
                            style={{ flex: 1 }}
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
