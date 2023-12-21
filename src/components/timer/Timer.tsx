import { useState, useRef, useEffect } from 'react';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { formatTime } from '../../utils/formatTime';
import { Result } from '../../models/result';
import { ModifyResultBlock } from './ModifyResultBlock';
import { useTranslation } from '../../hooks/useTranslation';
import { ScramblePreviewBlock } from './ScramblePreviewBlock';
import { Solve, SolveFlagType } from '../../models/realm-models/SolveSchema';
import { IconButton } from '../UI/IconButton';
import { InspectionOverlay } from './InspectionOverlay';
import { generateScramble } from '../../utils/generateScramble';
import BestTimeAnimation from '../BestTimeAnimation';
import { useTimerSettingsStore } from '../../store/timerSettingsStore';
import { addSolve, editSolve } from '../../models/utils';
import { useCurrentSession } from '../../hooks/useCurrentSession';
import { useRealm } from '@realm/react';

const AWAKE_TAG = 'timer';

const initialResult: Result = {
    scramble: '',
    time: 0,
};

export const Timer = () => {
    const [result, setResult] = useState({ ...initialResult });
    const [isWarmup, setIsWarmup] = useState(false);
    const [lastSolve, setLastSolve] = useState<undefined | Solve>();
    const [showInspection, setShowInspection] = useState(false);
    const [inspectionTimes, setInspectionTimes] = useState([0, 0]);
    const [scramble, setScramble] = useState<string[]>([]);
    const [isBestTimeBy, setIsBestTimeBy] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showReadyState, setShowReadyState] = useState(false);
    const [startingTime, setStartingTime] = useState(0);
    const [endingTime, setEndingTime] = useState(0);
    const requestRef = useRef();
    const getColor = useColors();
    const trans = useTranslation();
    const realm = useRealm();
    const [inspection, cube, inspectionTime, hideUi, hideTime, showWholeMs, scrambleBlockPlacement, holdDelay] =
        useTimerSettingsStore(state => [
            state.inspection,
            state.cube,
            state.inspectionTime,
            state.hideUi,
            state.hideTime,
            state.showWholeMs,
            state.scrambleBlockPlacement,
            state.holdDelay,
        ]);
    const currentSession = useCurrentSession();

    const onChangeScramble = (scramble: string, newCube: boolean) => {
        setScramble(prevScramble => {
            if (newCube) {
                return [scramble];
            } else {
                return [prevScramble[prevScramble.length - 1], scramble];
            }
        });
    };

    const onSetPrevScramble = () => {
        setScramble(prevScramble => {
            if (prevScramble.length === 1) {
                return prevScramble;
            } else {
                return [prevScramble[scramble.length - 2]];
            }
        });
    };

    const onLongPressHandler = () => {
        if (!inspection) {
            setStartingTime(0);
            setEndingTime(0);
            setShowReadyState(true);
            setResult({ ...initialResult, scramble: scramble[scramble.length - 1] });
        }
    };

    const checkForBestTime = (time: number, flag: SolveFlagType) => {
        const resultTime = flag === '+2' ? time + 2000 : time;

        if (
            currentSession &&
            currentSession?.best &&
            flag !== 'dnf' &&
            flag !== 'dns' &&
            currentSession?.best > resultTime &&
            currentSession?.amount >= 4 &&
            time !== 0
        ) {
            if (isBestTimeBy !== currentSession.best - resultTime) {
                setIsBestTimeBy(currentSession.best - resultTime);
            }
        } else {
            setIsBestTimeBy(0);
        }
    };

    const finishSolve = (dns = false) => {
        deactivateKeepAwake(AWAKE_TAG);

        const endTime = Math.floor(performance.now());

        setEndingTime(endTime);
        cancelAnimationFrame(requestRef.current!);
        setIsRunning(false);

        const scr = generateScramble(cube);
        onChangeScramble(scr[0], false);

        setResult(prev => {
            const inspectionDuration = inspectionTimes[1] - inspectionTimes[0];

            const updatedResult = {
                ...prev,
                time: endTime - startingTime,
                inspection: inspectionDuration,
            };

            if (dns) {
                updatedResult.flag = 'dns';
                updatedResult.time = 0;
                updatedResult.inspection = Math.floor(performance.now()) - inspectionTimes[0];
                updatedResult.scramble = result.scramble;
            }

            if (inspectionDuration - inspectionTime * 1000 >= 0) {
                updatedResult.flag = '+2';
            }

            if (!isWarmup) {
                checkForBestTime(updatedResult.time, updatedResult.flag);

                const addedSolve = addSolve(updatedResult, currentSession, realm);

                if (addedSolve) {
                    setLastSolve(addedSolve);
                }
            }

            return updatedResult;
        });
    };

    const onPressInHandler = () => {
        if (inspection && !isRunning) {
            setInspectionTimes([Math.floor(performance.now()), 0]);
            setShowInspection(true);
        }

        if (isRunning) {
            finishSolve();
        }
    };

    const onManualAddTime = (solve: Result, saveScramble: boolean) => {
        setResult(prev => {
            const updatedResult = { ...prev, ...solve };

            if (!saveScramble) {
                updatedResult.scramble = '';
            }

            const addedSolve = addSolve(updatedResult, currentSession, realm);

            if (addedSolve) {
                setLastSolve(addedSolve);
            }

            return updatedResult;
        });
    };

    const startTiming = () => {
        if (inspection) {
            setStartingTime(0);
            setEndingTime(0);
            setShowReadyState(true);
            setResult({ ...initialResult, scramble: scramble[scramble.length - 1] });
            setShowInspection(false);
            setInspectionTimes(prev => [prev[0], Math.floor(performance.now())]);
        }

        setIsBestTimeBy(0);
        activateKeepAwakeAsync(AWAKE_TAG);
        setShowReadyState(false);
        setIsRunning(true);
        const startTime = Math.floor(performance.now());
        setStartingTime(startTime);

        // @ts-ignore
        requestRef.current = requestAnimationFrame(updateStopwatch.bind(null, startTime));
    };

    const onPressOutHandler = () => {
        if (showReadyState) {
            startTiming();
        }
    };

    const inspectionEndHandler = () => {
        setShowInspection(false);
        finishSolve(true);
    };

    const onClearFlagHandler = () => {
        if (lastSolve) {
            setResult(prev => {
                const newResult = { ...prev };
                delete newResult.flag;

                return newResult;
            });
            editSolve(lastSolve, { flag: undefined }, currentSession, realm);
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
        setInspectionTimes([0, 0]);
    };
    const cancelInspectionHandler = () => {
        setShowInspection(false);
        setInspectionTimes([0, 0]);
    };

    useEffect(() => {
        checkForBestTime(result.time, result.flag);
    }, [result.flag]);

    useEffect(() => {
        resetTimer();
    }, [cube, isWarmup]);

    return (
        <>
            {showInspection && (
                <InspectionOverlay
                    onCancelInspection={cancelInspectionHandler}
                    onStartTimer={startTiming}
                    onTimeEnd={inspectionEndHandler}
                />
            )}
            {hideUi && isRunning && (
                <Pressable
                    style={[styles.overlay, { backgroundColor: getColor('background') }]}
                    onPress={onPressInHandler}
                >
                    {!hideTime && (
                        <Text style={[styles.timerText, { color: getColor('gray100') }]}>
                            {formatTime(elapsedTime, !showWholeMs)}
                        </Text>
                    )}
                </Pressable>
            )}
            {scrambleBlockPlacement === 'top' && (
                <View>
                    <ScramblePreviewBlock
                        isWarmup={isWarmup}
                        toggleWarmup={() => setIsWarmup(prev => !prev)}
                        onChangeScramble={onChangeScramble}
                        scramble={scramble}
                        onSetPrevScramble={onSetPrevScramble}
                        onAddTime={onManualAddTime}
                    />
                </View>
            )}
            <Pressable
                onPressIn={onPressInHandler}
                onLongPress={onLongPressHandler}
                delayLongPress={holdDelay}
                onPressOut={onPressOutHandler}
                style={styles.touchableContainer}
            >
                <View style={styles.container}>
                    {isBestTimeBy > 0 && (
                        <View style={styles.bestAnimation}>
                            <BestTimeAnimation />
                        </View>
                    )}

                    <View style={styles.innerContainer}>
                        {isBestTimeBy > 0 && (
                            <Text style={[styles.newBestText, { color: getColor('primary500') }]}>{`${trans(
                                'newBestBy'
                            )} ${formatTime(isBestTimeBy)}`}</Text>
                        )}
                        {isRunning && !hideTime && (
                            <Text style={[styles.timerText, { color: getColor('gray100') }]}>
                                {formatTime(elapsedTime, !showWholeMs)}
                            </Text>
                        )}
                        {isRunning && hideTime && (
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
                                            !showWholeMs
                                        )}
                                    </Text>
                                    {result.flag && (
                                        <>
                                            <Text style={[styles.flagText, { color: getColor('error') }]}>
                                                {result.flag.toUpperCase()}
                                            </Text>
                                            {result.flag !== 'dns' && (
                                                <IconButton
                                                    icon="refresh"
                                                    size={FONTS.lg}
                                                    color={getColor('text')}
                                                    onPress={onClearFlagHandler}
                                                    style={styles.revertFlagIcon}
                                                />
                                            )}
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
                        {!showReadyState && !isRunning && result.time === 0 && (
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
            {scrambleBlockPlacement === 'bottom' && (
                <View style={{ marginBottom: PADDING.md }}>
                    <ScramblePreviewBlock
                        isWarmup={isWarmup}
                        toggleWarmup={() => setIsWarmup(prev => !prev)}
                        onChangeScramble={onChangeScramble}
                        scramble={scramble}
                        onSetPrevScramble={onSetPrevScramble}
                        onAddTime={onManualAddTime}
                    />
                </View>
            )}
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
        fontSize: FONTS['3xl'],
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
    newBestText: {
        fontSize: FONTS.m,
        fontWeight: 'bold',
        width: '80%',
        textAlign: 'center',
        lineHeight: 20,
    },
    bestAnimation: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 0.35 * DIMENSIONS.fullHeight,
        width: 0.95 * DIMENSIONS.fullWidth,

        zIndex: 5001,
    },
});
