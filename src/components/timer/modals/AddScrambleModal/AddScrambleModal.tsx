import { useState } from 'react';
import { CustomModal } from '../../../UI/modal/CustomModal';
import { useTranslation } from '../../../../hooks/useTranslation';
import { ScrambleKeyboard } from './ScrambleKeyboard';

interface AddScrambleModalProps {
    showModal: boolean;
    onClose: () => void;
    onAddScramble: (note: string) => void;
}

export const AddScrambleModal = ({ showModal, onClose, onAddScramble }: AddScrambleModalProps) => {
    const [scrambleInput, setScrambleInput] = useState<string[]>(['']);

    const trans = useTranslation();

    const onCloseModal = () => {
        onClose();
        setScrambleInput(['']);
    };

    return (
        <CustomModal isVisible={showModal} onClose={onCloseModal} title={trans('addOwnScramble')} size="lg">
            <ScrambleKeyboard setScramble={setScrambleInput} scramble={scrambleInput} />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button
                    type="primary"
                    onPress={() => {
                        onAddScramble(scrambleInput.join(' '));
                        onCloseModal();
                    }}
                    title={trans('add')}
                />
                <CustomModal.Button type="cancel" onPress={onCloseModal} title={trans('cancel')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};
