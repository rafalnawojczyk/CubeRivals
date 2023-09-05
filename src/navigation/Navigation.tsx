import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../store/theme-context';
import { UserContext } from '../store/user-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

export const Navigation = ({ onReady }: { onReady: () => void }) => {
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true); // TODO: Temporary not used
    const { isDarkTheme } = useContext(ThemeContext);

    useEffect(() => {
        const unsubscribeAuthStateChanged = onAuthStateChanged(auth, authenticatedUser => {
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            setIsLoading(false);
        });

        return unsubscribeAuthStateChanged;
    }, [user]);

    return (
        <>
            <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
            <NavigationContainer onReady={onReady}>{user ? <AppTabs /> : <AuthStack />}</NavigationContainer>
        </>
    );
};
