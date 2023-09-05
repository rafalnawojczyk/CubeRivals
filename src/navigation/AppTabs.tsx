import { RivalsScreen } from '../screens/RivalsScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { TimerScreen } from '../screens/TimerScreen';
import { StatisticsScreen } from '../screens/StatisticsScreen';
import { NavigationIcon } from '../components/NavigationIcon';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useColors } from '../hooks/useColors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const AppTabs = () => {
    const BottomTabs = createBottomTabNavigator();

    const getColor = useColors();

    return (
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
                        <NavigationIcon size={size} color={color} icon="stats-chart-outline" isActive={focused} />
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
    );
};
