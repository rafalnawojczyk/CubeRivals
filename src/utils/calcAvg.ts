const THRESHOLD = 0.05;
// TODO: this should take into account that user can specify that he doesnt want to count AVG and count means only
export const calcAvg = (times: number[], isAvg: boolean) => {
    let timesToCalc = [...times];

    if (isAvg) {
        const amountToCut = timesToCalc.length * THRESHOLD;

        timesToCalc = timesToCalc.slice(amountToCut, -amountToCut);
    }

    return timesToCalc.reduce((acc, time) => acc + time, 0) / timesToCalc.length;
};
