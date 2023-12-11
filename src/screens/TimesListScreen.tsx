import { StyleSheet, View } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { TimesList } from '../components/timesList/TimesList';
import { PADDING } from '../styles/base';
import { useCurrentSession } from '../hooks/useCurrentSession';
import { TopTimerBar } from '../components/timer/TopTimerBar';

export const TimesListScreen = () => {
    const currentSession = useCurrentSession();

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
