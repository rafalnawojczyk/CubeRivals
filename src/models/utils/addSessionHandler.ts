import { BSON } from 'realm';
import { CubeType } from '../cubes';
import { Session } from '../realm-models/SessionSchema';
import { useRealm } from '@realm/react';

export const addSessionHandler = (name: string, cube: CubeType, userId: string): BSON.ObjectId => {
    const realm = useRealm();

    const item = realm.write(() => {
        return realm.create(Session, {
            name,
            cube,
            owner_id: new BSON.ObjectId(userId),
            solves: [],
            validTimes: [],
        });
    });

    return item._id;
};
