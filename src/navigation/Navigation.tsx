import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { ThemeContext } from '../store/theme-context';

import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

import { AppProvider, RealmProvider, UserProvider } from '@realm/react';
import Constants from 'expo-constants';
import { schemas } from '../models/realm-models';
import { OpenRealmBehaviorType, OpenRealmTimeOutBehavior } from 'realm';
import { SolvesContextProvider } from '../store/solves-context';
import { Solve } from '../models/realm-models/SolveSchema';

export const Navigation = ({ onReady }: { onReady: () => void }) => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <>
            <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
            <NavigationContainer onReady={onReady}>
                <AppProvider id={Constants?.expoConfig?.extra?.realmAppId}>
                    <UserProvider fallback={<AuthStack />}>
                        <RealmProvider
                            schema={schemas}
                            sync={{
                                flexible: true,
                                existingRealmFileBehavior: {
                                    type: OpenRealmBehaviorType.DownloadBeforeOpen,
                                    timeOut: 1000,
                                    timeOutBehavior:
                                        // In v11 the enums are not set up correctly, so we need to use the string values
                                        OpenRealmTimeOutBehavior?.OpenLocalRealm ?? 'openLocalRealm',
                                },
                            }}
                        >
                            <SolvesContextProvider>
                                <AppTabs />
                            </SolvesContextProvider>
                        </RealmProvider>
                    </UserProvider>
                </AppProvider>
            </NavigationContainer>
        </>
    );
};
