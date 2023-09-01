import { View, Modal, StyleSheet } from 'react-native';
import { PADDING } from '../../styles/base';

interface CustomModalProps {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export const CustomModal = ({ isVisible, onClose, children }: CustomModalProps) => {
    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>{children}</View>
            </View>
        </Modal>
    );
};

// TODO: READ ABOUT HOW TO ADD SOMETHING BEHIND MODAL< MAYBE BACKGROUND?
// TODO: modal should have predefined sizes like sm/md/lg
// all modals should have two buttons probably, so this modal should take some props and render buttons on its own.

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PADDING.micro,
    },
    modalView: {
        margin: PADDING.micro,
        backgroundColor: 'white',
        borderRadius: PADDING.micro,
        padding: PADDING.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
