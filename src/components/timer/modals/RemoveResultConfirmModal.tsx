import { StyleSheet } from 'react-native';
import { CustomModal } from '../../UI/modal/CustomModal';
import { useTranslation } from '../../../hooks/useTranslation';

interface AddNoteModalProps {
    showModal: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const RemoveResultConfirmModal = ({ showModal, onClose, onConfirm }: AddNoteModalProps) => {
    const trans = useTranslation();

    return (
        <CustomModal onClose={onClose} isVisible={showModal} title={trans('removeSolveTitle')} size="md">
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
                <CustomModal.Button type="error" onPress={onConfirm} title={trans('delete')} />
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
