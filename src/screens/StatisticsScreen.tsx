import { useContext } from 'react';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { EmptyFallbackAnimation } from '../components/EmptyFallbackAnimation';
import { TopTimerBar } from '../components/timer/TopTimerBar';
import { SolvesContext } from '../store/solves-context';

export const StatisticsScreen = () => {
    const { currentSession } = useContext(SolvesContext);

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

// TODO: Maybe add some kind of weekly/monthly statistics page with text that will be like:
// In past month you've beaten your PB in X events, and you did it X times more than last month, and X times more/less than your overall average. Your main event was 3x3x3 with 9000 measured solves. Event on which you've spent the most time is 6x6x6 - there was 500 solves, but it took you 15000minutes or 199hours.
