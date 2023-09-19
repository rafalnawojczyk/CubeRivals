export const formatTime = (milliseconds: number, roundMilliseconds: boolean = true) => {
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;
    const seconds = Math.floor(milliseconds / 1000);
    milliseconds %= 1000;

    const formattedMinutes = minutes.toString();
    const formattedSeconds = seconds.toString();
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');

    return `${formattedMinutes === '0' ? '' : `${formattedMinutes}:`}${formattedSeconds}.${
        roundMilliseconds
            ? Math.round(+formattedMilliseconds / 10)
                  .toString()
                  .padStart(2, '0')
            : formattedMilliseconds.padStart(3, '0')
    }`;
};
