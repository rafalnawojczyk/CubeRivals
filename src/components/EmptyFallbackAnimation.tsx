import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../hooks/useColors';
import { useTranslation } from '../hooks/useTranslation';
import { FONTS } from '../styles/base';

const LOTTIE_JSON = require('../../assets/empty-animation.json');

export const EmptyFallbackAnimation = () => {
    const getColor = useColors();
    const trans = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: getColor('background') }]}>
            <Text style={[styles.comingSoonText, { color: getColor('text') }]}>{trans('itsEmptyHere')}</Text>
            <LottieView
                style={{
                    width: '100%',
                }}
                speed={0.7}
                autoPlay
                source={LOTTIE_JSON}
                loop={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    comingSoonText: {
        fontSize: FONTS.md,
        textAlign: 'center',
    },
});
