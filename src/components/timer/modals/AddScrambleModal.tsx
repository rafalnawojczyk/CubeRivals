import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';

interface AddScrambleModalProps {
    showModal: boolean;
    onClose: () => void;
    onAddScramble: (note: string) => void;
}

export const AddScrambleModal = ({ showModal, onClose, onAddScramble }: AddScrambleModalProps) => {
    const [scrambleInput, setScrambleInput] = useState('');
    const getColor = useColors();
    const trans = useTranslation();

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={trans('addOwnScramble')} size="lg">
            <TextInput
                value={scrambleInput}
                onChangeText={setScrambleInput}
                multiline={true}
                maxLength={250}
                style={[styles.textInput, { backgroundColor: getColor('gray800'), color: getColor('text') }]}
                placeholderTextColor={getColor('text')}
                placeholder={trans('addOwnScramblePlaceholder')}
                textAlignVertical="top"
            />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="primary" onPress={() => onAddScramble(scrambleInput)} title={trans('add')} />
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
