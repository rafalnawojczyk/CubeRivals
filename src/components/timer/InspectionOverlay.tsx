import { Pressable, StyleSheet, View, Text } from 'react-native';
import { DIMENSIONS, FONTS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useContext, useState, useEffect } from 'react';
import { TimerSettingsContext } from '../../store/timer-settings-context';

interface InspectionOverlayProps {
    onStartTimer: () => void;
    onTimeEnd: () => void;
}

export const InspectionOverlay = ({ onStartTimer, onTimeEnd }: InspectionOverlayProps) => {
    const { timerSettings } = useContext(TimerSettingsContext);
    const [ready, setReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timerSettings.inspectionTime);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

    const getColor = useColors();

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        setIntervalId(interval);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (timeLeft === -2) {
            onTimeEnd();
        }
    }, [timeLeft]);

    return (
        <Pressable
            onLongPress={() => setReady(true)}
            delayLongPress={timerSettings.holdDelay}
            onPressOut={() => {
                if (ready) {
                    onStartTimer();
                }
            }}
        >
            <View
                style={[styles.container, { backgroundColor: ready ? getColor('primary200') : getColor('background') }]}
            >
                <Text style={[styles.time, { color: getColor('text') }]}>{timeLeft}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: DIMENSIONS.fullWidth,
        height: DIMENSIONS.fullHeight,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    time: {
        fontSize: FONTS['2xl'],
        fontFamily: 'robotoMono-light',
    },
});
