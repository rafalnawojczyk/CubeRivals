import { StyleSheet, Text, View } from 'react-native';
import { DIMENSIONS, FONTS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';

interface CustomSettingItemProps {
    title: string;
    rightItem: React.ReactNode;
    subtitle?: string;
}

export const CustomSettingItem = ({ title, subtitle, rightItem }: CustomSettingItemProps) => {
    const getColor = useColors();

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: getColor('text') }]}>{title}</Text>
                {subtitle && <Text style={[styles.subtitle, { color: getColor('gray400') }]}>{subtitle}</Text>}
            </View>
            <View style={styles.right}>{rightItem}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 6,
    },
    title: {
        fontSize: FONTS.m,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: FONTS.sm,
    },
    right: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: DIMENSIONS.fullHeight * 0.07,
    },
});
