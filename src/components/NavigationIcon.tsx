import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

interface NavigationIconProps {
    icon: keyof typeof Ionicons.glyphMap;
    size: number;
    color: string;
    bgActiveColor: string;
    isActive: boolean;
}

export const NavigationIcon = ({ icon, size, color, bgActiveColor, isActive }: NavigationIconProps) => {
    return (
        <View style={styles.container}>
            <View style={[styles.innerContainer, isActive && { backgroundColor: bgActiveColor }]}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        height: '70%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
    },
});
