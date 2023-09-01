import { useCallback, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { ThemeContextProvider } from './src/store/theme-context';
import { UserContextProvider } from './src/store/user-context';
import { Navigation } from './src/screens/Navigation';
import { CubeAnimation } from './src/components/CubeAnimation';
import { TimerSettingsContextProvider } from './src/store/timer-settings-context';

SplashScreen.preventAutoHideAsync().catch(() => {});

const fonts = {
    // poppins: require('./src/assets/fonts/Poppins-Regular.ttf'),
    // 'poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    // 'poppins-light': require('./src/assets/fonts/Poppins-ExtraLight.ttf'),
    robotoMono: require('./src/assets/fonts/RobotoMono-Regular.ttf'),
    'robotoMono-bold': require('./src/assets/fonts/RobotoMono-Bold.ttf'),
    'robotoMono-light': require('./src/assets/fonts/RobotoMono-ExtraLight.ttf'),
};

export default function App() {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [fontsReady, setFontsReady] = useState(false);
    const [isAppReady, setAppReady] = useState(false);
    const animationProgress = useRef(new Animated.Value(0));

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
        <ThemeContextProvider>
            <UserContextProvider>
                <TimerSettingsContextProvider>
                    {fontsReady && <Navigation onReady={onApplicationReady} />}
                    {showAnimation && (
                        <View pointerEvents="none" style={styles.animationContainer} onLayout={onLayoutRootView}>
                            <CubeAnimation progress={animationProgress.current} />
                        </View>
                    )}
                </TimerSettingsContextProvider>
            </UserContextProvider>
        </ThemeContextProvider>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
});
