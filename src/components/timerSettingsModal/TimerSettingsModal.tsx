import { useContext } from 'react';
import { CustomModal } from '../UI/modal/CustomModal';
import { TimerSettingsContext, TimerSettingsType } from '../../store/timer-settings-context';
import { useTranslation } from '../../hooks/useTranslation';
import { ScrollView, StyleSheet } from 'react-native';
import { SettingsSwitchItem } from './SettingsSwitchItem';
import { SettingItem } from './SettingItem';

interface TimerSettingsModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const TimerSettingsModal = ({ showModal, onClose }: TimerSettingsModalProps) => {
    const { timerSettings, updateSettings } = useContext(TimerSettingsContext);
    const trans = useTranslation();

    const switchSettingsMap: {
        name: keyof Omit<TimerSettingsType, 'stickerColors' | 'session' | 'cube'>;
        title: string;
        subtitle?: string;
    }[] = [
        {
            name: 'inspectionTime',
            title: trans('timerSettings.inspectionTime'),
            subtitle: trans('timerSettings.inspectionTimeDesc'),
        },
        {
            name: 'hideUi',
            title: trans('timerSettings.hideUi'),
            subtitle: trans('timerSettings.hideUiDesc'),
        },
        { name: 'hideTime', title: trans('timerSettings.hideTime'), subtitle: trans('timerSettings.hideTimeDesc') },
        {
            name: 'showWholeMs',
            title: trans('timerSettings.showWholeMs'),
            subtitle: trans('timerSettings.showWholeMsDesc'),
        },
    ];

    const onSaveSettingsHandler = () => {
        onClose();
    };

    return (
        <CustomModal showCloseX onClose={onClose} title={trans('timerSettingsTitle')} isVisible={showModal} size="xl">
            <ScrollView style={styles.settingsContainer}>
                {switchSettingsMap.map(setting => (
                    <SettingItem key={setting.name}>
                        <SettingsSwitchItem
                            value={timerSettings[setting.name]}
                            title={setting.title}
                            onSwitch={() => updateSettings({ [setting.name]: !timerSettings[setting.name] })}
                            subtitle={setting.subtitle}
                        />
                    </SettingItem>
                ))}
            </ScrollView>
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
                <CustomModal.Button type="primary" onPress={onSaveSettingsHandler} title={trans('save')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
    },
});
