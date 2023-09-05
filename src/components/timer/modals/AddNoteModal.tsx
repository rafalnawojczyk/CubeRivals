import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';

interface AddNoteModalProps {
    showModal: boolean;
    onClose: () => void;
    onAddNote: (note: string) => void;
}

export const AddNoteModal = ({ showModal, onClose, onAddNote }: AddNoteModalProps) => {
    const [commentInput, setCommentInput] = useState('');
    const getColor = useColors();
    const trans = useTranslation();

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={trans('addSolveComment')} size="lg">
            <TextInput
                value={commentInput}
                onChangeText={setCommentInput}
                multiline={true}
                style={[styles.textInput, { backgroundColor: getColor('gray100') }]}
                textAlignVertical="top"
                placeholder={trans('addNotePlaceholder')}
            />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')}></CustomModal.Button>
                <CustomModal.Button type="primary" onPress={() => onAddNote(commentInput)} title={trans('add')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 2,
        minHeight: DIMENSIONS.fullHeight * 0.2,
        padding: PADDING.sm,
        fontSize: FONTS.md,
    },
});
