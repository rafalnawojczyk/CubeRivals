import { useState, useRef, useContext, useEffect } from 'react';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
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
import { SolvesContext } from '../../store/solves-context';
import { Solve } from '../../models/realm-models/SolveSchema';
import { IconButton } from '../UI/IconButton';

const AWAKE_TAG = 'timer';

const initialResult: Result = {
    scramble: '',
    time: 0,
};

export const Timer = () => {
    const [result, setResult] = useState({ ...initialResult });
    const [isWarmup, setIsWarmup] = useState(false);
    const [lastSolve, setLastSolve] = useState<undefined | Solve>();
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
    const { addSolve, editSolve, currentSession } = useContext(SolvesContext);

    const onChangeScramble = (scramble: string) => {
        setScramble(scramble);
    };

    const onLongPressHandler = () => {
        setStartingTime(0);
        setEndingTime(0);
        setShowReadyState(true);
        setResult({ ...initialResult, scramble });
    };

    const onPressInHandler = () => {
        // TODO: give some visual indicator that user is pressing button

        if (isRunning) {
            deactivateKeepAwake(AWAKE_TAG);
            // finish counting
            const endTime = Math.floor(performance.now());

            setEndingTime(endTime);
            cancelAnimationFrame(requestRef.current!);
            setIsRunning(false);

            setResult(prev => {
                const updatedResult = { ...prev, time: endTime - startingTime };

                if (!isWarmup) {
                    const addedSolve = addSolve(updatedResult);

                    if (addedSolve) {
                        setLastSolve(addedSolve);
                    }
                }

                return updatedResult;
            });
        }
    };

    const onManualAddTime = (solve: Result, saveScramble: boolean) => {
        setResult(prev => {
            const updatedResult = { ...prev, ...solve };

            if (!saveScramble) {
                updatedResult.scramble = '';
            }

            const addedSolve = addSolve(updatedResult);

            if (addedSolve) {
                setLastSolve(addedSolve);
            }

            return updatedResult;
        });
    };

    const onPressOutHandler = () => {
        if (showReadyState) {
            activateKeepAwakeAsync(AWAKE_TAG);
            setShowReadyState(false);
            setIsRunning(true);
            const startTime = Math.floor(performance.now());
            setStartingTime(startTime);

            // @ts-ignore
            requestRef.current = requestAnimationFrame(updateStopwatch.bind(null, startTime));
        }
    };

    const onClearFlagHandler = () => {
        if (lastSolve) {
            setResult(prev => {
                const newResult = { ...prev };
                delete newResult.flag;

                return newResult;
            });
            editSolve(lastSolve, { flag: undefined });
        }
    };

    const updateStopwatch = (startTime: number) => {
        const currentTime = Math.floor(performance.now());
        const newElapsedTime = currentTime - startTime;
        setElapsedTime(newElapsedTime);
        // @ts-ignore
        requestRef.current = requestAnimationFrame(updateStopwatch.bind(null, startTime));
    };

    const resetTimer = () => {
        setResult({ ...initialResult });
        setElapsedTime(0);
        setEndingTime(0);
        setLastSolve(undefined);
    };

    useEffect(() => {
        resetTimer();
    }, [timerSettings.cube, isWarmup, currentSession]);

    return (
        <>
            {timerSettings.hideUi && isRunning && (
                <Pressable
                    style={[styles.overlay, { backgroundColor: getColor('background') }]}
                    onPress={onPressInHandler}
                >
                    {!timerSettings.hideTime && (
                        <Text style={[styles.timerText, { color: getColor('gray100') }]}>
                            {formatTime(elapsedTime, !timerSettings.showWholeMs)}
                        </Text>
                    )}
                </Pressable>
            )}
            <View>
                <ScramblePreviewBlock
                    isWarmup={isWarmup}
                    toggleWarmup={() => setIsWarmup(prev => !prev)}
                    onChangeScramble={onChangeScramble}
                    scramble={scramble}
                    onAddTime={onManualAddTime}
                />
            </View>
            <Pressable
                onPressIn={onPressInHandler}
                onLongPress={onLongPressHandler}
                delayLongPress={timerSettings.holdDelay}
                onPressOut={onPressOutHandler}
                style={styles.touchableContainer}
            >
                <View style={styles.container}>
                    <TimerBorder />
                    <View style={styles.innerContainer}>
                        {isRunning && !timerSettings.hideTime && (
                            <Text style={[styles.timerText, { color: getColor('gray100') }]}>
                                {formatTime(elapsedTime, !timerSettings.showWholeMs)}
                            </Text>
                        )}
                        {isRunning && timerSettings.hideTime && (
                            <Text style={[styles.timerText, { color: getColor('gray100'), fontSize: FONTS.xl }]}>
                                {trans('clickToStop')}
                            </Text>
                        )}
                        {!isRunning && !!endingTime && (
                            <>
                                <View style={{ position: 'relative' }}>
                                    <Text style={[styles.timerText, { color: getColor('gray100') }]}>
                                        {formatTime(
                                            result?.flag === '+2' ? result.time + 2000 : result.time,
                                            !timerSettings.showWholeMs
                                        )}
                                    </Text>
                                    {result.flag && (
                                        <>
                                            <Text style={[styles.flagText, { color: getColor('error') }]}>
                                                {result.flag.toUpperCase()}
                                            </Text>
                                            <IconButton
                                                icon="refresh"
                                                size={FONTS.lg}
                                                color={getColor('text')}
                                                onPress={onClearFlagHandler}
                                                style={styles.revertFlagIcon}
                                            />
                                        </>
                                    )}
                                </View>
                                {!isWarmup && (
                                    <ModifyResultBlock
                                        setSolveResult={setResult}
                                        solve={lastSolve}
                                        onDelete={() => resetTimer()}
                                    />
                                )}
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
        zIndex: 5000,
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
    overlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: DIMENSIONS.fullHeight,
        width: DIMENSIONS.fullWidth,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flagText: {
        position: 'absolute',
        right: -35,
        bottom: 10,
        width: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    revertFlagIcon: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: -35,
        width: 30,
        top: 20,
    },
});
