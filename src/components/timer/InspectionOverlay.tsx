import { Pressable, StyleSheet, View, Text } from 'react-native';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useContext, useState, useEffect } from 'react';
import { TimerSettingsContext } from '../../store/timer-settings-context';
import { INSPECTION_TIME_THRESHOLDS } from '../timerSettingsModal/InspectionSettingsModal';
import { Audio } from 'expo-av';
import { INSPECTION_ALERT_SOUNDS } from '../../utils/inspectionAlertSounds';
import * as Haptics from 'expo-haptics';
import { IconButton } from '../UI/IconButton';

interface InspectionOverlayProps {
    onStartTimer: () => void;
    onTimeEnd: () => void;
    onCancelInspection: () => void;
}

export const InspectionOverlay = ({ onStartTimer, onTimeEnd, onCancelInspection }: InspectionOverlayProps) => {
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

    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(INSPECTION_ALERT_SOUNDS[timerSettings.inspectionAudioNumber]);

        await sound.playAsync();
    };

    const playVibration = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType[timerSettings.inspectionVibrationPattern]);
    };

    useEffect(() => {
        const firstThreshold =
            timerSettings.inspectionTime - Math.floor(timerSettings.inspectionTime * INSPECTION_TIME_THRESHOLDS[0]);
        const secondThreshold =
            timerSettings.inspectionTime - Math.floor(timerSettings.inspectionTime * INSPECTION_TIME_THRESHOLDS[1]);

        if (timeLeft === firstThreshold) {
            if (['both', 'sound'].includes(timerSettings.inspectionAlerts)) {
                playAudio();
            }

            if (['both', 'vibration'].includes(timerSettings.inspectionAlerts)) {
                playVibration();
            }
        }

        if (timeLeft === secondThreshold) {
            if (['both', 'sound'].includes(timerSettings.inspectionAlerts)) {
                playAudio();
            }

            if (['both', 'vibration'].includes(timerSettings.inspectionAlerts)) {
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
            delayLongPress={timerSettings.holdDelay}
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
