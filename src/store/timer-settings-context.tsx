import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useEffect, useState } from 'react';
import { CubeType } from '../models/cubes';

export type InspectionAlertsType = 'none' | 'vibration' | 'sound' | 'both';

export type TimerSettingsType = {
    cube: CubeType;
    inspection: boolean;
    hideTime: boolean;
    hideUi: boolean;
    showWholeMs: boolean;
    showEasyAdd: boolean;
    stickerColors: string[];
    inspectionTime: number;
    inspectionAlerts: InspectionAlertsType;
    inspectionAudioNumber: number;
    inspectionVibrationPattern: 'Error' | 'Success' | 'Warning';
    scrambleBlockPlacement: 'top' | 'bottom';
    holdDelay: number;
    avgThresholds: number[];
};

const DEFAULT_SETTINGS: TimerSettingsType = {
    cube: '333',
    hideTime: false,
    hideUi: true,
    showWholeMs: false,
    showEasyAdd: false,
    stickerColors: ['#ffffff', '#fef200', '#06d002', '#0079fe', '#ed1b24', '#ff7f26'],
    inspection: false,
    inspectionTime: 15,
    inspectionAlerts: 'none',
    inspectionVibrationPattern: 'Warning',
    inspectionAudioNumber: 0,
    scrambleBlockPlacement: 'top',
    holdDelay: 500,
    avgThresholds: [5, 12, 50, 100],
};

interface TimerSettingsContextInterface {
    updateSettings: (newSettings: Partial<TimerSettingsType>) => void;
    resetSettings: () => void;
    timerSettings: TimerSettingsType;
}

export const TimerSettingsContext = createContext<TimerSettingsContextInterface>({
    timerSettings: DEFAULT_SETTINGS,
    resetSettings: () => {},
    updateSettings: () => {},
});

export const TimerSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [timerSettings, setTimerSettings] = useState(DEFAULT_SETTINGS);

    const updateTimerSettings = useCallback((newSettings: Partial<TimerSettingsType>) => {
        setTimerSettings(prevSettings => {
            const updatedSettings = { ...prevSettings, ...newSettings };

            AsyncStorage.setItem('timerSettings', JSON.stringify(updatedSettings));

            return updatedSettings;
        });
    }, []);

    const resetSettings = useCallback(() => {
        const newSettings: Partial<TimerSettingsType> = { ...DEFAULT_SETTINGS };

        delete newSettings.cube;

        updateTimerSettings(DEFAULT_SETTINGS);
    }, []);

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
        <TimerSettingsContext.Provider value={{ timerSettings, updateSettings: updateTimerSettings, resetSettings }}>
            {children}
        </TimerSettingsContext.Provider>
    );
};
