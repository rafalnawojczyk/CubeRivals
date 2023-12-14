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
