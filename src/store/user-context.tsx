import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useLayoutEffect } from 'react';
import * as Localization from 'expo-localization';
import { CubeType } from '../models/cubes';
import { TranslationCodes } from '../hooks/useTranslation';

export interface SessionObjectInterface {
    name: string;
    id: string;
    cube: CubeType;
    lastUsed: number;
}

interface UserDataInterface {
    isLoaded: boolean;
    username: string;
    lang: TranslationCodes;
    updateUser: (updatedUser: PartialUserDataType) => void;
}

type UserDataType = Omit<UserDataInterface, 'updateUser'>;

type PartialUserDataType = Partial<UserDataType>;

export const UserContext = createContext<UserDataInterface>({
    isLoaded: false,
    username: 'Speedcuber',
    lang: 'en',
    updateUser: (updatedUser: PartialUserDataType) => {},
});

export const UserContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [userData, setUserData] = useState<Omit<UserDataType, 'setUser' | 'user'>>({
        isLoaded: false,
        username: 'Speedcuber',
        lang: 'en',
    });

    const updateUser = (updatedUser: PartialUserDataType) => {
        setUserData(prevData => {
            const newUserData = { ...prevData, ...updatedUser };

            AsyncStorage.setItem('userData', JSON.stringify(newUserData));

            return newUserData;
        });
    };

    const value: UserDataInterface = {
        isLoaded: userData.isLoaded,
        username: userData.username,
        lang: userData.lang,
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

                        updateUser({ lang: Localization.locale.slice(0, 2) as TranslationCodes });
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
