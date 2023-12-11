import { Session } from '../realm-models/SessionSchema';
import { Solve } from '../realm-models/SolveSchema';
import { useRealm } from '@realm/react';
import { calcDeviation } from '../../utils/calcDeviation';
import { Result } from '../result';

export const addSolveHandler = (result: Result, currentSession: Session): Solve | undefined => {
    const realm = useRealm();

    if (currentSession) {
        const solve = realm.write(() => {
            currentSession.used = new Date();

            const solve = realm.create(Solve, result);

            const currentSolveTime = result.flag === '+2' ? result.time + 2000 : result.time;

            const isValidSolve = result.flag !== 'dnf' && result.flag !== 'dns';

            // Check if that's the new best time
            if ((currentSession.best > currentSolveTime || currentSession.best === 0) && isValidSolve) {
                currentSession.best = currentSolveTime;
            }

            // Calc mean of whole session and update
            if (isValidSolve) {
                const newAmount = currentSession.amount + 1;
                const newMean = (currentSession.amount * currentSession.average + currentSolveTime) / newAmount;

                currentSession.validTimes.push(currentSolveTime);

                const newStdev = calcDeviation(currentSession.validTimes, newMean);

                currentSession.average = newMean;
                currentSession.stdev = newStdev;
                currentSession.amount = newAmount;
            }

            currentSession.fullAmount = currentSession.fullAmount + 1;

            if (currentSession.solves.length === 0) {
                currentSession.solves.push(solve);
            } else {
                currentSession.solves.unshift(solve);
            }
            return solve;
        });
        return solve;
    }
};
