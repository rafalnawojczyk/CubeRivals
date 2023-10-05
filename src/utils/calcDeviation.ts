export const calcDeviation = (times: Realm.List<number>, mean: number) => {
    let deviationSum = 0;
    const timesLength = times.length;

    for (let i = 0; i <= times.length - 1; i++) {
        deviationSum += Math.abs(times[i] - mean);
    }

    const deviation = deviationSum / timesLength;

    return deviation;
};
