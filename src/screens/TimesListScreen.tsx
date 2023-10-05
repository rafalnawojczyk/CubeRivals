import { StyleSheet, View } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useContext } from 'react';
import { EnhancedTimesList } from '../components/timesList/TimesList';
import { PADDING } from '../styles/base';
import { EnhancedTopTimerBar } from '../components/timer/TopTimerBar';
import { TimerSettingsContext } from '../store/timer-settings-context';

export const TimesListScreen = () => {
    const { timerSettings } = useContext(TimerSettingsContext);

    return (
        <SafeAreaCard>
            <EnhancedTopTimerBar cube={timerSettings.cube} />
            <View style={styles.container}>
                <EnhancedTimesList cube={timerSettings.cube} />
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
