import { View, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { FONTS } from '../../styles/base';

export type ButtonType = 'primary' | 'secondary' | 'error' | 'cancel';

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
            return getColor('primary600');
        }

        if (type === 'secondary') {
            return getColor('gray800');
        }

        if (type === 'error') {
            return getColor('error');
        }

        if (type === 'cancel') {
            return 'transparent';
        }
    };

    const getButtonTextColor = (type: ButtonType) => {
        if (type === 'cancel') {
            return getColor('gray700');
        }

        if (type === 'primary') {
            return getColor('backgroundLight');
        }

        return getColor('text');
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
                {title && <Text style={[styles.buttonText, { color: getButtonTextColor(type) }]}>{title}</Text>}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 48,
        width: '100%',
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: FONTS.m,
        fontFamily: 'robotoMono-medium',
    },
    pressed: {
        opacity: 0.75,
    },
});
