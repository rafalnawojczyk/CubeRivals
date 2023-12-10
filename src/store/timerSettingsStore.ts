import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { CubeType } from '../models/cubes';
import { DEFAULT_TIMER_SETTINGS } from '../constants/TimerSettings';

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
    cutEndsInAvgs: boolean;
};

interface TimerSettingsContextInterface extends TimerSettingsType {
    updateSettings: (newSettings: Partial<TimerSettingsType>) => void;
    resetSettings: () => void;
}

export const useTimerSettingsStore = create<TimerSettingsContextInterface>(set => ({
    ...DEFAULT_TIMER_SETTINGS,
    updateSettings: (newSettings: Partial<TimerSettingsType>) => {
        set(prevSettings => {
            const updatedSettings = { ...prevSettings, ...newSettings };
            AsyncStorage.setItem('timerSettings', JSON.stringify(updatedSettings));

            return { ...newSettings };
        });
    },
    resetSettings: () => {
        const { cube, ...newSettings } = {
            ...DEFAULT_TIMER_SETTINGS,
        };
        set(newSettings);
    },
}));
