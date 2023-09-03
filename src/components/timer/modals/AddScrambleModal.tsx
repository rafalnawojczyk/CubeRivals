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
    const translate = useTranslation();

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={translate('addOwnScramble')} size="lg">
            <TextInput
                value={scrambleInput}
                onChangeText={setScrambleInput}
                multiline={true}
                maxLength={250}
                style={[styles.textInput, { backgroundColor: getColor('gray100') }]}
                textAlignVertical="top"
                textAlign="center"
            />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose} title={translate('cancel')} />
                <CustomModal.Button
                    type="primary"
                    onPress={() => onAddScramble(scrambleInput)}
                    title={translate('add')}
                />
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
