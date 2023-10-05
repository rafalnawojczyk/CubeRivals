import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
    version: 3,
    tables: [
        tableSchema({
            name: 'solves',
            columns: [
                { name: 'time', type: 'number' },
                { name: 'scramble', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'note', type: 'string', isOptional: true },
                { name: 'flag', type: 'string', isOptional: true },
                { name: 'inspection', type: 'number', isOptional: true },
                { name: 'is_starred', type: 'boolean', isOptional: true },
                { name: 'session_id', type: 'string', isIndexed: true },
                { name: 'is_valid', type: 'boolean', isIndexed: true },
            ],
        }),
        tableSchema({
            name: 'sessions',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'cube', type: 'string' },
                { name: 'last_seen_at', type: 'number' },
                { name: 'best', type: 'number' },
                { name: 'amount', type: 'number' },
                { name: 'full_amount', type: 'number' },
                { name: 'average', type: 'number' },
                { name: 'st_dev', type: 'number' },
                { name: 'owner_id', type: 'string', isIndexed: true },
            ],
        }),
    ],
});

// TODO: Check if there is an ID field in solves/sessions
// TODO: each solve has is_valid field. If it's set - query for this time and use it to calc deviation/avg?
// TODO: maybe use validTimes as JSON field?
