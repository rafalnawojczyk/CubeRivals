import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { RivalsScreen } from './RivalsScreen';
import { useContext } from 'react';
import { ThemeContext } from '../store/theme-context';
import { UserProfileScreen } from './UserProfileScreen';
import { TimerScreen } from './TimerScreen';
import { StatisticsScreen } from './StatisticsScreen';
import { NavigationIcon } from '../components/NavigationIcon';
import { SettingsScreen } from './SettingsScreen';
import { useColors } from '../hooks/useColors';

export const Navigation = ({ onReady }: { onReady: () => void }) => {
    const BottomTabs = createBottomTabNavigator();

    const { isDarkTheme } = useContext(ThemeContext);
    const getColor = useColors();

    return (
        <>
            <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
            <NavigationContainer onReady={onReady}>
                <BottomTabs.Navigator
                    initialRouteName="TimerScreen"
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: getColor('text'),
                        tabBarInactiveTintColor: getColor('gray400'),
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            borderTopWidth: 0,
                            backgroundColor: getColor('gray800'),
                            alignItems: 'center',
                            height: 70,
                        },
                    }}
                >
                    <BottomTabs.Screen
                        name="RivalsScreen"
                        component={RivalsScreen}
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ size, color, focused }) => (
                                <NavigationIcon size={size} color={color} icon="trophy-outline" isActive={focused} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="StatisticsScreen"
                        component={StatisticsScreen}
                        options={{
                            title: 'Statistics',
                            tabBarIcon: ({ size, color, focused }) => (
                                <NavigationIcon
                                    size={size}
                                    color={color}
                                    icon="stats-chart-outline"
                                    isActive={focused}
                                />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="TimerScreen"
                        component={TimerScreen}
                        options={{
                            title: 'Timer',
                            tabBarIcon: ({ size, color, focused }) => (
                                <NavigationIcon
                                    size={size}
                                    color={color}
                                    icon="timer-outline"
                                    isActive={focused}
                                    isMiddleIcon={true}
                                />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="UserProfileScreen"
                        component={UserProfileScreen}
                        options={{
                            title: 'Profile',
                            tabBarIcon: ({ size, color, focused }) => (
                                <NavigationIcon size={size} color={color} icon="md-person-outline" isActive={focused} />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="SettingsScreen"
                        component={SettingsScreen}
                        options={{
                            title: 'Settings',
                            tabBarIcon: ({ size, color, focused }) => (
                                <NavigationIcon size={size} color={color} icon="settings-outline" isActive={focused} />
                            ),
                        }}
                    />
                </BottomTabs.Navigator>
            </NavigationContainer>
        </>
    );
};
