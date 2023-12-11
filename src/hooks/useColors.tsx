import { ColorsInterface, DARK_THEME, LIGHT_THEME } from '../styles/colors';
import { useThemeStore } from '../store/themeStore';

export const useColors = () => {
    const isDarkTheme = useThemeStore(state => state.isDarkTheme);

    const getColor = (color: keyof ColorsInterface) => {
        const colorScheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

        return colorScheme[color];
    };

    return getColor;
};
