import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { Timer } from '../components/timer/Timer';
import { TopTimerBar } from '../components/timer/TopTimerBar';
import { BottomTimerBar } from '../components/timer/bottomTimerBar/BottomTimerBar';

export const TimerScreen = () => {
    return (
        <SafeAreaCard>
            <TopTimerBar />
            <Timer />
            <BottomTimerBar />
        </SafeAreaCard>
    );
};

// Small indicator of Ao5/Ao12/Ao50/Ao100
//
// Small indicator of Avg/best/ amount of solves/deviation
//
