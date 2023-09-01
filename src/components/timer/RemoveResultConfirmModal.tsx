import { StyleSheet } from 'react-native';
import { CustomModal } from '../UI/modal/CustomModal';
import { useTranslation } from '../../hooks/useTranslation';

interface AddNoteModalProps {
    showModal: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const RemoveResultConfirmModal = ({ showModal, onClose, onConfirm }: AddNoteModalProps) => {
    const translate = useTranslation();

    return (
        <CustomModal onClose={onClose} isVisible={showModal} title={translate('removeSolveTitle')} size="md">
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose}>
                    {translate('cancel')}
                </CustomModal.Button>
                <CustomModal.Button type="error" onPress={onConfirm}>
                    {translate('delete')}
                </CustomModal.Button>
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
