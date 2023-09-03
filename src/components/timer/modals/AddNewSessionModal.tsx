import { Alert, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';

interface AddSessionModalProps {
    showModal: boolean;
    onClose: () => void;
    onAddSession: (note: string) => void;
}

export const AddSessionModal = ({ showModal, onClose, onAddSession }: AddSessionModalProps) => {
    const [sessionNameInput, setSessionNameInput] = useState('');
    const getColor = useColors();
    const translate = useTranslation();

    const onAddSessionHandler = () => {
        if (sessionNameInput.trim().length > 0) {
            onAddSession(sessionNameInput);
        } else {
            Alert.alert(translate('invalidName'), translate('writeValidName'));
        }
    };

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={translate('addSessionName')} size="lg">
            <TextInput
                value={sessionNameInput}
                onChangeText={setSessionNameInput}
                placeholder={translate('addSessionNamePlaceholder')}
                multiline={false}
                maxLength={40}
                style={[styles.textInput, { backgroundColor: getColor('gray100') }]}
                textAlignVertical="top"
                textAlign="center"
            />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose} title={translate('cancel')} />
                <CustomModal.Button type="primary" onPress={onAddSessionHandler} title={translate('add')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 2,
        padding: PADDING.sm,
        fontSize: FONTS.md,
    },
});
