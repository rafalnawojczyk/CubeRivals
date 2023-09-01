import { StyleSheet, Text, View } from 'react-native';
import { CustomModal } from '../UI/CustomModal';
import { useTranslation } from '../../hooks/useTranslation';
import { CustomButton } from '../UI/CustomButton';
import { FONTS, PADDING } from '../../styles/base';

interface AddNoteModalProps {
    showModal: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const RemoveResultConfirmModal = ({ showModal, onClose, onConfirm }: AddNoteModalProps) => {
    const translate = useTranslation();

    return (
        <CustomModal onClose={onClose} isVisible={showModal}>
            <Text style={styles.modalTitle}>{translate('removeSolveTitle')}</Text>

            <View style={styles.buttonsContainer}>
                <CustomButton type="cancel" onPress={onClose}>
                    {translate('cancel')}
                </CustomButton>
                <CustomButton type="error" onPress={onConfirm}>
                    {translate('delete')}
                </CustomButton>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: FONTS.lg,
        fontWeight: 'bold',
        marginBottom: PADDING.md,
    },
});
