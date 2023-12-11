import { Session } from '../realm-models/SessionSchema';
import { Solve } from '../realm-models/SolveSchema';
import { useRealm } from '@realm/react';
import { calcDeviation } from '../../utils/calcDeviation';
import { removeElementFromArray } from '../../utils/removeElementFromArray';

export const editSolveHandler = (solve: Solve, solveEdit: Partial<Solve>, currentSession: Session): void => {
    const realm = useRealm();
    const keyValPairs = Object.entries(solveEdit);

    if (keyValPairs.length === 0) {
        return;
    }

    realm.write(() => {
        if (solveEdit.hasOwnProperty('flag')) {
            // check how flags have changed
            if (solve.flag === 'dnf' || solve.flag === 'dns') {
                if (!solveEdit.flag || solveEdit.flag === '+2') {
                    // from dns/dnf to no flag or +2
                    const newAmount = currentSession.amount + 1;

                    const newSolveTime = solveEdit.flag === '+2' ? solve.time + 2000 : solve.time;

                    currentSession.validTimes.push(newSolveTime);

                    currentSession.average =
                        (currentSession.average * currentSession.amount + newSolveTime) / newAmount;
                    currentSession.amount = newAmount;
                    currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                    if (currentSession.best > newSolveTime || currentSession.best === 0) {
                        currentSession.best = newSolveTime;
                    }
                }
            }

            if (solve.flag === '+2') {
                if (solveEdit.flag === 'dnf' || solveEdit.flag === 'dns') {
                    // from +2 to dnf/dns
                    const newAmount = currentSession.amount - 1;

                    currentSession.validTimes = removeElementFromArray(currentSession.validTimes, solve.time + 2000);

                    currentSession.average =
                        (currentSession.average * currentSession.amount - solve.time + 2000) / newAmount;
                    currentSession.amount = newAmount;

                    currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                    if (currentSession.best === solve.time + 2000) {
                        if (currentSession.amount !== 0) {
                            currentSession.best = Math.min(...currentSession.validTimes);
                        } else {
                            currentSession.best = 0;
                        }
                    }
                }

                if (!solveEdit.flag) {
                    // from +2 to no flags
                    currentSession.validTimes = removeElementFromArray(currentSession.validTimes, solve.time + 2000);

                    currentSession.validTimes.push(solve.time);

                    currentSession.average =
                        (currentSession.average * currentSession.amount - 2000) / currentSession.amount;

                    currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                    if (currentSession.best > solve.time) {
                        currentSession.best = solve.time;
                    }
                }
            }

            if (!solve.flag) {
                if (solveEdit.flag === 'dnf' || solveEdit.flag === 'dns') {
                    // from no flags to dnf/dns
                    const newAmount = currentSession.amount - 1;

                    if (newAmount === 0) {
                        currentSession.average = 0;
                    } else {
                        currentSession.average =
                            (currentSession.average * currentSession.amount - solve.time) / newAmount;
                    }

                    currentSession.amount = newAmount;

                    currentSession.validTimes = removeElementFromArray(currentSession.validTimes, solve.time);

                    currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                    if (currentSession.best === solve.time) {
                        if (currentSession.amount !== 0) {
                            currentSession.best = Math.min(...currentSession.validTimes);
                        } else {
                            currentSession.best = 0;
                        }
                    }
                }

                if (solveEdit.flag === '+2') {
                    // from no flags to +2
                    currentSession.average =
                        (currentSession.average * currentSession.amount + 2000) / currentSession.amount;

                    currentSession.validTimes = removeElementFromArray(currentSession.validTimes, solve.time);
                    currentSession.validTimes.push(solve.time + 2000);

                    currentSession.stdev = calcDeviation(currentSession.validTimes, currentSession.average);

                    if (currentSession.best === solve.time) {
                        currentSession.best = Math.min(...currentSession.validTimes);
                    }
                }
            }

            solve.flag = solveEdit.flag;
        }

        if (solveEdit.hasOwnProperty('note')) {
            solve.note = solveEdit.note;
        }

        if (solveEdit.hasOwnProperty('scramble')) {
            solve.scramble = solveEdit.scramble ? solveEdit.scramble : '';
        }

        if (solveEdit.hasOwnProperty('star')) {
            solve.star = solveEdit.star;
        }
    });
};
