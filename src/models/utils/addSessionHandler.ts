import { BSON } from 'realm';
import { CubeType } from '../cubes';
import { Session } from '../realm-models/SessionSchema';

import { Realm } from 'realm/dist/bundle';

export const addSession = (name: string, cube: CubeType, userId: string, realm: Realm): BSON.ObjectId => {
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
