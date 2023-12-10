import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { CubeType } from '../models/cubes';
import { TranslationCodes } from '../hooks/useTranslation';
import * as Localization from 'expo-localization';

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

export const useUserStore = create<UserDataInterface>(set => ({
    isLoaded: false,
    username: 'Speedcuber',
    lang: 'en',
    updateUser: (updatedUser: PartialUserDataType) => {
        useUserStore.setState(prevData => {
            const newUserData = { ...prevData, ...updatedUser };

            AsyncStorage.setItem('userData', JSON.stringify(newUserData));

            return updatedUser;
        });
    },
}));

const getUserDataFromStorage = async () => {
    try {
        const savedUserData = await AsyncStorage.getItem('userData');

        if (savedUserData) {
            const parsedData = JSON.parse(savedUserData);

            const dataToUpdate: Partial<UserDataInterface> = { ...parsedData, isLoaded: true };

            if (!parsedData.lang) {
                parsedData.lang === Localization.locale.slice(0, 2);

                dataToUpdate.lang = Localization.locale.slice(0, 2) as TranslationCodes;
            }

            useUserStore.setState(dataToUpdate);
            return;
        }

        useUserStore.setState({ isLoaded: true });
    } catch (err) {
        console.log(err);
    }
};

getUserDataFromStorage();
