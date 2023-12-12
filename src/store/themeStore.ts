import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type ThemeType = 'dark' | 'light';

interface ThemeStoreInterface {
    isDarkTheme: boolean;
    setThemeByUser: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeStoreInterface>(set => ({
    isDarkTheme: true,
    setThemeByUser: async (theme: ThemeType) => {
        try {
            await AsyncStorage.setItem('theme', theme);
        } catch (err) {
            console.log(err);
        } finally {
            set({ isDarkTheme: theme === 'dark' });
        }
    },
}));
