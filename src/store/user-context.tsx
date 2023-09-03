import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useLayoutEffect } from 'react';
import * as Localization from 'expo-localization';
import { CubeType } from '../models/cubes';

export interface SessionObjectInterface {
    name: string;
    id: string;
    cube: CubeType;
    lastUsed: number;
}

interface UserDataInterface {
    isLoaded: boolean;
    username: string;
    lang: string;
    sessions: SessionObjectInterface[];
    updateUser: (updatedUser: PartialUserDataType) => void;
}

type UserDataType = Omit<UserDataInterface, 'updateUser'>;

type PartialUserDataType = Partial<UserDataType>;

export const UserContext = createContext<UserDataInterface>({
    isLoaded: false,
    username: 'Speedcuber',
    lang: 'en',
    sessions: [],
    updateUser: (updatedUser: PartialUserDataType) => {},
});

export const UserContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [userData, setUserData] = useState<UserDataType>({
        isLoaded: false,
        username: 'Speedcuber',
        lang: 'en',
        sessions: [],
    });

    const updateUser = (updatedUser: PartialUserDataType) => {
        setUserData(prevData => {
            const newUserData = { ...prevData, ...updatedUser };

            if (!!updatedUser?.sessions?.length) {
                newUserData.sessions = [...prevData.sessions, ...updatedUser.sessions];
            }

            AsyncStorage.setItem('userData', JSON.stringify(newUserData));

            return newUserData;
        });
    };

    const value: UserDataInterface = {
        isLoaded: userData.isLoaded,
        username: userData.username,
        lang: userData.lang,
        sessions: userData.sessions,
        updateUser,
    };

    useLayoutEffect(() => {
        const getUserDataFromStorage = async () => {
            try {
                const savedUserData = await AsyncStorage.getItem('userData');

                if (savedUserData) {
                    const parsedData = JSON.parse(savedUserData);

                    if (!parsedData.lang) {
                        parsedData.lang === Localization.locale.slice(0, 2);

                        updateUser({ lang: Localization.locale.slice(0, 2) });
                    }

                    setUserData(prevData => ({ ...prevData, ...parsedData, isLoaded: true }));
                    return;
                }
                setUserData(prevData => ({ ...prevData, isLoaded: true }));
            } catch (err) {
                console.log(err);
            }
        };

        getUserDataFromStorage();
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
