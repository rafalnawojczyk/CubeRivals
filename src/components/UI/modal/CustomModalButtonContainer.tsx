import { StyleSheet, View } from 'react-native';
import { PADDING } from '../../../styles/base';

export const CustomModalButtonContainer = ({ children }: { children: React.ReactNode }) => {
    return <View style={styles.buttonsContainer}>{children}</View>;
};

const styles = StyleSheet.create({
    buttonsContainer: {
        width: '100%',
        marginTop: PADDING.md,
        gap: PADDING.sm,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
