/* eslint-disable no-console */
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { Session } from './session.model';
import { schema } from './schema';
import { Solve } from './solve.model';
import { CubeType, CubeTypesArr } from '../models/cubes';

const adapter = new SQLiteAdapter({
    schema,
    onSetUpError: (error: any) => {
        console.log('error setting up database', error);
    },
});

const database = new Database({
    adapter,
    modelClasses: [Session, Solve],
});

export function getDb() {
    return database;
}

export const createSession = async (name: string, cube: CubeType) => {
    await getDb().write(async () => {
        const post = await getDb()
            .get<Session>('sessions')
            .create(session => {
                session.name = name;
                session.cube = cube;
                session.lastSeenAt = new Date();
                session.best = 0;
                session.amount = 0;
                session.fullAmount = 0;
                session.average = 0;
                session.stDev = 0;
            });

        return post;
    });
};

const createPreparedSession = (cube: CubeType) =>
    getDb()
        .collections.get<Session>('sessions')
        .prepareCreate(session => {
            session.name = 'Standard';
            session.cube = cube;
            session.lastSeenAt = new Date();
            session.best = 0;
            session.amount = 0;
            session.fullAmount = 0;
            session.average = 0;
            session.stDev = 0;
        });

export const generateInitialDb = () => {
    database.write(async () => database.batch(...CubeTypesArr.map(cube => createPreparedSession(cube))));
};

export const createSolve = async (newSolve: Partial<Solve>) =>
    await getDb().write(async () => {
        const session = await getDb().get<Session>('sessions').find(newSolve.sessionId);

        const addedSolve = await getDb()
            .get<Solve>('solves')
            .create(solve => {
                if (newSolve.time) {
                    solve.time = newSolve.time;
                }

                if (newSolve.scramble) {
                    solve.scramble = newSolve.scramble;
                }

                solve.createdAt = new Date();

                if (newSolve.note) {
                    solve.note = newSolve.note;
                }

                if (newSolve.flag) {
                    solve.flag = newSolve.flag;
                }

                if (newSolve.inspection) {
                    solve.inspection = newSolve.inspection;
                }

                if (newSolve.isStarred) {
                    solve.isStarred = newSolve.isStarred;
                }

                if (newSolve.isValid) {
                    solve.isValid = newSolve.isValid;
                }

                solve.sessionId.set(session);

                return solve;
            });

        console.log({ session });

        session.update(sessionToUpdate => {
            sessionToUpdate.solves.id = session.id;
        });
    });
