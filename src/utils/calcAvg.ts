const THRESHOLD = 0.05;

export const calcAvg = (times: number[], isAvg: boolean) => {
    let timesToCalc = [...times];

    if (isAvg) {
        const amountToCut = Math.ceil(timesToCalc.length * THRESHOLD);

        timesToCalc = timesToCalc.slice(amountToCut, -amountToCut);
    }

    return timesToCalc.reduce((acc, time) => acc + time, 0) / timesToCalc.length;
};
