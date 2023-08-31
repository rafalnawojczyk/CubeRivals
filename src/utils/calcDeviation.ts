import { calcAvg } from './calcAvg';

export const calcDeviation = (times: number[]) => {
    const mean = calcAvg(times, false);
    let deviationSum = 0;

    for (let i = 0; i <= times.length - 1; i++) {
        deviationSum += Math.abs(times[i] - mean);
    }

    const deviation = deviationSum / times.length;

    return deviation;
};
