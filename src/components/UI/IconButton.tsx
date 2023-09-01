import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconButton = ({
    icon,
    size,
    color,
    onPress,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    size: number;
    color: string;
    onPress: () => void;
}) => {
    return (
        <Pressable onPress={onPress}>
            <View>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({});
