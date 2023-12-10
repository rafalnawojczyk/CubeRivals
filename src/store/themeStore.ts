import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { useColorScheme } from 'react-native';

type ThemeType = 'dark' | 'light';

interface ThemeStoreInterface {
    isDarkTheme: boolean;
    setThemeByUser: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeStoreInterface>(() => ({
    isDarkTheme: true,
    setThemeByUser: async (theme: ThemeType) => {
        try {
            await AsyncStorage.setItem('theme', theme);
        } catch (err) {
            console.log(err);
        } finally {
            useThemeStore.setState({ isDarkTheme: theme === 'dark' });
        }
    },
}));

const getThemeFromStorage = async () => {
    const deviceTheme = useColorScheme();
    try {
        const savedTheme = await AsyncStorage.getItem('theme');

        if (savedTheme) {
            useThemeStore.setState({ isDarkTheme: savedTheme === 'dark' });
        } else {
            useThemeStore.setState({ isDarkTheme: deviceTheme === 'dark' });
        }
    } catch (err) {
        console.log(err);
    }
};

getThemeFromStorage();
