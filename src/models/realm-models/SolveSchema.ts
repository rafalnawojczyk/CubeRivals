import { Realm } from '@realm/react';

export interface SolveInterface {
    time: number;
    scramble: string;
    note?: string;
    flag?: '+2' | 'dnf' | 'dns';
}

export class Solve extends Realm.Object<Solve> {
    _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
    createdAt: Date = new Date();
    time!: number; // in ms
    scramble!: string;
    note?: string;
    flag?: string;

    static primaryKey = '_id';
}