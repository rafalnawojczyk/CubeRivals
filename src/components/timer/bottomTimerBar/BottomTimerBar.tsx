import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTimeStatsItem } from './BottomTimeStatsItem';
import { calcAvg } from '../../../utils/calcAvg';
import { DIMENSIONS, PADDING } from '../../../styles/base';
import { formatTime } from '../../../utils/formatTime';
import { AverageThresholdsModal } from '../averageThresholdsModal/AverageThresholdsModal';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTimerSettingsStore } from '../../../store/timerSettingsStore';
import { useCurrentSession } from '../../../hooks/useCurrentSession';

const emptyTimePlaceholder = '-- : --';

const getTimeResult = (time: any) => {
    if (time === 'DNF') {
        return 'DNF';
    }

    return formatTime(time);
};

export const BottomTimerBar = () => {
    const currentSession = useCurrentSession();
    const [avgThresholds, cutEndsInAvgs] = useTimerSettingsStore(state => [state.avgThresholds, state.cutEndsInAvgs]);
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

    // TODO: TODO: TODO: add pressable to open edit threshold modal
    return (
        <>
            <View style={[styles.container, { backgroundColor: getColor('backgroundLight') }]}>
                <View style={[styles.statsContainer]}>
                    <BottomTimeStatsItem
                        title={`${trans('best')} `}
                        amount={currentSession.best === 0 ? emptyTimePlaceholder : formatTime(currentSession.best)}
                    />
                    <BottomTimeStatsItem
                        key={Math.random() + avgThresholds[0]}
                        title={`${cutEndsInAvgs ? 'Ao' : 'Mo'}${avgThresholds[0]} `}
                        amount={
                            currentSession.fullAmount < avgThresholds[0]
                                ? emptyTimePlaceholder
                                : getTimeResult(
                                      calcAvg(currentSession.solves.slice(0, avgThresholds[0]), cutEndsInAvgs)
                                  )
                        }
                    />
                </View>
                <View style={[styles.statsContainer]}>
                    <BottomTimeStatsItem
                        title={`${trans('average')} `}
                        amount={
                            currentSession.amount === 0
                                ? emptyTimePlaceholder
                                : formatTime(Math.floor(currentSession.average))
                        }
                    />
                    <BottomTimeStatsItem
                        key={Math.random() + avgThresholds[1]}
                        title={`${cutEndsInAvgs ? 'Ao' : 'Mo'}${avgThresholds[1]} `}
                        amount={
                            currentSession.fullAmount < avgThresholds[1]
                                ? emptyTimePlaceholder
                                : getTimeResult(
                                      calcAvg(currentSession.solves.slice(0, avgThresholds[1]), cutEndsInAvgs)
                                  )
                        }
                    />
                </View>
                <View style={[styles.statsContainer]}>
                    <BottomTimeStatsItem title={`${trans('solves')} `} amount={currentSession.fullAmount.toString()} />
                    <BottomTimeStatsItem
                        key={Math.random() + avgThresholds[2]}
                        title={`${cutEndsInAvgs ? 'Ao' : 'Mo'}${avgThresholds[2]} `}
                        amount={
                            currentSession.fullAmount < avgThresholds[2]
                                ? emptyTimePlaceholder
                                : getTimeResult(
                                      calcAvg(currentSession.solves.slice(0, avgThresholds[2]), cutEndsInAvgs)
                                  )
                        }
                    />
                </View>
                <View style={[styles.statsContainer]}>
                    <BottomTimeStatsItem
                        title={`${trans('deviation')} `}
                        amount={
                            currentSession.amount === 0
                                ? emptyTimePlaceholder
                                : formatTime(Math.floor(currentSession.stdev))
                        }
                    />
                    <BottomTimeStatsItem
                        key={Math.random() + avgThresholds[3]}
                        title={`${cutEndsInAvgs ? 'Ao' : 'Mo'}${avgThresholds[3]} `}
                        amount={
                            currentSession.fullAmount < avgThresholds[3]
                                ? emptyTimePlaceholder
                                : getTimeResult(
                                      calcAvg(currentSession.solves.slice(0, avgThresholds[3]), cutEndsInAvgs)
                                  )
                        }
                    />
                </View>
            </View>
            <AverageThresholdsModal showModal={showEditThresholds} onClose={() => setShowEditThresholds(false)} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: DIMENSIONS.fullWidth * 0.9,
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: PADDING.md,
        marginVertical: PADDING.sm,
        paddingHorizontal: PADDING.m,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 24,
        overflow: 'hidden',
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: PADDING.m,
        alignItems: 'center',
    },
});
