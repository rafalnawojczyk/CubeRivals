import { Model, Q } from '@nozbe/watermelondb';
import { field, text, lazy, date, children, writer, action } from '@nozbe/watermelondb/decorators';
import { CubeType } from '../models/cubes';

export class Session extends Model {
    static table = 'sessions';

    static associations = {
        solves: { type: 'has_many', foreignKey: 'session_id' },
    } as const;

    // @ts-ignore
    @text('name') name: string;
    // @ts-ignore
    @field('cube') cube: CubeType;
    // @ts-ignore
    @date('last_seen_at') lastSeenAt: Date;
    // @ts-ignore
    @field('best') best: number;
    // @ts-ignore
    @field('amount') amount: number;
    // @ts-ignore
    @field('full_amount') fullAmount: number;
    // @ts-ignore
    @field('average') average: number;
    // @ts-ignore
    @field('st_dev') stDev: number;
    // @ts-ignore
    @field('owner_id') ownerId: string;
    // @ts-ignore
    @children('solves') solves;

    // @ts-ignore
    @lazy starredSolves = this.solves.extend(Q.where('is_starred', true));
    // @ts-ignore
    @lazy validSolves = this.solves.extend(Q.where('is_valid', true));

    // @ts-ignore
    @writer async updateSessionName(newName: string) {
        await this.update(session => {
            session.name = newName;
        });
    }
}
