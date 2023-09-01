import { StyleSheet, View } from 'react-native';
import { PADDING } from '../../../styles/base';

export const CustomModalButtonContainer = ({ children }: { children: React.ReactNode }) => {
    return <View style={styles.buttonsContainer}>{children}</View>;
};

const styles = StyleSheet.create({
    buttonsContainer: {
        width: '100%',
        marginTop: PADDING.sm,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
