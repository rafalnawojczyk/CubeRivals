import { useContext } from 'react';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { EmptyFallbackAnimation } from '../components/EmptyFallbackAnimation';
import { TopTimerBar } from '../components/timer/TopTimerBar';
import { SolvesContext } from '../store/solves-context';

export const StatisticsScreen = () => {
    const { currentSession, sessions } = useContext(SolvesContext);

    console.log(sessions);

    return (
        <SafeAreaCard>
            <TopTimerBar />
            {currentSession?.solves.length === 0 && <EmptyFallbackAnimation />}
        </SafeAreaCard>
    );
};

// Statistics should have at least:
// 1. Graph with rolling avg5/avg12 - it should be a line?
// 2. On the same graph add new PB's and how often they are occurring
// 3. Statistics based on days, not counting every solve?

// TODO: Maybe add some kind of weekly/monthly statistics page with text that will be like:
// In past month you've beaten your PB in X events, and you did it X times more than last month, and X times more/less than your overall average. Your main event was 3x3x3 with 9000 measured solves. Event on which you've spent the most time is 6x6x6 - there was 500 solves, but it took you 15000minutes or 199hours.

// Graphs about how your PB's have changed, daily stats/weekly/monthly stats, grouping solves in a day to see yearly progress, even hourly graphs so you can see on which day of the week/hour of the day is your best time-wise. Also after how much solves/minutes of practicing your stats are the best, so you know if you wears down while you cubing.

// Histogram of times per day/week/ao100/ao1000

// Evolution of stdev as a proportion of solve times

// Average times and stdev by time of day and day of week (the "too tired to cube" effect)

// Average inspection time and correlation between inspection and solve time
