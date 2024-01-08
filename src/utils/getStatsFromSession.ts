import { BSON } from 'realm';
import { Session } from '../models/realm-models/SessionSchema';
import { Solve, SolveFlagType } from '../models/realm-models/SolveSchema';

export type StatisticElement = { date: Date; time: number; solveId: BSON.ObjectId; flag?: SolveFlagType };

export type StatsObject = {
    best: StatisticElement[];
    solves: StatisticElement[];
    avg1: StatisticElement[];
    avg2: StatisticElement[];
    avg3: StatisticElement[];
    avg4: StatisticElement[];
    inspection: StatisticElement[];
};

const getSolveTime = (solve: Solve): number => {
    let solveTime = solve.time;

    if (solve.flag === '+2') {
        return solveTime + 2000;
    }

    return solveTime;
};

const checkIfCountBest = (solve: Solve): boolean => {
    if (solve.flag === 'dnf' || solve.flag === 'dns') {
        return false;
    }

    return true;
};

export const getStatsFromSession = (session: Session, thresholds: [number, number, number, number]): StatsObject => {
    // Then make the same function that will loop through all AVGS and find out their best times over time
    const stats: StatsObject = {
        best: [],
        solves: [],
        avg1: [],
        avg2: [],
        avg3: [],
        avg4: [],
        inspection: [],
    };

    const solves = session.solves;

    if (solves.length === 0) {
        return stats;
    }

    // averages should be rolling after each solve?

    let lastBestSolveTime: number;

    solves.map((solve, index) => {
        // Solves to basic graphs
        stats.solves.push({
            date: solve.createdAt,
            time: getSolveTime(solve),
            solveId: solve._id,
            flag: solve.flag,
        });

        // solves inspection time
        if (!!solve.inspection) {
            stats.inspection.push({
                date: solve.createdAt,
                time: solve.inspection,
                flag: solve.flag,
                solveId: solve._id,
            });
        }

        // best solves graph
        if ((checkIfCountBest(solve) && getSolveTime(solve) < lastBestSolveTime) || !lastBestSolveTime) {
            lastBestSolveTime = getSolveTime(solve);
            stats.best.push({
                date: solve.createdAt,
                time: getSolveTime(solve),
                solveId: solve._id,
                flag: solve.flag,
            });
        }

        // DO i need counting avgs here or should I take this from session?
        // there I need to calc rolling avgs after each solve, so it will be a redundant work

        // calculate averages for each of 4 thresholds
        // thresholds are from lowest to highest like 5/12/50/100
        // after that it should calc rolling avgs?
        // for second 12/24/36/48 - find a formula to catch those numbers from index
        // and then get currentElement - X so it will be exactly same amount as threshold.
        // then just calc avg from them
    });

    return stats;
};
