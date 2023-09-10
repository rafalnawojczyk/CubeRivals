import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { CubeType } from '../models/cubes';
import { BSON } from 'realm';

// const DEFAULT_SESSIONS: SessionType = {
//     '333': '',
//     '222': '',
//     '444': '',
//     '555': '',
//     '666': '',
//     clock: '',
//     pyram: '',
//     sq1: '',
//     skewb: '',
//     minx: '',
// };

// type SessionType = {
//     [key in CubeType]: BSON.ObjectId | '';
// };

export type TimerSettingsType = {
    cube: CubeType;
    // sessions: SessionType;
    session: BSON.ObjectId | '';
    inspectionTime: boolean;
    hideTime: boolean;
    hideUi: boolean;
    showWholeMs: boolean;
    showEasyAdd: boolean;
    stickerColors: string[];
};

const DEFAULT_SETTINGS: TimerSettingsType = {
    cube: '333',
    // sessions: DEFAULT_SESSIONS,
    session: '',
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
    // updateSessions: (cube: CubeType, session: BSON.ObjectId) => void;
    timerSettings: TimerSettingsType;
}

export const TimerSettingsContext = createContext<TimerSettingsContextInterface>({
    timerSettings: DEFAULT_SETTINGS,
    updateSettings: () => {},
    // updateSessions: (cube, session) => {},
});

export const TimerSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [timerSettings, setTimerSettings] = useState(DEFAULT_SETTINGS);

    // TODO: USER CHANGES CUBE - SET NEW SESSION IN TIMER SETTINGS(USE EFFECT)

    const updateTimerSettings = (newSettings: Partial<TimerSettingsType>) => {
        setTimerSettings(prevSettings => {
            const updatedSettings = { ...prevSettings, ...newSettings };

            AsyncStorage.setItem('timerSettings', JSON.stringify(updatedSettings));

            return updatedSettings;
        });
    };

    // const updateSessions = (cube: CubeType, session: BSON.ObjectId) => {
    //     setTimerSettings(prev => {
    //         const newSessions = { ...prev.sessions, [cube]: session };

    //         return { ...prev, sessions: newSessions };
    //     });
    // };

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
