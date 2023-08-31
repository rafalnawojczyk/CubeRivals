import { Pressable, View, Text, StyleSheet } from 'react-native';
import { DIMENSIONS, FONTS } from '../../styles/base';
import { TimerBorder } from './TimerBorder';
import { useColors } from '../../hooks/useColors';

export const Timer = () => {
    const getColor = useColors();

    return (
        <Pressable style={styles.touchableContainer}>
            <View style={styles.container}>
                <TimerBorder />
                <View style={styles.innerContainer}>
                    <Text style={[styles.timerText, { color: getColor('gray100') }]}>0.00</Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    touchableContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: 0.3 * DIMENSIONS.fullHeight,
        width: 0.95 * DIMENSIONS.fullWidth,
        position: 'relative',
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: FONTS['2xl'],
        fontFamily: 'poppins-light',
    },
});
