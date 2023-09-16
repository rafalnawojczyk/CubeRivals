import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { Timer } from '../components/timer/Timer';
import { TopTimerBar } from '../components/timer/TopTimerBar';

export const TimerScreen = () => {
    return (
        <SafeAreaCard>
            <TopTimerBar />
            <Timer />
        </SafeAreaCard>
    );
};

// Small indicator of Ao5/Ao12/Ao50/Ao100
//
// Small indicator of Avg/best/ amount of solves/deviation
//
