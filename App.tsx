import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { useCallback, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Easing, useColorScheme } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Navigation } from './src/navigation/Navigation';
import { CubeAnimation } from './src/components/CubeAnimation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeStore } from './src/store/themeStore';

SplashScreen.preventAutoHideAsync().catch(() => {});

const fonts = {
    // poppins: require('./src/assets/fonts/Poppins-Regular.ttf'),
    // 'poppins-bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    // 'poppins-light': require('./src/assets/fonts/Poppins-ExtraLight.ttf'),
    robotoMono: require('./assets/fonts/RobotoMono-Regular.ttf'),
    'robotoMono-medium': require('./assets/fonts/RobotoMono-Medium.ttf'),
    'robotoMono-bold': require('./assets/fonts/RobotoMono-Bold.ttf'),
    'robotoMono-light': require('./assets/fonts/RobotoMono-ExtraLight.ttf'),
};

export default function App() {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [fontsReady, setFontsReady] = useState(false);
    const [isAppReady, setAppReady] = useState(false);
    const animationProgress = useRef(new Animated.Value(0));
    const deviceTheme = useColorScheme();

    const getThemeFromStorage = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');

            if (savedTheme) {
                useThemeStore.setState({ isDarkTheme: savedTheme === 'dark' });
            } else {
                useThemeStore.setState({ isDarkTheme: deviceTheme === 'dark' });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync(fonts);

            setFontsReady(true);
        };

        loadFonts();
        getThemeFromStorage();
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
            {fontsReady && <Navigation onReady={onApplicationReady} />}
            {showAnimation && (
                <View pointerEvents="none" style={styles.animationContainer} onLayout={onLayoutRootView}>
                    <CubeAnimation progress={animationProgress.current} />
                </View>
            )}
        </>
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
