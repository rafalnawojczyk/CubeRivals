import { StyleSheet, View } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useContext } from 'react';
import { TimesList } from '../components/timesList/TimesList';
import { PADDING } from '../styles/base';
import { TopTimerBar } from '../components/timer/TopTimerBar';
import { SolvesContext } from '../store/solves-context';

export const TimesListScreen = () => {
    const { currentSession } = useContext(SolvesContext);

    return (
        <SafeAreaCard>
            <TopTimerBar />
            <View style={styles.container}>
                <TimesList data={currentSession?.solves} />
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
