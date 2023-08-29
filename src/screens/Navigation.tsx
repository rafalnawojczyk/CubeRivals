import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { RivalsScreen } from './RivalsScreen';
import { useContext } from 'react';
import { ThemeContext } from '../store/theme-context';
import { UserProfileScreen } from './UserProfileScreen';
import { TimerScreen } from './TimerScreen';
import { StatisticsScreen } from './StatisticsScreen';
import { getColor } from '../utils/getColor';
import { NavigationIcon } from '../components/NavigationIcon';

export const Navigation = ({ onReady }: { onReady: () => void }) => {
    const BottomTabs = createBottomTabNavigator();

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <>
            <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
            <NavigationContainer onReady={onReady}>
                <BottomTabs.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: getColor(isDarkTheme, 'text'),
                        tabBarInactiveTintColor: getColor(isDarkTheme, 'gray400'),
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: getColor(isDarkTheme, 'gray800'),
                            alignItems: 'center',
                            height: 70,
                        },
                    }}
                >
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
                                    bgActiveColor={getColor(isDarkTheme, 'primary')}
                                />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="RivalsScreen"
                        component={RivalsScreen}
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ size, color, focused }) => (
                                <NavigationIcon
                                    size={size}
                                    color={color}
                                    icon="trophy-outline"
                                    isActive={focused}
                                    bgActiveColor={getColor(isDarkTheme, 'primary')}
                                />
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
                                    bgActiveColor={getColor(isDarkTheme, 'primary')}
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
                                <NavigationIcon
                                    size={size}
                                    color={color}
                                    icon="md-person-outline"
                                    isActive={focused}
                                    bgActiveColor={getColor(isDarkTheme, 'primary')}
                                />
                            ),
                        }}
                    />
                </BottomTabs.Navigator>
            </NavigationContainer>
        </>
    );
};
