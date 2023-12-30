import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DIMENSIONS, FONTS, PADDING } from '../../../../styles/base';
import { useColors } from '../../../../hooks/useColors';
import { ScrambleKeyType } from './ScrambleKeyboard';

export const ScrambleKey = ({
    keyName,
    onPress,
}: {
    keyName: ScrambleKeyType;
    onPress: (name: ScrambleKeyType) => void;
}) => {
    const getColor = useColors();

    return (
        <View style={[styles.outerContainer, { backgroundColor: getColor('gray800') }]}>
            <Pressable style={styles.innerContainer} onPress={() => onPress(keyName)}>
                <Text style={[styles.text, { color: getColor('text') }]}>{keyName}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: DIMENSIONS.fullWidth * 0.2,
        height: DIMENSIONS.fullWidth * 0.2,
        borderRadius: PADDING.md,
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    text: {
        fontSize: FONTS.lg,
        fontWeight: '600',
    },
});
