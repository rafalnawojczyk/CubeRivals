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
    currentNote: string;
}

export const AddNoteModal = ({ showModal, onClose, onAddNote, currentNote }: AddNoteModalProps) => {
    const [commentInput, setCommentInput] = useState(currentNote);
    const getColor = useColors();
    const trans = useTranslation();

    return (
        <CustomModal
            isVisible={showModal}
            onClose={onClose}
            title={currentNote ? trans('editSolveComment') : trans('addSolveComment')}
            subtitle={currentNote ? trans('editSolveCommentSubtitle') : trans('addSolveCommentSubtitle')}
            size="lg"
        >
            <TextInput
                value={commentInput}
                onChangeText={setCommentInput}
                multiline={true}
                style={[styles.textInput, { backgroundColor: getColor('gray800'), color: getColor('text') }]}
                textAlignVertical="top"
                placeholderTextColor={getColor('text')}
                placeholder={trans('addNotePlaceholder')}
            />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button
                    type="primary"
                    onPress={() => onAddNote(commentInput)}
                    title={currentNote ? trans('save') : trans('add')}
                />
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 8,
        minHeight: DIMENSIONS.fullHeight * 0.2,
        padding: PADDING.m,
        fontSize: FONTS.m,
    },
});
