import { useContext } from 'react';
import { ColorsInterface, DARK_THEME, LIGHT_THEME } from '../styles/colors';
import { ThemeContext } from '../store/theme-context';

export const useColors = () => {
    const { isDarkTheme } = useContext(ThemeContext);

    const getColor = (color: keyof ColorsInterface) => {
        const colorScheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

        return colorScheme[color];
    };

    return getColor;
};
