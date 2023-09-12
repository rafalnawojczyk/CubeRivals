import { StyleSheet, View } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useContext } from 'react';
import { TimesList } from '../components/timesList/TimesList';
import { PADDING } from '../styles/base';
import { useObject } from '@realm/react';
import { Session } from '../models/realm-models/SessionSchema';
import { TimerSettingsContext } from '../store/timer-settings-context';
import { BSON } from 'realm';
import { TopTimerBar } from '../components/timer/TopTimerBar';

export const TimesListScreen = () => {
    const { timerSettings } = useContext(TimerSettingsContext);
    const currentSession = useObject(Session, new BSON.ObjectID(timerSettings.session));

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
