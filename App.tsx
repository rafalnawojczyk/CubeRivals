import { useCallback, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { CubeAnimation } from './src/components/CubeAnimation';
import { ThemeContextProvider } from './src/store/theme-context';
import { Navigation } from './src/screens/Navigation';

SplashScreen.preventAutoHideAsync().catch(() => {});

const fonts = {
    poppins: require('./src/assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
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
            {fontsReady && <Navigation onReady={onApplicationReady} />}
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
                    <CubeAnimation progress={animationProgress.current} />
                </View>
            )}
        </ThemeContextProvider>
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
