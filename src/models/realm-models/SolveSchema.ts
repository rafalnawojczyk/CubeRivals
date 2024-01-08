import { Realm } from '@realm/react';

export type SolveFlagType = '+2' | 'dnf' | 'dns' | undefined;

export interface SolveInterface {
    time: number;
    scramble: string;
    note?: string;
    flag?: SolveFlagType;
    inspection?: number;
    star?: boolean;
}

export class Solve extends Realm.Object<Solve> {
    _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
    createdAt: Date = new Date();
    time!: number; // in ms
    scramble!: string;
    note?: string;
    flag?: SolveFlagType;
    inspection?: number;
    star?: boolean;

    static primaryKey = '_id';
}
