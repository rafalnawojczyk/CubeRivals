import { useState, useRef, useContext, useEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { TimerBorder } from './TimerBorder';
import { useColors } from '../../hooks/useColors';
import { formatTime } from '../../utils/formatTime';
import { Result } from '../../models/result';
import { ModifyResultBlock } from './ModifyResultBlock';
import { useTranslation } from '../../hooks/useTranslation';
import { TimerSettingsContext } from '../../store/timer-settings-context';
import { ScramblePreviewBlock } from './ScramblePreviewBlock';

const initialResult: Result = {
    date: 0,
    scramble: '',
    time: 0,
};

export const Timer = () => {
    const [result, setResult] = useState({ ...initialResult });
    const [scramble, setScramble] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showReadyState, setShowReadyState] = useState(false);
    const [startingTime, setStartingTime] = useState(0);
    const [endingTime, setEndingTime] = useState(0);
    const requestRef = useRef();
    const getColor = useColors();
    const trans = useTranslation();
    const { timerSettings } = useContext(TimerSettingsContext);

    const onChangeScramble = (scramble: string) => {
        setScramble(scramble);
    };

    const onLongPressHandler = () => {
        // TODO: It should hide whole UI except timer when it's on this state
        setStartingTime(0);
        setEndingTime(0);
        setShowReadyState(true);
        setResult({ ...initialResult, scramble });
    };

    const onPressInHandler = () => {
        // TODO: give some visual indicator that user is pressing button

        if (isRunning) {
            // finish counting
            const endTime = Math.floor(performance.now());

            setEndingTime(endTime);
            cancelAnimationFrame(requestRef.current!);
            setIsRunning(false);

            setResult(prev => {
                const updatedResult = { ...prev, date: Date.now(), time: endTime - startingTime };

                // TODO: SAVE RESULT SOMEWHERE

                return updatedResult;
            });
        }
    };

    const onPressOutHandler = () => {
        if (showReadyState) {
            setShowReadyState(false);
            setIsRunning(true);
            const startTime = Math.floor(performance.now());
            setStartingTime(startTime);

            // @ts-ignore
            requestRef.current = requestAnimationFrame(updateStopwatch.bind(null, startTime));
        }
    };

    const updateStopwatch = (startTime: number) => {
        const currentTime = Math.floor(performance.now());
        const newElapsedTime = currentTime - startTime;
        setElapsedTime(newElapsedTime);
        // @ts-ignore
        requestRef.current = requestAnimationFrame(updateStopwatch.bind(null, startTime));
    };

    return (
        <>
            <View>
                <ScramblePreviewBlock onChangeScramble={onChangeScramble} scramble={scramble} />
            </View>
            <Pressable
                onPressIn={onPressInHandler}
                onLongPress={onLongPressHandler}
                onPressOut={onPressOutHandler}
                style={styles.touchableContainer}
            >
                <View style={styles.container}>
                    <TimerBorder />
                    <View style={styles.innerContainer}>
                        {isRunning && (
                            <Text style={[styles.timerText, { color: getColor('gray100') }]}>
                                {formatTime(elapsedTime, !timerSettings.showWholeMs)}
                            </Text>
                        )}
                        {!isRunning && !!endingTime && (
                            <>
                                <Text style={[styles.timerText, { color: getColor('gray100') }]}>
                                    {formatTime(elapsedTime, !timerSettings.showWholeMs)}
                                </Text>
                                <ModifyResultBlock setSolveResult={setResult} />
                            </>
                        )}
                        {!showReadyState && !isRunning && (
                            <Text
                                style={[
                                    styles.timerHoldText,
                                    { color: getColor('gray100'), fontSize: !!endingTime ? FONTS.lg : FONTS['xl'] },
                                ]}
                            >
                                {trans('holdStartTimer')}
                            </Text>
                        )}
                        {showReadyState && !isRunning && (
                            <Text style={[styles.timerHoldText, { color: getColor('gray100') }]}>
                                {trans('releaseTimer')}
                            </Text>
                        )}
                    </View>
                </View>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    touchableContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: 0.35 * DIMENSIONS.fullHeight,
        width: 0.95 * DIMENSIONS.fullWidth,
        position: 'relative',
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: FONTS['2xl'],
        fontFamily: 'robotoMono-light',
    },
    timerHoldText: {
        fontSize: FONTS['xl'],
        marginTop: PADDING.md,
        fontFamily: 'robotoMono-light',
        textAlign: 'center',
    },
});
