import { Session } from '../realm-models/SessionSchema';
import { Solve } from '../realm-models/SolveSchema';
import { useRealm } from '@realm/react';
import { calcDeviation } from '../../utils/calcDeviation';
import { removeElementFromArray } from '../../utils/removeElementFromArray';

export const deleteSolveHandler = (solve: Solve, currentSession: Session): void => {
    const realm = useRealm();

    realm.write(() => {
        const currentSolveTime = solve.flag === '+2' ? solve.time + 2000 : solve.time;

        if (currentSession.solves.length === 1) {
            currentSession.stdev = 0;

            currentSession.average = 0;
            currentSession.amount = 0;
            currentSession.best = 0;

            if (currentSession.fullAmount === 1) {
                currentSession.validTimes = removeElementFromArray(currentSession.validTimes, currentSolveTime);
            }
            currentSession.fullAmount = 0;
            realm.delete(solve);

            return;
        }

        const isValidSolve = solve.flag !== 'dnf' && solve.flag !== 'dns';
        if (isValidSolve) {
            const newAmount = currentSession.amount - 1;

            const newMean = (currentSession.amount * currentSession.average - currentSolveTime) / newAmount;

            const newValidTimes = removeElementFromArray(currentSession.validTimes, currentSolveTime);

            const newStdev = calcDeviation(newValidTimes, newMean);

            currentSession.stdev = newStdev;
            currentSession.validTimes = newValidTimes;
            currentSession.average = newMean;
            currentSession.amount = newAmount;
        }

        currentSession.fullAmount = currentSession.fullAmount - 1;

        if (currentSession.best === currentSolveTime) {
            const newBest = Math.min(...currentSession.validTimes);

            currentSession.best = newBest;
        }

        realm.delete(solve);
    });
};
