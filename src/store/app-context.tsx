import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useLayoutEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'dark' | 'light';

interface AppContextInterface {
    isDarkTheme: boolean;
    setThemeByUser: (theme: ThemeType) => void;
}

export const AppContext = createContext<AppContextInterface>({
    isDarkTheme: false,
    setThemeByUser: theme => {},
});

export const AppContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const deviceTheme = useColorScheme();

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const setThemeByUser = async (theme: ThemeType) => {
        try {
            await AsyncStorage.setItem('theme', theme);
        } catch (err) {
            console.log(err);
        } finally {
            setIsDarkTheme(theme === 'dark');
        }
    };

    useLayoutEffect(() => {
        const getThemeFromStorage = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');

                if (savedTheme) {
                    setIsDarkTheme(savedTheme === 'dark');
                } else {
                    setIsDarkTheme(deviceTheme === 'dark');
                }
            } catch (err) {
                console.log(err);
            }
        };

        getThemeFromStorage();
    }, []);

    return <AppContext.Provider value={{ isDarkTheme, setThemeByUser }}>{children}</AppContext.Provider>;
};
