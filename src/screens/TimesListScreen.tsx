import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useContext } from 'react';
import { UserContext } from '../store/user-context';
import { TimesList } from '../components/timesList/TimesList';
import { Result } from '../models/result';
import { PADDING } from '../styles/base';

const data: Result[] = [
    {
        time: 11215, // in ms
        date: Date.now(), // in ms
        scramble: "R L D U2 R2 B F'",
        note: 'Custom note for testing purposes',
        flag: 'dnf',
    },
    {
        time: 6145, // in ms
        date: Date.now(), // in ms
        scramble: "R L D U2 R2 B F'",
    },
    {
        time: 9415, // in ms
        date: Date.now(), // in ms
        scramble: "R L D U2 R2 B F'",
        note: 'Custom note for testing purposes',
        flag: 'dns',
    },
    {
        time: 64185, // in ms
        date: Date.now(), // in ms
        scramble: "R L D U2 R2 B F'",
        flag: '+2',
    },
];

export const TimesListScreen = () => {
    return (
        <SafeAreaCard>
            <View style={styles.container}>
                <TimesList data={data} />
            </View>
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: PADDING.sm,
    },
});
