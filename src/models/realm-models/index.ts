import { createRealmContext } from '@realm/react';
import { Result } from './ResultSchema';

export const ResultRealmContext = createRealmContext({
    schema: [Result],
});
