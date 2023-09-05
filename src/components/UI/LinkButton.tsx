import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useColors } from '../../hooks/useColors';

interface LinkButtonProps {
    onPress: () => void;
    title?: string;
    style?: ViewStyle;
    color?: string;
    textStyle?: TextStyle;
}

export const LinkButton = ({ onPress, title, style, color, textStyle }: LinkButtonProps) => {
    const getColor = useColors();

    return (
        <Pressable
            style={({ pressed }) => [styles.buttonInnerContainer, pressed && styles.pressed, style]}
            onPress={onPress}
        >
            {title && <Text style={[{ color: color ? color : getColor('text') }, textStyle]}>{title}</Text>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonInnerContainer: {
        elevation: 2,
    },
    pressed: {
        opacity: 0.75,
    },
});
