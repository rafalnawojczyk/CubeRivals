import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TimeListItem } from './TimeListItem';
import { Solve } from '../../models/realm-models/SolveSchema';
import Realm from 'realm';
import { EmptyFallbackAnimation } from '../EmptyFallbackAnimation';
import { DIMENSIONS, PADDING } from '../../styles/base';

interface TimesListProps {
    data: Realm.List<Solve> | undefined;
}

export const TimesList = ({ data }: TimesListProps) => {
    const dataLength = data ? data.length : 0;
    const addLastItem = dataLength % 3 === 2;

    const dataToShow = [];

    if (data) {
        dataToShow.push(...data);
    }

    if (addLastItem) {
        dataToShow.push({ _id: Math.random(), isEmptyItem: true });
    }

    return (
        <>
            {!data || data.length === 0 ? (
                <EmptyFallbackAnimation />
            ) : (
                <FlatList
                    data={dataToShow}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item, index }) => {
                        // @ts-ignore
                        if (item?.isEmptyItem) {
                            return <View style={styles.emptyContainer}></View>;
                        }
                        // @ts-ignore
                        return <TimeListItem result={item} />;
                    }}
                />
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
