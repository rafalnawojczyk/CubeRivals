import { createContext, useCallback, useEffect, useContext } from 'react';
import { CubeType } from '../models/cubes';
import { useQuery, useRealm, useUser } from '@realm/react';
import { Solve, SolveInterface } from '../models/realm-models/SolveSchema';
import { Results, BSON } from 'realm';
import { Session } from '../models/realm-models/SessionSchema';
import { TimerSettingsContext } from './timer-settings-context';
import { Result } from '../models/result';
import { useTranslation } from '../hooks/useTranslation';
import { calcDeviation } from '../utils/calcDeviation';
import { removeElementFromArray } from '../utils/removeElementFromArray';

interface SolvesToMoveInterface extends SolveInterface {
    createdAt: Date;
}

interface SolvesDataInterface {
    currentSession: Session;
    // @ts-ignore
    sessions?: Results<Session>;
    addSolve: (result: Result) => Solve | undefined;
    addSession: (name: string, cube: CubeType) => BSON.ObjectId;
    editSolve: (solve: Solve, solveEdit: Partial<Solve>) => void;
    editSession: (session: Session, sessionEdit: Partial<Session>) => void;
    deleteSolve: (solve: Solve) => void;
    moveSolves: (delSession: Session, moveSession: Session, solves: Solve[]) => void;
}

export const SolvesContext = createContext<SolvesDataInterface>({
    sessions: [],
    // @ts-ignore
    currentSession: {},
    // @ts-ignore
    addSolve: (result: Result) => {},
    // @ts-ignore
    addSession: (name: string, cube: CubeType): BSON.ObjectId => {},
    editSolve: (solve: Solve, solveEdit: Partial<Solve>) => {},
    editSession: (session: Session, sessionEdit: Partial<Session>) => {},
    deleteSolve: (solve: Solve) => {},
    moveSolves: (delSession: Session, moveSession: Session, solves: Solve[]) => {},
});

