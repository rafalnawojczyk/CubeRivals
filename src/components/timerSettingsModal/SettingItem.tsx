import { View, StyleSheet } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { DIMENSIONS, PADDING } from '../../styles/base';

export const SettingItem = ({ children }: { children: React.ReactNode }) => {
    const getColor = useColors();

    return <View style={[styles.container, { borderBottomColor: getColor('gray100') }]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        width: DIMENSIONS.fullWidth * 0.8,
        paddingVertical: PADDING.md,
        borderBottomWidth: 1,
    },
});
