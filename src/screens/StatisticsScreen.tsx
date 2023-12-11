import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { EmptyFallbackAnimation } from '../components/EmptyFallbackAnimation';
import { TopTimerBar } from '../components/timer/TopTimerBar';

import { useTranslation } from '../hooks/useTranslation';
import { useCurrentSession } from '../hooks/useCurrentSession';

export const StatisticsScreen = () => {
    const currentSession = useCurrentSession();
    const trans = useTranslation();

    return (
        <SafeAreaCard>
            <TopTimerBar />
            {currentSession?.solves.length === 0 && <EmptyFallbackAnimation title={trans('itsEmptyHere')} />}
        </SafeAreaCard>
    );
};

// TODO: Maybe add some kind of weekly/monthly statistics page with text that will be like:
// In past month you've beaten your PB in X events, and you did it X times more than last month, and X times more/less than your overall average. Your main event was 3x3x3 with 9000 measured solves. Event on which you've spent the most time is 6x6x6 - there was 500 solves, but it took you 15000minutes or 199hours.

// Graphs about how your PB's have changed, daily stats/weekly/monthly stats, grouping solves in a day to see yearly progress, even hourly graphs so you can see on which day of the week/hour of the day is your best time-wise. Also after how much solves/minutes of practicing your stats are the best, so you know if you wears down while you cubing.

// Histogram of times per day/week/ao100/ao1000

// Evolution of stdev as a proportion of solve times

// Average times and stdev by time of day and day of week (the "too tired to cube" effect)

// STATS I WILL SHOW:
// 1. Inspection time:(add  inspection/solvetime field in solve?)
//          - inspectionTime // how inspection time differs based on hours/days/weeks/
//          - inspectionTime/solve * 100% // how inspection time impacts solve time
// 2. Solve time:
//          - solveTime // how solve time differs based on hours/days/weeks/
//          -
// 3. Rolling Averages:
//          - DECIDE what to do with rolling averages when there is DNF/DNS? Maybe let user decide to hide these?
//          - avg5/12/50/100 or any other if used specifies other in his profile. On linear graph with dots?
// 4. Standard deviation - should be done the same as rolling averages, and maybe put on the same graph
// 5. Best times changes (each session should have best times array that specify when newBest is set, its time and id of object?)
//          - user will see how ofter his PB changes?
// 6. Amount of solves:
//          - amountOfSolves // how much solves user is doing hourly/daily/weekly
//          - corelation between amountOfSolves and DNFs/DNSs - hourly/daily/weekly
// 7. App uptime on timer screen?
//          - app uptime graph(when user uses timer the most)
//          - corelation between uptime and inspection+Solves to see how much time is wasted on scrambling + idle periods(concentration drops)

// IDEA: Maybe let user decide if the wants to put more stats on one graph? If it has the same X and Y axis(e.g. solveTime/date).
// IDEA: Maybe let user show stats from another session as well? SO he will have two/more lines on graph and can check his times on different sessions(maybe each session has another cube or so, or where he improves the most?)
