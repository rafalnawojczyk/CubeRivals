import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';

export const ScramblePillIcon = ({
    title,
    children,
    onPress,
    accent,
}: {
    title: string;
    onPress: () => void;
    children: React.ReactNode;
    accent?: boolean;
}) => {
    const getColor = useColors();
    return (
        <View style={styles.outerContainer}>
            <Pressable
                onPress={onPress}
                style={[
                    styles.innerContainer,
                    { backgroundColor: accent ? getColor('primary600') : getColor('background100') },
                ]}
                android_ripple={{ color: getColor('backgroundLight') }}
            >
                {children}
                <Text style={[styles.textStyle, { color: accent ? getColor('white') : getColor('accentLight') }]}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 999,
        overflow: 'hidden',
    },
    innerContainer: {
        borderRadius: 999,
        overflow: 'hidden',
        padding: PADDING.micro,
        flexDirection: 'row',
        gap: 1,
    },
    textStyle: {
        fontSize: FONTS.micro,
        fontWeight: '600',
    },
});
