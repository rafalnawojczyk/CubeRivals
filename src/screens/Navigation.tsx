import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { MainScreen } from './MainScreen';
import { useContext } from 'react';
import { ThemeContext } from '../store/theme-context';
import { UserProfileScreen } from './UserProfileScreen';
import { TimerScreen } from './TimerScreen';
import { StatisticsScreen } from './StatisticsScreen';
import { Ionicons } from '@expo/vector-icons';
import { getColor } from '../utils/getColor';

export const Navigation = ({ onReady }: { onReady: () => void }) => {
    const BottomTabs = createBottomTabNavigator();

    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <>
            <StatusBar style={isDarkTheme ? 'dark' : 'light'} />
            <NavigationContainer onReady={onReady}>
                <BottomTabs.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarIconStyle: {
                            borderRadius: 5000,
                            backgroundColor: 'red',
                        },
                        tabBarActiveTintColor: getColor(isDarkTheme, 'primary'),
                    }}
                >
                    {/* <BottomTabs.Screen name="MainScreen" component={MainScreen} options={{}} /> */}
                    <BottomTabs.Screen
                        name="TimerScreen"
                        component={TimerScreen}
                        options={{
                            title: 'Timer',
                            tabBarIcon: ({ size, color }) => (
                                <Ionicons size={size} color={color} name="timer-outline" />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="StatisticsScreen"
                        component={StatisticsScreen}
                        options={{
                            title: 'Statistics',
                            tabBarIcon: ({ size, color }) => (
                                <Ionicons size={size} color={color} name="stats-chart-outline" />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name="UserProfileScreen"
                        component={UserProfileScreen}
                        options={{
                            title: 'Profile',
                            tabBarIcon: ({ size, color }) => (
                                <Ionicons size={size} color={color} name="md-person-outline" />
                            ),
                        }}
                    />
                </BottomTabs.Navigator>
            </NavigationContainer>
        </>
    );
};
