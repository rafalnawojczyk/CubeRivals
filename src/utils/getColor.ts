import { ColorsInterface, DARK_THEME, LIGHT_THEME } from '../styles/colors';

export const getColor = (isDarkTheme: boolean, color: keyof ColorsInterface) => {
    const colorScheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

    return colorScheme[color];
};
