import { View, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '../../hooks/useColors';

export type ButtonType = 'primary' | 'secondary' | 'error' | 'cancel' | 'transparent';

interface CustomButtonProps {
    onPress: () => void;
    children?: React.ReactNode;
    type: ButtonType;
    title?: string;
    style?: ViewStyle;
}

export const CustomButton = ({ onPress, children, type, title, style }: CustomButtonProps) => {
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

        if (type === 'transparent') {
            return 'transparent';
        }
    };

    return (
        <View style={[styles.buttonOuterContainer, style]}>
            <Pressable
                style={({ pressed }) => [
                    styles.buttonInnerContainer,
                    pressed && styles.pressed,
                    { backgroundColor: getButtonColor(type) },
                ]}
                onPress={onPress}
                android_ripple={{ color: getButtonColor(type) }}
            >
                {children}
                {title && <Text style={[styles.buttonText, { color: getColor('text') }]}>{title}</Text>}
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
        paddingVertical: 12,
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
