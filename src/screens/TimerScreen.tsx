import { useContext } from 'react';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { Timer } from '../components/timer/Timer';
import { EnhancedTopTimerBar } from '../components/timer/TopTimerBar';
import { BottomTimerBar } from '../components/timer/bottomTimerBar/BottomTimerBar';
import { TimerSettingsContext } from '../store/timer-settings-context';

export const TimerScreen = () => {
    const { timerSettings } = useContext(TimerSettingsContext);
    return (
        <SafeAreaCard>
            <EnhancedTopTimerBar cube={timerSettings.cube} />
            <Timer />
            {/* <BottomTimerBar /> */}
        </SafeAreaCard>
    );
};

// Small indicator of Ao5/Ao12/Ao50/Ao100
//
// Small indicator of Avg/best/ amount of solves/deviation
//
