import { RivalsScreen } from '../screens/RivalsScreen';
import { TimesListScreen } from '../screens/TimesListScreen';
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
                tabBarInactiveTintColor: getColor('accentLight'),
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: getColor('background'),
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
                    tabBarIcon: ({ color, focused }) => (
                        <NavigationIcon color={color} icon="rivals" isActive={focused} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="StatisticsScreen"
                component={StatisticsScreen}
                options={{
                    title: 'Statistics',
                    tabBarIcon: ({ color, focused }) => (
                        <NavigationIcon color={color} icon="stats" isActive={focused} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="TimerScreen"
                component={TimerScreen}
                options={{
                    title: 'Timer',
                    tabBarIcon: ({ color, focused }) => (
                        <NavigationIcon color={color} icon="timer" isActive={focused} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="TimesListScreen"
                component={TimesListScreen}
                options={{
                    title: 'Times List',
                    tabBarIcon: ({ color, focused }) => <NavigationIcon color={color} icon="list" isActive={focused} />,
                }}
            />
            <BottomTabs.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <NavigationIcon color={color} icon="settings" isActive={focused} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
};
