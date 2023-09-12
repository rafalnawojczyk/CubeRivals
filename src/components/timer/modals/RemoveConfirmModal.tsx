import { CustomModal } from '../../UI/modal/CustomModal';
import { useTranslation } from '../../../hooks/useTranslation';

interface RemoveConfirmProps {
    showModal: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    size?: 'md' | 'lg';
    confirmTitle: string;
}

export const RemoveConfirmModal = ({
    showModal,
    onClose,
    onConfirm,
    title,
    size = 'md',
    confirmTitle,
}: RemoveConfirmProps) => {
    const trans = useTranslation();

    return (
        <CustomModal onClose={onClose} isVisible={showModal} title={title} size={size}>
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
                <CustomModal.Button type="error" onPress={onConfirm} title={confirmTitle} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};
