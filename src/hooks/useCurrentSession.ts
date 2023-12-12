import { useQuery, useRealm } from '@realm/react';
import { useTimerSettingsStore } from '../store/timerSettingsStore';
import { Session } from '../models/realm-models/SessionSchema';
import { useEffect } from 'react';

export const useCurrentSession = () => {
    const cube = useTimerSettingsStore(state => state.cube);

    const realm = useRealm();
    const sessions = useQuery(Session, collection => collection.filtered('cube == $0', cube), [cube]);
    console.log(sessions);

    const session = sessions.sorted('used', true)[0];

    console.log(session);

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(sessions);
        });
    }, [realm, sessions, cube]);

    return session;
};
