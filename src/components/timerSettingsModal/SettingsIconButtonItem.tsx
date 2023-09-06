import { StyleSheet, Text, View } from 'react-native';
import { DIMENSIONS, FONTS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '../UI/IconButton';

interface SettingsIconButtonItemProps {
    title: string;
    onPress: () => void;
    subtitle?: string;
    name: keyof typeof Ionicons.glyphMap;
}

export const SettingsIconButtonItem = ({ title, onPress, subtitle, name }: SettingsIconButtonItemProps) => {
    const getColor = useColors();

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: getColor('text') }]}>{title}</Text>
                {subtitle && <Text style={[styles.subtitle, { color: getColor('gray400') }]}>{subtitle}</Text>}
            </View>
            <View style={styles.button}>
                <IconButton icon={name} size={FONTS.xl} color={getColor('primary200')} onPress={onPress} />
            </View>
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
    button: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: DIMENSIONS.fullHeight * 0.07,
    },
});
