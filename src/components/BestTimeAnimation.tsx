import LottieView from 'lottie-react-native';
import React from 'react';

const LOTTIE_JSON = require('../../assets/animations/confetti-animation.json');

const BestTimeAnimation = () => {
    return (
        <>
            <LottieView
                style={{
                    width: '100%',
                }}
                speed={0.8}
                autoPlay
                loop={false}
                source={LOTTIE_JSON}
            />
        </>
    );
};

export default React.memo(BestTimeAnimation);
