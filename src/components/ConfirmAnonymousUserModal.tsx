import { Text, StyleSheet } from 'react-native';
import { CustomModal } from './UI/modal/CustomModal';
import { useTranslation } from '../hooks/useTranslation';
import { FONTS } from '../styles/base';
import { useColors } from '../hooks/useColors';

interface ListSelectModalProps {
    showModal: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmAnonymousUserModal = ({ showModal, onClose, onConfirm }: ListSelectModalProps) => {
    const getColor = useColors();
    const trans = useTranslation();

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={trans('auth.useWithoutAcc')} size="lg">
            <Text style={[styles.text, { color: getColor('text') }]}>{trans('auth.useWithoutAccDesc')}</Text>
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')}></CustomModal.Button>
                <CustomModal.Button
                    type="error"
                    onPress={() => {
                        onConfirm();
                        onClose();
                    }}
                    title={trans('confirm')}
                />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: FONTS.md,
    },
});
