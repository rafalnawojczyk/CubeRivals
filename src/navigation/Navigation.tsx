import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../store/theme-context';

import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

import { SolvesContextProvider } from '../store/solves-context';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../store/user-context';
import { generateInitialDb } from '../model/database';

export const Navigation = ({ onReady }: { onReady: () => void }) => {
    const [session, setSession] = useState<Session | null>(null);
    const { userType } = useContext(UserContext);
    const [showAuth, setShowAuth] = useState(true);

    const { isDarkTheme } = useContext(ThemeContext);

    useEffect(() => {
        const checkStorage = async () => {
            const user = await AsyncStorage.getItem('appUser');

            if (user === 'anonymous') {
                setShowAuth(false);
            }
        };

        checkStorage();

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    useEffect(() => {
        if (session && session.user) {
            setShowAuth(false);
        }
    }, [session]);

    useEffect(() => {
        const checkFirstInit = async () => {
            const firstInit = await AsyncStorage.getItem('firstInit');

            if (firstInit === 'initialized') {
                return;
            }

            if (!firstInit) {
                generateInitialDb();
                await AsyncStorage.setItem('firstInit', 'initialized');
            }
        };

        if (userType === 'anonymous' || userType === 'registered') {
            checkFirstInit();
        }

        if (userType === 'anonymous') {
            setShowAuth(false);
        }

        if (!userType && !showAuth) {
            setShowAuth(true);
        }
    }, [userType]);

    return (
        <>
            <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
            <NavigationContainer onReady={onReady}>
                {!showAuth && (
                    <SolvesContextProvider>
                        <AppTabs />
                    </SolvesContextProvider>
                )}
                {showAuth && <AuthStack />}
            </NavigationContainer>
        </>
    );
};
