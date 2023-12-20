import { Alert, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';

interface ChangeSessionNameModalProps {
    showModal: boolean;
    onClose: () => void;
    onChangeName: (note: string) => void;
    currentName: string;
}

export const ChangeSessionNameModal = ({
    showModal,
    onClose,
    onChangeName,
    currentName,
}: ChangeSessionNameModalProps) => {
    const [sessionNameInput, setSessionNameInput] = useState(currentName);
    const getColor = useColors();
    const trans = useTranslation();

    const onChangeNameHandler = () => {
        if (sessionNameInput.trim().length > 0) {
            onChangeName(sessionNameInput);
            onClose();
        } else {
            Alert.alert(trans('invalidName'), trans('writeValidName'));
        }
    };

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={trans('changeSessionName')} size="lg">
            <TextInput
                value={sessionNameInput}
                onChangeText={setSessionNameInput}
                placeholder={trans('addSessionNamePlaceholder')}
                multiline={false}
                maxLength={40}
                style={[styles.textInput, { backgroundColor: getColor('gray800'), color: getColor('text') }]}
                placeholderTextColor={getColor('text')}
                textAlignVertical="center"
                textAlign="left"
            />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="primary" onPress={onChangeNameHandler} title={trans('save')} />
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 8,
        padding: PADDING.m,
        fontSize: FONTS.m,
        textAlign: 'left',
    },
});
