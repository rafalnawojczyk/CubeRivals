import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../hooks/useColors';
import { FONTS } from '../styles/base';

const LOTTIE_JSON = require('../../assets/animations/empty-animation.json');

export const EmptyFallbackAnimation = ({ title, renderItem }: { title: string; renderItem?: React.ReactNode }) => {
    const getColor = useColors();

    return (
        <View style={[styles.container, { backgroundColor: getColor('background') }]}>
            <Text style={[styles.comingSoonText, { color: getColor('text') }]}>{title}</Text>
            {renderItem && renderItem}
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
