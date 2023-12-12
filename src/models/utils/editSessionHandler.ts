import { Session } from '../realm-models/SessionSchema';
import { Realm } from 'realm/dist/bundle';

export const editSession = (session: Session, sessionEdit: Partial<Session>, realm: Realm): void => {
    const keyValPairs = Object.entries(sessionEdit);

    if (keyValPairs.length === 0) {
        return;
    }

    realm.write(() => {
        if (sessionEdit.name) {
            session.name = sessionEdit.name;
        }
        if (sessionEdit.used) {
            session.used = sessionEdit.used;
        }
    });
};
