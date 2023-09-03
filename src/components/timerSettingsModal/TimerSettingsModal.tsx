import { useContext } from 'react';
import { CustomModal } from '../UI/modal/CustomModal';
import { TimerSettingsContext, TimerSettingsType } from '../../store/timer-settings-context';
import { useTranslation } from '../../hooks/useTranslation';
import { ScrollView, StyleSheet } from 'react-native';
import { SettingsSwitchItem } from './SettingsSwitchItem';

interface TimerSettingsModalProps {
    showModal: boolean;
    onClose: () => void;
}

const switchSettingsMap: {
    name: keyof Omit<TimerSettingsType, 'stickerColors' | 'session' | 'cube'>;
    title: string;
}[] = [
    { name: 'inspectionTime', title: 'Use WCA inspection' },
    { name: 'hideUi', title: 'Hide all elements when solving' },
    { name: 'hideTime', title: 'Hide time when solving' },
    { name: 'showWholeMs', title: 'Show all milliseconds' },
];

export const TimerSettingsModal = ({ showModal, onClose }: TimerSettingsModalProps) => {
    const { timerSettings, updateSettings } = useContext(TimerSettingsContext);
    const translate = useTranslation();

    const onSaveSettingsHandler = () => {
        onClose();
    };

    return (
        <CustomModal
            showCloseX
            onClose={onClose}
            title={translate('timerSettingsTitle')}
            isVisible={showModal}
            size="xl"
        >
            <ScrollView style={styles.settingsContainer}>
                {switchSettingsMap.map(setting => (
                    <SettingsSwitchItem
                        key={setting.name}
                        value={timerSettings[setting.name]}
                        title={setting.title}
                        onSwitch={() => updateSettings({ [setting.name]: !timerSettings[setting.name] })}
                    />
                ))}
            </ScrollView>
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose} title={translate('cancel')} />
                <CustomModal.Button type="primary" onPress={onSaveSettingsHandler} title={translate('save')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
    },
});
