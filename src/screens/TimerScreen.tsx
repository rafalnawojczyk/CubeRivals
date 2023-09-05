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

// When inspection time is set, first touch will turn 15s timer, and then the same as before to turn timer on(inspection time is stopped once pressed)
//
// DO NOT SAVE CUBE ID - it will be determined in file name? or in file header, determined by cube and group of solves(session name)
// For now store only in state, but later on save in DB and/or in files using expo-file-system
//
// Small indicator of Ao5/Ao12/Ao50/Ao100
//
// Small indicator of Avg/best/ amount of solves/deviation
//
// Settings should have:
// - button to navigate to app settings

// To make bottom tab statistics I need to generate stats somehow.
// Overall stats are pretty easy. Pass whole data array and done.
// Current avg12/avg5/ao50/ao100 is easy - pass amount of data that is needed for that
// Best avg12/avg5/ao50/ao100 - here I need to write things up.
