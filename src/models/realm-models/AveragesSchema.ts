import { Realm } from '@realm/react';
import { Average } from './AverageSchema';

export class Averages extends Realm.Object<Averages> {
    _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
    owner_id!: Realm.BSON.ObjectId;
    threshold!: number; // name should be like 5/12/50/100, // TODO: if user changes avg to mean - inform about all changes/recalculations and recalc whole Averages
    bestAvg: number = 0;
    averages!: Realm.List<Average>;

    static primaryKey = '_id';
}

// TODO: session should have all averages id saved. Like one to many relationship.

// when creating session - create Averages for all current thresholds(4)
// if user changes thresholds - remove missing and add new. Do not recalc all of them
