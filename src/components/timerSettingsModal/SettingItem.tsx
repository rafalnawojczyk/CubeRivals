import { View, StyleSheet } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { DIMENSIONS, PADDING } from '../../styles/base';

export const SettingItem = ({ children, showBorder = true }: { children: React.ReactNode; showBorder?: boolean }) => {
    const getColor = useColors();

    return (
        <View style={[styles.container, { borderBottomColor: showBorder ? getColor('gray100') : 'transparent' }]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: DIMENSIONS.fullWidth * 0.8,
        paddingVertical: PADDING.md,
        borderBottomWidth: 1,
    },
});
