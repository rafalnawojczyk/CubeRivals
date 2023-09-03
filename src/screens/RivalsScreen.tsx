import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import LottieView from 'lottie-react-native';
import { useColors } from '../hooks/useColors';
import { FONTS } from '../styles/base';

const LOTTIE_JSON = require('../assets/rocket-animation.json');

export const RivalsScreen = () => {
    const getColor = useColors();

    return (
        <SafeAreaCard>
            <View style={[styles.container, { backgroundColor: getColor('background') }]}>
                <Text style={[styles.comingSoonText, { color: getColor('text') }]}>COMING SOON</Text>
                <LottieView
                    style={{
                        width: '100%',
                    }}
                    speed={0.3}
                    autoPlay
                    source={LOTTIE_JSON}
                    loop={true}
                />
            </View>
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    comingSoonText: {
        fontSize: FONTS.xl,
        textAlign: 'center',
    },
});
