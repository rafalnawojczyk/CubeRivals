import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { CubeType } from '../models/cubes';

export type TimerSettingsType = {
    cube: CubeType;
    session: string;
    inspectionTime: boolean;
    hideTime: boolean;
    hideUi: boolean;
    showWholeMs: boolean;
    showEasyAdd: boolean;
    stickerColors: string[];
};

const DEFAULT_SETTINGS: TimerSettingsType = {
    cube: '333',
    session: 'Default Session',
    inspectionTime: false,
    hideTime: false,
    hideUi: true,
    showWholeMs: false,
    showEasyAdd: false,
    stickerColors: ['#ffffff', '#fef200', '#06d002', '#0079fe', '#ed1b24', '#ff7f26'],
    // autoExport: false,
};

interface TimerSettingsContextInterface {
    updateSettings: (newSettings: Partial<TimerSettingsType>) => void;
    timerSettings: TimerSettingsType;
}

export const TimerSettingsContext = createContext<TimerSettingsContextInterface>({
    timerSettings: DEFAULT_SETTINGS,
    updateSettings: () => {},
});

export const TimerSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [timerSettings, setTimerSettings] = useState(DEFAULT_SETTINGS);

    const updateTimerSettings = (newSettings: Partial<TimerSettingsType>) => {
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
