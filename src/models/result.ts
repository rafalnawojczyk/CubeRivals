import { SolveFlagType } from './realm-models/SolveSchema';

export interface Result {
    time: number; // in ms
    scramble: string;
    note?: string;
    flag?: SolveFlagType;
    inspection?: number;
    star?: boolean;
}
