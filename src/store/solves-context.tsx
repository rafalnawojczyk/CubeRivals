import { createContext, useCallback, useEffect, useContext } from 'react';
import { CubeType } from '../models/cubes';
import { useObject, useQuery, useRealm, useUser } from '@realm/react';
import { Solve } from '../models/realm-models/SolveSchema';
import { Results, BSON } from 'realm';
import { Session } from '../models/realm-models/SessionSchema';
import { TimerSettingsContext } from './timer-settings-context';
import { Result } from '../models/result';

interface SolvesDataInterface {
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
    const { timerSettings } = useContext(TimerSettingsContext);

    const sessions = useQuery(Session, collection => collection.filtered('cube == $0', timerSettings.cube), [
        timerSettings.cube,
    ]);

    const solves = useQuery(Solve);

    const currentSession = useObject(Session, new BSON.ObjectID(timerSettings.session));

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
            });
        },
        [realm]
    );

    const handleDeleteSolve = useCallback(
        (solve: Solve): void => {
            realm.write(() => {
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

                    // @ts-ignore
                    currentSession.solves.unshift(solve);

                    return solve;
                });
                return solve;
            }
        },
        [realm]
    );

    const handleAddSession = useCallback(
        (name: string, cube: CubeType): BSON.ObjectId => {
            const item = realm.write(() => {
                return realm.create(Session, { name, cube, owner_id: new BSON.ObjectId(user.id), solves: [] });
            });

            return item._id;
        },
        [realm]
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

    const value = {
        sessions,
        addSolve: handleAddSolve,
        addSession: handleAddSession,
        editSolve: handleEditSolve,
        deleteSolve: handleDeleteSolve,
        editSession: handleEditSession,
    };

    return <SolvesContext.Provider value={value}>{children}</SolvesContext.Provider>;
};
