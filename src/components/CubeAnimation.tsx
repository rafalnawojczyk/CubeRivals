import LottieView from 'lottie-react-native';
import { Animated } from 'react-native';

const LOTTIE_JSON = require('../assets/cube-animation.json');
export const CubeAnimation = ({ progress }: { progress: Animated.Value }) => {
    return (
        <LottieView
            style={{
                width: '50%',
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            source={LOTTIE_JSON}
            progress={progress}
        />
    );
};
