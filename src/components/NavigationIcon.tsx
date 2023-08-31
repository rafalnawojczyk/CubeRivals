import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../store/theme-context';
import { getColor } from '../utils/getColor';

interface NavigationIconProps {
    icon: keyof typeof Ionicons.glyphMap;
    size: number;
    color: string;
    bgActiveColor: string;
    bgInactiveColor: string;
    isActive: boolean;
    isMiddleIcon?: boolean;
}

export const NavigationIcon = ({
    icon,
    size,
    color,
    bgActiveColor,
    bgInactiveColor,
    isMiddleIcon,
    isActive,
}: NavigationIconProps) => {
    const { isDarkTheme } = useContext(ThemeContext);

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
                    isMiddleIcon && isActive && { borderWidth: 1, borderColor: getColor(isDarkTheme, 'text') },
                ]}
            >
                <Ionicons
                    name={icon}
                    size={size}
                    color={isMiddleIcon ? getColor(isDarkTheme, 'text') : isActive ? bgActiveColor : color}
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
