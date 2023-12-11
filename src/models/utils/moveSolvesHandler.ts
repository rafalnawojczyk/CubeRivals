import { Session } from '../realm-models/SessionSchema';
import { Solve, SolveInterface } from '../realm-models/SolveSchema';
import { useRealm } from '@realm/react';
import { calcDeviation } from '../../utils/calcDeviation';
import { removeElementFromArray } from '../../utils/removeElementFromArray';

interface SolvesToMoveInterface extends SolveInterface {
    createdAt: Date;
}

export const moveSolves = (delSession: Session, moveSession: Session, solves: Solve[]) => {
    const realm = useRealm();

    realm.write(() => {
        // solves array STATS
        const solvesToMoveSumTime = solves.reduce((a, b) => {
            if (b.flag === '+2') {
                return a + b.time + 2000;
            }

            if (b.flag === 'dnf' || b.flag === 'dns') {
                return a;
            }

            return a + b.time;
        }, 0);

        const validSolves = solves.filter(el => el.flag !== 'dnf' && el.flag !== 'dns');

        const solvesToMoveAmount = validSolves.length;
        const solvesToMoveFullAmount = solves.length;
        const solvesToMoveBest = validSolves.reduce(
            (a, b) => ((b.flag === '+2' ? b.time + 2000 : b.time) < a ? (b.flag === '+2' ? b.time + 2000 : b.time) : a),
            validSolves[0]?.time
        );

        // delSession logic
        let currentSum = delSession.amount * delSession.average;
        currentSum = currentSum - solvesToMoveSumTime;
        const newAmount = delSession.amount - solvesToMoveAmount;
        delSession.amount = newAmount;
        delSession.fullAmount = solvesToMoveFullAmount;
        delSession.average = currentSum / newAmount;

        let newValidTimes = delSession.validTimes;

        validSolves.forEach(el => {
            newValidTimes = removeElementFromArray(newValidTimes, el.flag === '+2' ? el.time + 2000 : el.time);
        });

        delSession.validTimes = newValidTimes;
        delSession.stdev = calcDeviation(newValidTimes, delSession.average);

        // crete solves to push to moveSession and calc stats
        const solvesToAdd = solves.map(el => {
            const newSolve: SolvesToMoveInterface = {
                time: el.time,
                scramble: el.scramble,
                createdAt: el.createdAt,
            };

            if (el.flag) {
                newSolve.flag = el.flag as 'dnf' | 'dns' | '+2' | undefined;
            }

            if (el.note) {
                newSolve.note = el.note;
            }

            if (el.inspection) {
                newSolve.inspection = el.inspection;
            }

            if (el.star) {
                newSolve.star = el.star;
            }

            return newSolve;
        });

        const solvesArr = solvesToAdd.map(el => realm.create(Solve, el));

        if (moveSession.solves.length === 0) {
            moveSession.solves.push(...solvesArr);
        } else {
            moveSession.solves.unshift(...solvesArr);
        }
        // calc new avg for new session
        moveSession.average =
            (moveSession.average * moveSession.amount + solvesToMoveSumTime) / moveSession.amount + solvesToMoveAmount;
        moveSession.amount = moveSession.amount + solvesToMoveAmount;
        moveSession.fullAmount = moveSession.fullAmount + solvesToMoveFullAmount;

        moveSession.validTimes.push(...validSolves.map(el => (el.flag === '+2' ? el.time + 2000 : el.time)));

        moveSession.stdev = calcDeviation(moveSession.validTimes, moveSession.average);

        if (moveSession.best < solvesToMoveBest) {
            moveSession.best = solvesToMoveBest;
        }

        // Remove solves from current obj
        realm.delete(solves);

        // check for best times
        if (solvesToMoveBest === delSession.best) {
            delSession.best = Math.min(...delSession.validTimes);
        }
    });
};
