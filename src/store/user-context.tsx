import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useLayoutEffect } from 'react';

interface UserDataInterface {
    username: string;
    lang: string;
    updateUser: (updatedUser: PartialUserDataType) => void;
}

type UserDataType = Omit<UserDataInterface, 'updateUser'>;

type PartialUserDataType = Partial<UserDataType>;

export const UserContext = createContext<UserDataInterface>({
    username: 'Speedcuber',
    lang: 'en',
    updateUser: (updatedUser: PartialUserDataType) => {},
});

export const UserContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [userData, setUserData] = useState<UserDataType>({
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

    const value = {
        username: userData.lang,
        lang: userData.username,
        updateUser,
    };

    useLayoutEffect(() => {
        const getUserDataFromStorage = async () => {
            try {
                const savedUserData = await AsyncStorage.getItem('userData');

                if (savedUserData) {
                    const parsedData = JSON.parse(savedUserData);

                    setUserData(prevData => ({ ...prevData, ...parsedData }));
                }
            } catch (err) {
                console.log(err);
            }
        };

        getUserDataFromStorage();
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
