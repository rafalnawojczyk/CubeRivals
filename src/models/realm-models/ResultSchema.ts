import { Realm } from '@realm/react';

export class Result extends Realm.Object<Result> {
    _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
    createdAt: Date = new Date();
    time!: number; // in ms
    scramble!: string;
    note?: string;
    flag?: 'dnf' | 'dns' | '+2';

    static primaryKey = '_id';

    constructor(realm: Realm, time: number, scramble: string, note?: string, flag?: 'dnf' | 'dns' | '+2') {
        super(realm, { time, scramble, note, flag });
    }
}

// TODO:
// 1. Add user schema, which will handle all the storing part
// 2. User should have: _id, sessions
// 3. _id will be used to query for that specific userData in realm, so store it in app/associate it with this exact user. Maybe by backend?
// 4. User "sessions" will be an array of objects, where each object is a Session Schema with to-one relation
// So each session can have only one user, user creates it and user can edit/view it
// 5. Session will be another Schema, which will have{cube: '333', name: "string", results: [arr of results id] }
// 6. So There will be one User, which can have multiple Session, and session can have multiple results

// User will store all sessions embedded as there will be not much sessions, and each session will store results
// Read if session should store them embedded or referenced, but probably reference will be a better option
// This will allow me to create a global stats somewhere in the future

// Users in DB should be bound to logged in users. So probably:
// 1. When user makes first meaningful change - like changes any setting/measure a solve? app should create new User for this user, If thats a first solve -create default session and result and link them all up
// 2. Use firebase to auth users. I will need to somehow link firebase users by some ID? to App Users in Realm, so even if user changes device/solves on more devices - his progress is in sync between devices
// 3. EDGE CASE: user makes changes/adds solves into app and then login to firebase, which shows that he has previous acc. There should be some utils that checks that on login, and solve it somehow

// let User = {
//     _id: 'MongoDbID',
//     sessions: ['Array of Object Ids'],
//     firebaseUid: "firebase UID get from user?.uid"
// };

// let Session = {
//     _id: 'MongoDbId',
//     cube: '333', // cube identifier
//     name: "User Specified Name", // name that user specifies for this session
//     lastUsed: Date, // Date when it was last modified so it will be used to sort sessions in UI
//     results: ['array of Object ids of results'],
// };

//  let Result = {
//     _id: "MongoDbId",
//     createdAt: 'DateOfThe Creation of result',
//     cube: '333',
//     time: "Time in MS of that specific result", // in ms
//     scramble: 'R U D R L R U2 D2',
//     note: "Possibly undefined or note string provided by user",
//     flag: "Possibly undefined but can hold some flags to solve that user have set"
//  }
