import { useQuery, useRealm, useUser } from '@realm/react';
import { useTimerSettingsStore } from '../store/timerSettingsStore';
import { Session } from '../models/realm-models/SessionSchema';
import { useEffect } from 'react';
import { Solve } from '../models/realm-models/SolveSchema';
import { addSession } from '../models/utils';
import { useTranslation } from './useTranslation';

export const useCurrentSession = () => {
    const trans = useTranslation();
    const cube = useTimerSettingsStore(state => state.cube);
    const user = useUser();

    const solves = useQuery(Solve);

    const realm = useRealm();
    const sessions = useQuery(Session, collection => collection.filtered('cube == $0', cube), [cube]);

    let session = sessions.sorted('used', true)[0];

    if (!session) {
        session = addSession(trans('defaultSessionName'), cube, user.id, realm);
    }

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(sessions);
        });
    }, [realm, sessions, cube]);

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(solves);
        });
    }, [realm, solves]);

    return session;
};
