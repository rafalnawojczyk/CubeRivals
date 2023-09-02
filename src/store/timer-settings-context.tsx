import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

const DEFAULT_SETTINGS = {
    inspectionTime: false,
    hideTime: false,
    hideUi: true,
    // autoExport: false,
    showWholeMs: false,
    stickerColors: ['#ffffff', '#fef200', '#06d002', '#0079fe', '#ed1b24', '#ff7f26'],
};

export type TimerSettingsType = typeof DEFAULT_SETTINGS;

interface TimerSettingsContextInterface {
    updateSettings: (newSettings: Partial<typeof DEFAULT_SETTINGS>) => void;
    timerSettings: typeof DEFAULT_SETTINGS;
}

export const TimerSettingsContext = createContext<TimerSettingsContextInterface>({
    timerSettings: DEFAULT_SETTINGS,
    updateSettings: () => {},
});

export const TimerSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [timerSettings, setTimerSettings] = useState(DEFAULT_SETTINGS);

    const updateTimerSettings = (newSettings: Partial<typeof DEFAULT_SETTINGS>) => {
        setTimerSettings(prevSettings => {
            const updatedSettings = { ...prevSettings, ...newSettings };

            AsyncStorage.setItem('timerSettings', JSON.stringify(updatedSettings));

            return updatedSettings;
        });
    };

    useEffect(() => {
        const getSettingsFromStorage = async () => {
            const storedSettings = await AsyncStorage.getItem('timerSettings');

            if (storedSettings) {
                const parsedSettings = JSON.parse(storedSettings);
                setTimerSettings(prevSettings => ({ ...prevSettings, ...parsedSettings }));
            }
        };

        getSettingsFromStorage();
    }, []);

    return (
        <TimerSettingsContext.Provider value={{ timerSettings, updateSettings: updateTimerSettings }}>
            {children}
        </TimerSettingsContext.Provider>
    );
};
