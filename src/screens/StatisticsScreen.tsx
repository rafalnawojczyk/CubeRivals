import { useContext } from 'react';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useObject } from '@realm/react';
import { Session } from '../models/realm-models/SessionSchema';
import { BSON } from 'realm';
import { TimerSettingsContext } from '../store/timer-settings-context';
import { EmptyFallbackAnimation } from '../components/EmptyFallbackAnimation';
import { TopTimerBar } from '../components/timer/TopTimerBar';

export const StatisticsScreen = () => {
    const { timerSettings } = useContext(TimerSettingsContext);

    const currentSession = useObject(Session, new BSON.ObjectID(timerSettings.session));

    return (
        <SafeAreaCard>
            <TopTimerBar />
            {currentSession?.solves.length === 0 && <EmptyFallbackAnimation />}
        </SafeAreaCard>
    );
};
