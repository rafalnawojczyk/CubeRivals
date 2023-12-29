import { StyleSheet, View, TextInput } from 'react-native';
import { CustomModal } from './UI/modal/CustomModal';
import { FONTS, PADDING } from '../styles/base';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useColors } from '../hooks/useColors';

interface NumberPickerModalProps {
    showModal: boolean;
    onClose: () => void;
    onSelect: (item: number) => void;
    currentNumber: number;
    modalTitle: string;
}

export const NumberPickerModal = ({
    showModal,
    onClose,
    onSelect,
    currentNumber,
    modalTitle,
}: NumberPickerModalProps) => {
    const [numberInput, setNumberInput] = useState(currentNumber.toString());
    const trans = useTranslation();
    const getColor = useColors();

    const onInputChange = (input: string) => {
        const newInput = input.replace(/[^0-9]/g, '');

        setNumberInput(newInput);
    };

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={modalTitle} size="lg">
            <View>
                <TextInput
                    style={[styles.textInput, { color: getColor('text'), borderColor: getColor('text') }]}
                    value={numberInput}
                    onChangeText={onInputChange}
                    keyboardType="numeric"
                    autoFocus
                />
            </View>

            <CustomModal.ButtonsContainer>
                <CustomModal.Button
                    type="primary"
                    onPress={() => {
                        onSelect(+numberInput);
                        onClose();
                    }}
                    title={trans('save')}
                />
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')}></CustomModal.Button>
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        fontWeight: 'bold',
        maxWidth: 200,
        minWidth: 100,
        paddingVertical: PADDING.sm,
        fontSize: FONTS.md,
        borderWidth: 1,
    },
});
