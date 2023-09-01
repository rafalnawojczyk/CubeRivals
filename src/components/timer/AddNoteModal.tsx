import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { CustomModal } from '../UI/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useTranslation } from '../../hooks/useTranslation';
import { CustomButton } from '../UI/CustomButton';

interface AddNoteModalProps {
    showModal: boolean;
    onClose: () => void;
    onAddNote: (note: string) => void;
}

export const AddNoteModal = ({ showModal, onClose, onAddNote }: AddNoteModalProps) => {
    const [commentInput, setCommentInput] = useState('');
    const getColor = useColors();
    const translate = useTranslation();

    return (
        <CustomModal isVisible={showModal} onClose={onClose}>
            <View style={styles.container}>
                <Text style={styles.title}>{translate('addSolveComment')}</Text>
                <TextInput
                    value={commentInput}
                    onChangeText={setCommentInput}
                    multiline={true}
                    style={[styles.textInput, { backgroundColor: getColor('gray100') }]}
                    textAlignVertical="top"
                />
                <View style={styles.buttonsContainer}>
                    <CustomButton type="cancel" onPress={onClose}>
                        {translate('cancel')}
                    </CustomButton>
                    <CustomButton type="primary" onPress={() => onAddNote(commentInput)}>
                        {translate('addCommentConfirm')}
                    </CustomButton>
                </View>
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: DIMENSIONS.fullHeight * 0.35,
        width: DIMENSIONS.fullWidth * 0.6,
        justifyContent: 'space-between',
    },
    textInput: {
        borderRadius: 2,
        minHeight: DIMENSIONS.fullHeight * 0.2,
        padding: PADDING.sm,
        fontSize: FONTS.md,
    },
    title: {
        fontSize: FONTS.lg,
        fontWeight: 'bold',
        marginBottom: PADDING.sm,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
