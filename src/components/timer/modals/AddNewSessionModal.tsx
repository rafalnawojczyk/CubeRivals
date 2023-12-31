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
    const trans = useTranslation();

    const onAddSessionHandler = () => {
        if (sessionNameInput.trim().length > 0) {
            onAddSession(sessionNameInput);
            setSessionNameInput('');
        } else {
            Alert.alert(trans('invalidName'), trans('writeValidName'));
        }
    };

    return (
        <CustomModal
            isVisible={showModal}
            onClose={onClose}
            title={trans('addSessionName')}
            subtitle={trans('addSessionSubtitle')}
            size="lg"
        >
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
                <CustomModal.Button type="primary" onPress={onAddSessionHandler} title={trans('add')} />
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
    },
});
