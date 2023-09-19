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
