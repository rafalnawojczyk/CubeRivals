import { useRealm } from '@realm/react';
import { Session } from '../realm-models/SessionSchema';

export const editSessionHandler = (session: Session, sessionEdit: Partial<Session>): void => {
    const realm = useRealm();
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
