import { Pressable, StyleSheet, View, Text } from 'react-native';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useState, useEffect } from 'react';

import { INSPECTION_TIME_THRESHOLDS } from '../timerSettingsModal/InspectionSettingsModal';
import { Audio } from 'expo-av';
import { INSPECTION_ALERT_SOUNDS } from '../../utils/inspectionAlertSounds';
import * as Haptics from 'expo-haptics';
import { IconButton } from '../UI/IconButton';
import { useTimerSettingsStore } from '../../store/timerSettingsStore';

interface InspectionOverlayProps {
    onStartTimer: () => void;
    onTimeEnd: () => void;
    onCancelInspection: () => void;
}

export const InspectionOverlay = ({ onStartTimer, onTimeEnd, onCancelInspection }: InspectionOverlayProps) => {
    const [inspectionVibrationPattern, inspectionTime, inspectionAlerts, inspectionAudioNumber, holdDelay] =
        useTimerSettingsStore(state => [
            state.inspectionVibrationPattern,
            state.inspectionTime,
            state.inspectionAlerts,
            state.inspectionAudioNumber,
            state.holdDelay,
        ]);
    const [ready, setReady] = useState(false);

    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
    const [timeLeft, setTimeLeft] = useState(inspectionTime);

    const getColor = useColors();

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        setIntervalId(interval);

        return () => clearInterval(intervalId);
    }, []);

    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(INSPECTION_ALERT_SOUNDS[inspectionAudioNumber]);

        await sound.playAsync();
    };

    const playVibration = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType[inspectionVibrationPattern]);
    };

    useEffect(() => {
        const firstThreshold = inspectionTime - Math.floor(inspectionTime * INSPECTION_TIME_THRESHOLDS[0]);
        const secondThreshold = inspectionTime - Math.floor(inspectionTime * INSPECTION_TIME_THRESHOLDS[1]);

        if (timeLeft === firstThreshold || timeLeft === secondThreshold) {
            if (['both', 'sound'].includes(inspectionAlerts)) {
                playAudio();
            }

            if (['both', 'vibration'].includes(inspectionAlerts)) {
                playVibration();
            }
        }

        if (timeLeft === secondThreshold) {
            if (['both', 'sound'].includes(inspectionAlerts)) {
                playAudio();
            }

            if (['both', 'vibration'].includes(inspectionAlerts)) {
                playVibration();
            }
        }

        if (timeLeft === -2) {
            onTimeEnd();
        }
    }, [timeLeft]);

    return (
        <Pressable
            onLongPress={() => setReady(true)}
            delayLongPress={holdDelay}
            style={[styles.container, { backgroundColor: ready ? getColor('primary200') : getColor('background') }]}
            onPressOut={() => {
                if (ready) {
                    onStartTimer();
                }
            }}
        >
            <IconButton
                size={FONTS.xl}
                color={getColor('gray100')}
                icon="close"
                onPress={onCancelInspection}
                style={styles.closeButton}
            />
            <View>
                <Text style={[styles.time, { color: getColor('text') }]}>{timeLeft}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: DIMENSIONS.fullWidth,
        height: DIMENSIONS.fullHeight,
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        top: 0,
        left: 0,
    },
    time: {
        fontSize: FONTS['3xl'],
        fontFamily: 'robotoMono-light',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: PADDING.lg,
    },
});
