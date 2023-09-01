import LottieView from 'lottie-react-native';
import { Animated, StyleSheet, View } from 'react-native';
import { useColors } from '../hooks/useColors';

const LOTTIE_JSON = require('../assets/cube-animation.json');

export const CubeAnimation = ({ progress }: { progress: Animated.Value }) => {
    const getColor = useColors();

    return (
        <View style={[styles.container, { backgroundColor: getColor('background') }]}>
            <LottieView style={styles.cubeLottie} source={LOTTIE_JSON} progress={progress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cubeLottie: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
