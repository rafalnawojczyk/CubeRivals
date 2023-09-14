import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import LottieView from 'lottie-react-native';
import { useColors } from '../hooks/useColors';
import { FONTS } from '../styles/base';

const LOTTIE_JSON = require('../../assets/animations/rocket-animation.json');

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

// 1. For each event - there should be two options:
//  a) unranked
// 	b) ranked

// Unranked - will be for each event. Calc how much time players needs(minimum) for one solve. On unranked, on the end of whole AVG(12/5) should be a prompt where active ppl could vote for next avg - avg5 or avg12. All last votes should be saved. If there is around 20% ppl voting for 5/12 and 80% to other(or voted for 'whatever'), after 2 rounds with 80% - it should run one round for the small group, and reset saved state.
