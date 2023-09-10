import { Realm } from '@realm/react';
import { Solve } from './SolveSchema';

export class Session extends Realm.Object<Session> {
    _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
    name!: string;
    cube!: string;
    solves!: Realm.List<Solve>;
    owner_id!: Realm.BSON.ObjectId;
    used: Date = new Date();
    amount: number = 0;
    average: number = 0;

    static primaryKey = '_id';
}
