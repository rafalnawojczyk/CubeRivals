import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useLayoutEffect, useEffect } from 'react';
import * as Localization from 'expo-localization';
import { CubeType } from '../models/cubes';
import { User } from 'firebase/auth';

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
    user: UserState;
    setUser: (user: UserState) => void;
}

type UserDataType = Omit<UserDataInterface, 'updateUser'>;

type PartialUserDataType = Partial<UserDataType>;

type UserState = User | null;

export const UserContext = createContext<UserDataInterface>({
    isLoaded: false,
    username: 'Speedcuber',
    lang: 'en',
    sessions: [],
    updateUser: (updatedUser: PartialUserDataType) => {},
    user: null,
    setUser: (user: UserState) => {},
});

export const UserContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [userData, setUserData] = useState<Omit<UserDataType, 'setUser' | 'user'>>({
        isLoaded: false,
        username: 'Speedcuber',
        lang: 'en',
        sessions: [],
    });

    const [user, setUser] = useState<UserState>(null);

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
        user,
        setUser: setUser,
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
