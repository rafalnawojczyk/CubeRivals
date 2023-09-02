import { Pressable, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconButton = ({
    icon,
    size,
    color,
    onPress,
    style,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    size: number;
    color: string;
    onPress: () => void;
    style?: ViewStyle;
}) => {
    return (
        <Pressable onPress={onPress} style={style}>
            <View>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
};