export const SolvesContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const realm = useRealm();
    const user = useUser();
    const trans = useTranslation();
    const { timerSettings } = useContext(TimerSettingsContext);

    const sessions = useQuery(Session, collection => collection.filtered('cube == $0', timerSettings.cube), [
        timerSettings.cube,
    ]);

    const currentSession = sessions.sorted('used', true)[0];

    const solves = useQuery(Solve);

    const handleEditSession = useCallback(
        (session: Session, sessionEdit: Partial<Session>): void => {
            const keyValPairs = Object.entries(sessionEdit);

            if (keyValPairs.length === 0) {
                return;
            }

            realm.write(() => {
                if (sessionEdit.name) {
                    session.name = sessionEdit.name;
                }
                if (sessionEdit.used) {
                    session.used = sessionEdit.used;
                }
            });
        },
        [realm]
    );

    const handleEditSolve = useCallback(
        (solve: Solve, solveEdit: Partial<Solve>): void => {
            const keyValPairs = Object.entries(solveEdit);

            if (keyValPairs.length === 0) {
                return;
            }

            realm.write(() => {
                if (solveEdit.hasOwnProperty('flag')) {
                    // check how flags have changed
                    if (solve.flag === 'dnf' || solve.flag === 'dns') {
                        if (!solveEdit.flag || solveEdit.flag === '+2') {
                            // from dns/dnf to no flag or +2
                            const newAmount = currentSession.amount + 1;

                            const newSolveTime = solveEdit.flag === '+2' ? solve.time + 2000 : solve.time;

                            currentSession.validTimes.push(newSolveTime);

                            currentSession.average =
                                (currentSession.average * currentSession.amount + newSolveTime) / newAmount;
                            currentSession.amount = newAmount;
                            currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                            if (currentSession.best > newSolveTime || currentSession.best === 0) {
                                currentSession.best = newSolveTime;
                            }
                        }
                    }

                    if (solve.flag === '+2') {
                        if (solveEdit.flag === 'dnf' || solveEdit.flag === 'dns') {
                            // from +2 to dnf/dns
                            const newAmount = currentSession.amount - 1;

                            currentSession.validTimes = removeElementFromArray(
                                currentSession.validTimes,
                                solve.time + 2000
                            );

                            currentSession.average =
                                (currentSession.average * currentSession.amount - solve.time + 2000) / newAmount;
                            currentSession.amount = newAmount;

                            currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                            if (currentSession.best === solve.time + 2000) {
                                if (currentSession.amount !== 0) {
                                    currentSession.best = Math.min(...currentSession.validTimes);
                                } else {
                                    currentSession.best = 0;
                                }
                            }
                        }

                        if (!solveEdit.flag) {
                            // from +2 to no flags
                            currentSession.validTimes = removeElementFromArray(
                                currentSession.validTimes,
                                solve.time + 2000
                            );

                            currentSession.validTimes.push(solve.time);

                            currentSession.average =
                                (currentSession.average * currentSession.amount - 2000) / currentSession.amount;

                            currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                            if (currentSession.best > solve.time) {
                                currentSession.best = solve.time;
                            }
                        }
                    }

                    if (!solve.flag) {
                        if (solveEdit.flag === 'dnf' || solveEdit.flag === 'dns') {
                            // from no flags to dnf/dns
                            const newAmount = currentSession.amount - 1;

                            if (newAmount === 0) {
                                currentSession.average = 0;
                            } else {
                                currentSession.average =
                                    (currentSession.average * currentSession.amount - solve.time) / newAmount;
                            }

                            currentSession.amount = newAmount;

                            currentSession.validTimes = removeElementFromArray(currentSession.validTimes, solve.time);

                            currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                            if (currentSession.best === solve.time) {
                                if (currentSession.amount !== 0) {
                                    currentSession.best = Math.min(...currentSession.validTimes);
                                } else {
                                    currentSession.best = 0;
                                }
                            }
                        }

                        if (solveEdit.flag === '+2') {
                            // from no flags to +2
                            currentSession.average =
                                (currentSession.average * currentSession.amount + 2000) / currentSession.amount;

                            currentSession.validTimes = removeElementFromArray(currentSession.validTimes, solve.time);
                            currentSession.validTimes.push(solve.time + 2000);

                            currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                            if (currentSession.best === solve.time) {
                                currentSession.best = Math.min(...currentSession.validTimes);
                            }
                        }
                    }

                    solve.flag = solveEdit.flag;
                }

                if (solveEdit.hasOwnProperty('note')) {
                    solve.note = solveEdit.note;
                }

                if (solveEdit.hasOwnProperty('scramble')) {
                    solve.scramble = solveEdit.scramble ? solveEdit.scramble : '';
                }

                if (solveEdit.hasOwnProperty('star')) {
                    solve.star = solveEdit.star;
                }
            });
        },
        [realm, currentSession]
    );

    const handleMoveSolves = useCallback(
        (delSession: Session, moveSession: Session, solves: Solve[]) => {
            realm.write(() => {
                // solves array STATS
                const solvesToMoveSumTime = solves.reduce((a, b) => {
                    if (b.flag === '+2') {
                        return a + b.time + 2000;
                    }

                    if (b.flag === 'dnf' || b.flag === 'dns') {
                        return a;
                    }

                    return a + b.time;
                }, 0);

                const validSolves = solves.filter(el => el.flag !== 'dnf' && el.flag !== 'dns');

                const solvesToMoveAmount = validSolves.length;
                const solvesToMoveFullAmount = solves.length;
                const solvesToMoveBest = validSolves.reduce(
                    (a, b) =>
                        (b.flag === '+2' ? b.time + 2000 : b.time) < a ? (b.flag === '+2' ? b.time + 2000 : b.time) : a,
                    validSolves[0]?.time
                );

                // delSession logic
                let currentSum = delSession.amount * delSession.average;
                currentSum = currentSum - solvesToMoveSumTime;
                const newAmount = delSession.amount - solvesToMoveAmount;
                delSession.amount = newAmount;
                delSession.fullAmount = solvesToMoveFullAmount;
                delSession.average = currentSum / newAmount;

                let newValidTimes = currentSession.validTimes;

                validSolves.forEach(el => {
                    newValidTimes = removeElementFromArray(newValidTimes, el.flag === '+2' ? el.time + 2000 : el.time);
                });

                delSession.validTimes = newValidTimes;
                delSession.stdev = calcDeviation(newValidTimes, delSession.average);

                // crete solves to push to moveSession and calc stats
                const solvesToAdd = solves.map(el => {
                    const newSolve: SolvesToMoveInterface = {
                        time: el.time,
                        scramble: el.scramble,
                        createdAt: el.createdAt,
                    };

                    if (el.flag) {
                        newSolve.flag = el.flag as 'dnf' | 'dns' | '+2' | undefined;
                    }

                    if (el.note) {
                        newSolve.note = el.note;
                    }

                    if (el.inspection) {
                        newSolve.inspection = el.inspection;
                    }

                    if (el.star) {
                        newSolve.star = el.star;
                    }

                    return newSolve;
                });

                const solvesArr = solvesToAdd.map(el => realm.create(Solve, el));

                if (moveSession.solves.length === 0) {
                    moveSession.solves.push(...solvesArr);
                } else {
                    moveSession.solves.unshift(...solvesArr);
                }
                // calc new avg for new session
                moveSession.average =
                    (moveSession.average * moveSession.amount + solvesToMoveSumTime) / moveSession.amount +
                    solvesToMoveAmount;
                moveSession.amount = moveSession.amount + solvesToMoveAmount;
                moveSession.fullAmount = moveSession.fullAmount + solvesToMoveFullAmount;

                moveSession.validTimes.push(...validSolves.map(el => (el.flag === '+2' ? el.time + 2000 : el.time)));

                moveSession.stdev = calcDeviation(moveSession.validTimes, moveSession.average);

                if (moveSession.best < solvesToMoveBest) {
                    moveSession.best = solvesToMoveBest;
                }

                // Remove solves from current obj
                realm.delete(solves);

                // check for best times
                if (solvesToMoveBest === delSession.best) {
                    delSession.best = Math.min(...delSession.validTimes);
                }
            });
        },
        [realm]
    );

    const handleDeleteSolve = useCallback(
        (solve: Solve): void => {
            realm.write(() => {
                const currentSolveTime = solve.flag === '+2' ? solve.time + 2000 : solve.time;

                if (currentSession.solves.length === 1) {
                    currentSession.stdev = 0;

                    currentSession.average = 0;
                    currentSession.amount = 0;
                    currentSession.best = 0;

                    if (currentSession.fullAmount === 1) {
                        currentSession.validTimes = removeElementFromArray(currentSession.validTimes, currentSolveTime);
                    }
                    currentSession.fullAmount = 0;
                    realm.delete(solve);

                    return;
                }

                const isValidSolve = solve.flag !== 'dnf' && solve.flag !== 'dns';
                if (isValidSolve) {
                    const newAmount = currentSession.amount - 1;

                    const newMean = (currentSession.amount * currentSession.average - currentSolveTime) / newAmount;

                    const newValidTimes = removeElementFromArray(currentSession.validTimes, currentSolveTime);

                    const newStdev = calcDeviation(newValidTimes, newMean);

                    currentSession.stdev = newStdev;
                    currentSession.validTimes = newValidTimes;
                    currentSession.average = newMean;
                    currentSession.amount = newAmount;
                }

                currentSession.fullAmount = currentSession.fullAmount - 1;

                if (currentSession.best === currentSolveTime) {
                    const newBest = Math.min(...currentSession.validTimes);

                    currentSession.best = newBest;
                }

                realm.delete(solve);
            });
        },
        [realm, currentSession]
    );

    const handleAddSolve = useCallback(
        (result: Result): Solve | undefined => {
            if (currentSession) {
                const solve = realm.write(() => {
                    currentSession.used = new Date();

                    const solve = realm.create(Solve, result);

                    const currentSolveTime = result.flag === '+2' ? result.time + 2000 : result.time;

                    const isValidSolve = result.flag !== 'dnf' && result.flag !== 'dns';

                    // Check if that's the new best time
                    if ((currentSession.best > currentSolveTime || currentSession.best === 0) && isValidSolve) {
                        currentSession.best = currentSolveTime;
                    }

                    // Calc mean of whole session and update
                    if (isValidSolve) {
                        const newAmount = currentSession.amount + 1;
                        const newMean = (currentSession.amount * currentSession.average + currentSolveTime) / newAmount;

                        currentSession.validTimes.push(currentSolveTime);

                        const newStdev = calcDeviation(currentSession.validTimes, newMean);

                        currentSession.average = newMean;
                        currentSession.stdev = newStdev;
                        currentSession.amount = newAmount;
                    }

                    currentSession.fullAmount = currentSession.fullAmount + 1;

                    if (currentSession.solves.length === 0) {
                        currentSession.solves.push(solve);
                    } else {
                        currentSession.solves.unshift(solve);
                    }
                    return solve;
                });
                return solve;
            }
        },
        [realm, currentSession]
    );

    const handleAddSession = useCallback(
        (name: string, cube: CubeType): BSON.ObjectId => {
            const item = realm.write(() => {
                return realm.create(Session, {
                    name,
                    cube,
                    owner_id: new BSON.ObjectId(user.id),
                    solves: [],
                    validTimes: [],
                });
            });

            return item._id;
        },
        [realm, user]
    );

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(sessions);
        });
    }, [realm, sessions, timerSettings.cube]);

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(solves);
        });
    }, [realm, solves]);

    useEffect(() => {
        if (sessions.length === 0) {
            handleAddSession(trans('defaultSessionName'), timerSettings.cube);
        }
    }, [timerSettings.cube, sessions]);

    const value = {
        sessions,
        addSolve: handleAddSolve,
        addSession: handleAddSession,
        editSolve: handleEditSolve,
        deleteSolve: handleDeleteSolve,
        editSession: handleEditSession,
        currentSession,
        moveSolves: handleMoveSolves,
    };

    return <SolvesContext.Provider value={value}>{children}</SolvesContext.Provider>;
};
