import { FlatList, View, Text } from 'react-native';
import { TimeListItem } from './TimeListItem';
import { Solve } from '../../models/realm-models/SolveSchema';
import Realm from 'realm';

interface TimesListProps {
    data: Realm.List<Solve> | undefined;
}

export const TimesList = ({ data }: TimesListProps) => {
    return (
        <>
            {!data || data.length === 0 ? (
                <View>
                    <Text>FALLBACK TEXT</Text>
                    {/* TODO: FALLBACK MESSAGE WITH SOME CUBE ANIMATION? */}
                </View>
            ) : (
                <FlatList
                    data={data}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => <TimeListItem result={item} />}
                />
            )}
        </>
    );
};
