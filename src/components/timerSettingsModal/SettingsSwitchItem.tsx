import { StyleSheet, Text, View } from 'react-native';
import { CustomSwitch } from '../UI/CustomSwitch';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';

interface SettingsSwitchItemProps {
    title: string;
    onSwitch: () => void;
    value: boolean;
    subtitle?: string;
}

export const SettingsSwitchItem = ({ title, onSwitch, value, subtitle }: SettingsSwitchItemProps) => {
    const getColor = useColors();

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: getColor('text') }]}>{title}</Text>
                {subtitle && <Text style={[styles.subtitle, { color: getColor('gray400') }]}>{subtitle}</Text>}
            </View>
            <View style={styles.switch}>
                <CustomSwitch value={value} onChange={onSwitch} />
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
    switch: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: DIMENSIONS.fullHeight * 0.07,
    },
});
