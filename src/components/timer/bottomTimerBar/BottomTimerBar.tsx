import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { BottomTimeStatsItem } from './BottomTimeStatsItem';
import { SolvesContext } from '../../../store/solves-context';
import { calcAvg } from '../../../utils/calcAvg';
import { PADDING } from '../../../styles/base';
import { formatTime } from '../../../utils/formatTime';

const getTimeResult = (time: any) => {
    if (time === 'DNF') {
        return 'DNF';
    }

    return formatTime(time);
};

export const BottomTimerBar = () => {
    const { currentSession } = useContext(SolvesContext);
    const [showEditThresholds, setShowEditThresholds] = useState(false);

    const thresholds = [5, 12, 50, 100];
    const isAvg = true;

    return (
        <View style={styles.container}>
            <View style={styles.statsContainer}>
                <BottomTimeStatsItem
                    title="Deviation: "
                    amount={currentSession.amount === 0 ? '--' : formatTime(Math.floor(currentSession.stdev))}
                />
                <BottomTimeStatsItem
                    title="Average: "
                    amount={currentSession.amount === 0 ? '--' : formatTime(Math.floor(currentSession.average))}
                />
                <BottomTimeStatsItem
                    title="Best: "
                    amount={currentSession.best === 0 ? '--' : formatTime(currentSession.best)}
                />
                <BottomTimeStatsItem title="Solves: " amount={currentSession.fullAmount.toString()} />
            </View>

            <Pressable onPress={() => setShowEditThresholds(true)}>
                <View style={styles.statsContainer}>
                    {thresholds.map(threshold => (
                        <BottomTimeStatsItem
                            key={Math.random() + threshold}
                            title={`${isAvg ? 'Ao' : 'Mo'}${threshold}: `}
                            amount={
                                currentSession.fullAmount < threshold
                                    ? '--'
                                    : getTimeResult(calcAvg(currentSession.solves.slice(0, threshold), isAvg))
                            }
                        />
                    ))}
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: PADDING.md,
    },
    statsContainer: {},
});
