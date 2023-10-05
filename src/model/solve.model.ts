import { Model } from '@nozbe/watermelondb';
import { field, text, date, relation, writer } from '@nozbe/watermelondb/decorators';
import { SolveFlagType } from '../models/realm-models/SolveSchema';

export class Solve extends Model {
    static table = 'solves';

    // @ts-ignore
    @field('time') time: number;
    // @ts-ignore
    @field('scramble') scramble: string;
    // @ts-ignore
    @date('created_at') createdAt: Date;
    // @ts-ignore
    @text('note') note?: string;
    // @ts-ignore
    @field('flag') flag?: SolveFlagType;
    // @ts-ignore
    @field('inspection') inspection?: number;
    // @ts-ignore
    @field('is_starred') isStarred?: boolean;
    // @ts-ignore
    @field('is_valid') isValid: boolean;
    // @ts-ignore
    @relation('sessions', 'session_id') sessionId;

    // @ts-ignore
    @writer async updateSolve(newSolveData: Partial<Solve>) {
        await this.update(solve => {
            if (newSolveData.hasOwnProperty('note')) {
                solve.note = newSolveData.note;
            }

            if (newSolveData.hasOwnProperty('scramble')) {
                solve.scramble = newSolveData.scramble ? newSolveData.scramble : '';
            }

            if (newSolveData.hasOwnProperty('isStarred')) {
                solve.isStarred = !!newSolveData.isStarred;
            }

            if (newSolveData.hasOwnProperty('time') && newSolveData.time) {
                solve.time = newSolveData.time;
            }

            if (newSolveData.hasOwnProperty('isValid')) {
                solve.isValid = !!newSolveData.isValid;
            }

            // TODO: read how to change relation to another session_id
        });
    }
}
