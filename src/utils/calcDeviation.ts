export const calcDeviation = (times: number[], mean: number) => {
    let deviationSum = 0;

    for (let i = 0; i <= times.length - 1; i++) {
        deviationSum += Math.abs(times[i] - mean);
    }

    const deviation = deviationSum / times.length;

    return deviation;
};
