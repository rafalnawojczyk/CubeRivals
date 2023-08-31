import { StyleSheet, View } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { LinearGradient } from 'expo-linear-gradient';

export const TimerBorder = ({ children }: { children?: React.ReactNode }) => {
    const getColor = useColors();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[
                    getColor('secondary'),
                    'transparent',
                    'transparent',
                    'transparent',
                    'transparent',
                    'transparent',
                ]}
                start={[0, 0.5]}
                locations={[0.2, 0.21, 0.21, 0.21, 0.22, 0.8]}
                end={[1, 0.55]}
                style={styles.colorContainer}
            >
                <View style={[styles.backgroundContainer, { backgroundColor: getColor('background') }]}></View>
            </LinearGradient>

            <LinearGradient
                colors={[getColor('tertiary'), 'transparent', 'transparent']}
                locations={[0.44, 0.45, 0.8]}
                start={[0.85, 0]}
                end={[0, 0.24]}
                style={styles.colorContainer}
            >
                <View style={[styles.backgroundContainer, { backgroundColor: getColor('background') }]}></View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
    },
    colorContainer: {
        flex: 1,
    },
    backgroundContainer: {
        width: '96%',
        height: '96%',
        position: 'absolute',
        top: '2%',
        left: '2%',
    },
});
