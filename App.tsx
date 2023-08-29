import { useCallback, useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import { MainScreen } from './src/screens/MainScreen';
import { COLORS } from './src/styles/base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

SplashScreen.preventAutoHideAsync().catch(() => {});

const fonts = {
    poppins: require('./src/assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
};

const LOTTIE_JSON = require('./src/assets/cube-animation.json');

export default function App() {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [fontsReady, setFontsReady] = useState(false);
    const [isAppReady, setAppReady] = useState(false);
    const animationProgress = useRef(new Animated.Value(0));

    const BottomTabs = createBottomTabNavigator();

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync(fonts);

            setFontsReady(true);
        };

        loadFonts();

        Animated.loop(
            Animated.timing(animationProgress.current, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        try {
            await SplashScreen.hideAsync();
        } catch (e) {
            // handle errors
        } finally {
            setIsLayoutReady(true);
        }
    }, []);

    const onApplicationReady = useCallback(() => {
        setAppReady(true);
    }, []);

    const showAnimation = !(isAppReady && isLayoutReady && fontsReady);

    return (
        <>
            {fontsReady && (
                <NavigationContainer onReady={onApplicationReady}>
                    <BottomTabs.Navigator>
                        <BottomTabs.Screen name="MainScreen" component={MainScreen} />
                    </BottomTabs.Navigator>
                </NavigationContainer>
            )}
            {showAnimation && (
                <View
                    pointerEvents="none"
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                    }}
                    onLayout={onLayoutRootView}
                >
                    <LottieView
                        style={{
                            width: '50%',
                            height: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        source={LOTTIE_JSON}
                        progress={animationProgress.current}
                    />
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
