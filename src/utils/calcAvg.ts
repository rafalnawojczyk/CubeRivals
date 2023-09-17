import { Solve } from '../models/realm-models/SolveSchema';

const THRESHOLD = 0.05;

export const calcAvg = (times: Solve[], isAvg: boolean): string => {
    if (isAvg) {
        // AVG CALCULATIONS

        const amountToCut = Math.ceil(times.length * THRESHOLD); // from both ends

        const validSolves = times.filter(el => el.flag !== 'dnf' && el.flag !== 'dns');

        if (amountToCut < times.length - validSolves.length) {
            return 'DNF';
        }

        const timesToCount = validSolves
            .map(el => (el.flag === '+2' ? el.time + 2000 : el.time))
            .sort((a, b) => a - b)
            .slice(amountToCut - (times.length - validSolves.length), -amountToCut);

        const avg = timesToCount.reduce((a, b) => a + b, 0) / timesToCount.length;

        return avg.toFixed(2).toString();
    } else {
        // MEAN CALCULATIONS

        if (times.find(el => el.flag === 'dnf' || el.flag === 'dns')) {
            return 'DNF';
        }

        const mean = times.reduce((a, b) => a + (b.flag === '+2' ? b.time + 2000 : b.time), 0) / times.length;

        return mean.toFixed(2).toString();
    }
};
