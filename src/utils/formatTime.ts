export const formatTime = (milliseconds: number, roundMilliseconds: boolean = true) => {
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds %= 60000;
    const seconds = Math.floor(milliseconds / 1000);
    milliseconds %= 1000;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const formattedMilliseconds =
        milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : milliseconds.toString();

    return `${formattedMinutes === '00' ? '' : `${formattedMinutes}:`}${formattedSeconds}.${
        roundMilliseconds
            ? Math.round(+formattedMilliseconds / 10)
                  .toString()
                  .padStart(2, '0')
            : formattedMilliseconds.padStart(3, '0')
    }`;
};
