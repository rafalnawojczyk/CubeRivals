const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const formatTimestamp = (timestamp: number | Date): { date: string; time: string } => {
    let date = timestamp as Date;

    if (typeof timestamp === 'number') {
        date = new Date(timestamp);
    }

    const day = date.getDate();
    const month = months[date.getMonth()].slice(0, 3);
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return { date: `${day} ${month} ${year}`, time: ` ${hours}:${minutes}` };
};
