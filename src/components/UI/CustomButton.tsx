import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useColors } from '../../hooks/useColors';

type ButtonType = 'primary' | 'secondary' | 'error' | 'cancel';

interface CustomButtonProps {
    onPress: () => void;
    children?: React.ReactNode;
    type: ButtonType;
}

export const CustomButton = ({ onPress, children, type }: CustomButtonProps) => {
    const getColor = useColors();

    const getButtonColor = (type: ButtonType) => {
        if (type === 'primary') {
            return getColor('primary500');
        }

        if (type === 'secondary') {
            return getColor('secondary');
        }

        if (type === 'error') {
            return getColor('tertiary');
        }

        if (type === 'cancel') {
            return getColor('gray100');
        }
    };

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.buttonInnerContainer,
                    pressed && styles.pressed,
                    { backgroundColor: getButtonColor(type) },
                ]}
                onPress={onPress}
                android_ripple={{ color: getButtonColor(type) }}
            >
                <Text style={[styles.buttonText, { color: getColor('text') }]}>{children}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 2,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
});
