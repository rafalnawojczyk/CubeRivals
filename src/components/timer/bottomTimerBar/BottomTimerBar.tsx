import { useContext, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { BottomTimeStatsItem } from './BottomTimeStatsItem';
import { SolvesContext } from '../../../store/solves-context';
import { calcAvg } from '../../../utils/calcAvg';
import { DIMENSIONS, PADDING } from '../../../styles/base';
import { formatTime } from '../../../utils/formatTime';
import { AverageThresholdsModal } from '../averageThresholdsModal/AverageThresholdsModal';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { TimerSettingsContext } from '../../../store/timer-settings-context';

const emptyTimePlaceholder = '-- : --';

const getTimeResult = (time: any) => {
    if (time === 'DNF') {
        return 'DNF';
    }

    return formatTime(time);
};

export const BottomTimerBar = () => {
    const { currentSession } = useContext(SolvesContext);
    const { timerSettings } = useContext(TimerSettingsContext);
    const [showEditThresholds, setShowEditThresholds] = useState(false);
    const getColor = useColors();
    const trans = useTranslation();

    if (!currentSession) {
        return null;
    }

    // In session there should be an array that will store all rolling averages.
    // those averages needs to be reevaluated if there is change in any solve. If it is change in last 5 solves - just recalc last average.
    // if not in last 5 solves - recalc all rolling averages

    // TODO: this should be optimized in future to save all times that have made certain average. It should save average time, and id's of all saves, so it will be easy to show modal with all times that made this avg possible with scrambles. If user will delete any solve - it should start recalculating average starting from this solve up, so it will save resources.

    return (
        <>
            <View style={styles.container}>
                <View style={[styles.statsContainer, { borderColor: getColor('gray100') }]}>
                    <BottomTimeStatsItem
                        title={`${trans('deviation')}: `}
                        amount={
                            currentSession.amount === 0
                                ? emptyTimePlaceholder
                                : formatTime(Math.floor(currentSession.stdev))
                        }
                    />
                    <BottomTimeStatsItem
                        title={`${trans('average')}: `}
                        amount={
                            currentSession.amount === 0
                                ? emptyTimePlaceholder
                                : formatTime(Math.floor(currentSession.average))
                        }
                    />
                    <BottomTimeStatsItem
                        title={`${trans('best')}: `}
                        amount={currentSession.best === 0 ? emptyTimePlaceholder : formatTime(currentSession.best)}
                    />
                    <BottomTimeStatsItem title={`${trans('solves')}: `} amount={currentSession.fullAmount.toString()} />
                </View>

                <Pressable onPress={() => setShowEditThresholds(true)}>
                    <View style={[styles.statsContainer]}>
                        {timerSettings.avgThresholds.map(threshold => (
                            <BottomTimeStatsItem
                                key={Math.random() + threshold}
                                title={`${timerSettings.cutEndsInAvgs ? 'Ao' : 'Mo'}${threshold}: `}
                                amount={
                                    currentSession.fullAmount < threshold
                                        ? emptyTimePlaceholder
                                        : getTimeResult(
                                              calcAvg(
                                                  currentSession.solves.slice(0, threshold),
                                                  timerSettings.cutEndsInAvgs
                                              )
                                          )
                                }
                            />
                        ))}
                    </View>
                </Pressable>
            </View>
            <AverageThresholdsModal showModal={showEditThresholds} onClose={() => setShowEditThresholds(false)} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: PADDING.sm,
        gap: 4,
    },
    statsContainer: {
        padding: PADDING.sm,
        minWidth: DIMENSIONS.fullWidth * 0.25,
    },
});
