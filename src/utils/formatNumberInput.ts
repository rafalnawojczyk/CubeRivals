export const formatNumberInput = (input: string, roundMilliseconds: boolean = true): string => {
    let cleanInput = input;

    if (cleanInput.length === 0) {
        return '';
    }

    if (cleanInput.length < 3) {
        cleanInput = cleanInput.padStart(3, '0');
    }

    const parts: string[] = [];

    const getLength = (number: number) => {
        if (roundMilliseconds) {
            return number;
        } else {
            return number + 1;
        }
    };

    if (cleanInput.length > getLength(6)) {
        parts.push(cleanInput.substring(0, cleanInput.length - getLength(6)) + 'H');
        parts.push(cleanInput.substring(cleanInput.length - getLength(6), cleanInput.length - getLength(4)));
        parts.push(cleanInput.substring(cleanInput.length - getLength(4), cleanInput.length - getLength(2)));
        parts.push(cleanInput.substring(cleanInput.length - getLength(2)));
    } else if (cleanInput.length > getLength(4)) {
        parts.push(cleanInput.substring(0, cleanInput.length - getLength(4)));
        parts.push(cleanInput.substring(cleanInput.length - getLength(4), cleanInput.length - getLength(2)));
        parts.push(cleanInput.substring(cleanInput.length - getLength(2)));
    } else if (cleanInput.length > getLength(2)) {
        parts.push(cleanInput.substring(0, cleanInput.length - getLength(2)));
        parts.push(cleanInput.substring(cleanInput.length - getLength(2)));
    } else {
        parts.push(cleanInput);
    }

    let formattedInput = parts.join(':');

    if (formattedInput.includes(':')) {
        const lastIndex = formattedInput.lastIndexOf(':');
        formattedInput = formattedInput.substring(0, lastIndex) + '.' + formattedInput.substring(lastIndex + 1);
    }

    return formattedInput;
};
