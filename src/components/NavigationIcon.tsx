import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useColors } from '../hooks/useColors';

interface NavigationIconProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    size: number;
    color: string;

    isActive: boolean;
    isMiddleIcon?: boolean;
}

export const NavigationIcon = ({ icon, size, color, isMiddleIcon, isActive }: NavigationIconProps) => {
    const getColor = useColors();

    const bgActiveColor = getColor('primary500');
    const bgInactiveColor = getColor('gray800');

    return (
        <View
            style={[
                styles.container,
                { borderTopColor: isMiddleIcon ? 'transparent' : isActive ? bgActiveColor : bgInactiveColor },
                isMiddleIcon && { transform: [{ scale: 1.2 }] },
            ]}
        >
            <View
                style={[
                    styles.innerContainer,
                    { backgroundColor: isMiddleIcon ? bgActiveColor : 'transparent' },
                    isMiddleIcon && isActive && { borderWidth: 1, borderColor: getColor('text') },
                ]}
            >
                <MaterialIcons
                    name={icon}
                    size={size}
                    color={isMiddleIcon ? getColor('text') : isActive ? bgActiveColor : color}
                />
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
        borderTopWidth: 2,
    },
    innerContainer: {
        height: '70%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
    },
});
