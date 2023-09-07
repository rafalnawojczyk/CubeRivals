import { FlatList, View, Text } from 'react-native';
import { Result } from '../../models/result';
import { TimeListItem } from './TimeListItem';

interface TimesListProps {
    data: Result[];
}

// TODO: keyExtractor should point to _id of result object that is created in DB
export const TimesList = ({ data }: TimesListProps) => {
    const dataLength = data.length;

    return (
        <>
            {data.length > 0 && (
                <FlatList
                    data={data}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}
                    keyExtractor={(_, index) => index + ''}
                    renderItem={({ item }) => <TimeListItem result={item} />}
                />
            )}
            {data.length === 0 && (
                <View>
                    <Text>FALLBACK TEXT</Text>
                    {/* TODO: FALLBACK MESSAGE WITH SOME CUBE ANIMATION? */}
                </View>
            )}
        </>
    );
};
