import { Realm } from '@realm/react';

export class Average extends Realm.Object<Average> {
    _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
    average!: number;
    solves!: Realm.List<Realm.BSON.ObjectId>; // TODO: check if it updates solves in both places at once!, Check how this should be coupled together

    static primaryKey = '_id';
}
