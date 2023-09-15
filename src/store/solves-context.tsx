import { createContext, useCallback, useEffect, useContext, useState } from 'react';
import { CubeType } from '../models/cubes';
import { useQuery, useRealm, useUser } from '@realm/react';
import { Solve } from '../models/realm-models/SolveSchema';
import { Results, BSON } from 'realm';
import { Session } from '../models/realm-models/SessionSchema';
import { TimerSettingsContext } from './timer-settings-context';
import { Result } from '../models/result';
import { useTranslation } from '../hooks/useTranslation';

interface SolvesDataInterface {
    currentSession: Session;
    // @ts-ignore
    sessions?: Results<Session>;
    addSolve: (result: Result) => Solve | undefined;
    addSession: (name: string, cube: CubeType) => BSON.ObjectId;
    editSolve: (solve: Solve, solveEdit: Partial<Solve>) => void;
    editSession: (session: Session, sessionEdit: Partial<Session>) => void;
    deleteSolve: (solve: Solve) => void;
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
                if (solveEdit.time) {
                    solve.time = solveEdit.time;
                }

                if (solveEdit.hasOwnProperty('note')) {
                    solve.note = solveEdit.note;
                }

                if (solveEdit.hasOwnProperty('flag')) {
                    solve.flag = solveEdit.flag;
                }

                if (solveEdit.hasOwnProperty('scramble')) {
                    solve.scramble = solveEdit.scramble ? solveEdit.scramble : '';
                }

                if (solveEdit.hasOwnProperty('star')) {
                    solve.star = solveEdit.star;
                }
            });
        },
        [realm]
    );

    const handleDeleteSolve = useCallback(
        (solve: Solve): void => {
            realm.write(() => {
                const newMean = currentSession.amount * currentSession.average - solve.time / currentSession.amount - 1;

                currentSession.average = newMean;
                currentSession.amount = currentSession.amount - 1;

                if (currentSession.best === solve.time) {
                    const timesMap = [...currentSession.solves.map(el => el.time)];
                    const newBest = Math.max(...timesMap);

                    currentSession.best = newBest;
                }

                realm.delete(solve);
            });
        },
        [realm]
    );

    const handleAddSolve = useCallback(
        (result: Result): Solve | undefined => {
            if (currentSession) {
                const solve = realm.write(() => {
                    currentSession.used = new Date();

                    const solve = realm.create(Solve, result);

                    // Check if that's the new best time
                    if (currentSession.best > result.time || currentSession.best === 0) {
                        currentSession.best = result.time;
                    }
                    // TODO: here and above - I should take into account how I'm going to count DNF's and +2/ DNS TIMES
                    // Calc mean of whole session and update
                    const newMean =
                        currentSession.amount * currentSession.average + result.time / currentSession.amount + 1;

                    currentSession.average = newMean;
                    currentSession.amount = currentSession.amount + 1;

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
                return realm.create(Session, { name, cube, owner_id: new BSON.ObjectId(user.id), solves: [] });
            });

            return item._id;
        },
        [realm, user]
    );

    useEffect(() => {
        if (sessions.length === 0) {
            handleAddSession(trans('defaultSessionName'), timerSettings.cube);
        }
    }, [timerSettings.cube, sessions]);

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

    const value = {
        sessions,
        addSolve: handleAddSolve,
        addSession: handleAddSession,
        editSolve: handleEditSolve,
        deleteSolve: handleDeleteSolve,
        editSession: handleEditSession,
        currentSession,
    };

    return <SolvesContext.Provider value={value}>{children}</SolvesContext.Provider>;
};
