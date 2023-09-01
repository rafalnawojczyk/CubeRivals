export interface Result {
    time: number; // in ms
    date: number; // in ms
    scramble: string;
    note?: string;
    flag?: 'dnf' | 'dns' | '+2';
}
