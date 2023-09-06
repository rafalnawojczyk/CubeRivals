import { Pressable, View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const IconButton = ({
    icon,
    size,
    color,
    onPress,
    style,
}: {
    icon: keyof typeof MaterialIcons.glyphMap;
    size: number;
    color: string;
    onPress: () => void;
    style?: ViewStyle;
}) => {
    return (
        <Pressable onPress={onPress} style={style}>
            <View>
                <MaterialIcons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
};
