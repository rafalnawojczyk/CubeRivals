import { useContext, useState } from 'react';
import { CustomModal } from '../UI/modal/CustomModal';
import { TimerSettingsContext, TimerSettingsType } from '../../store/timer-settings-context';
import { useTranslation } from '../../hooks/useTranslation';
import { ScrollView, StyleSheet } from 'react-native';
import { SettingsSwitchItem } from './SettingsSwitchItem';
import { SettingItem } from './SettingItem';
import { LinkButton } from '../UI/LinkButton';
import { useColors } from '../../hooks/useColors';
import { InspectionSettingsModal } from './InspectionSettingsModal';

interface TimerSettingsModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const TimerSettingsModal = ({ showModal, onClose }: TimerSettingsModalProps) => {
    const { timerSettings, updateSettings } = useContext(TimerSettingsContext);
    const [showInspectionModal, setShowInspectionModal] = useState(false);
    const trans = useTranslation();
    const getColor = useColors();

    const switchSettingsMap: {
        name: keyof Pick<TimerSettingsType, 'showEasyAdd' | 'inspection' | 'hideUi' | 'hideTime' | 'showWholeMs'>;
        title: string;
        subtitle?: string;
    }[] = [
        {
            name: 'showEasyAdd',
            title: trans('timerSettings.showEasyAdd'),
            subtitle: trans('timerSettings.showEasyAddDesc'),
        },
        {
            name: 'inspection',
            title: trans('timerSettings.inspection'),
            subtitle: trans('timerSettings.inspectionDesc'),
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
        <>
            <CustomModal
                showCloseX
                onClose={onClose}
                title={trans('timerSettingsTitle')}
                isVisible={showModal}
                size="xl"
            >
                <ScrollView style={styles.settingsContainer}>
                    {switchSettingsMap.map(setting => (
                        <SettingItem key={setting.name}>
                            <SettingsSwitchItem
                                value={timerSettings[setting.name]}
                                title={setting.title}
                                onSwitch={() => updateSettings({ [setting.name]: !timerSettings[setting.name] })}
                                subtitle={setting.subtitle}
                            />
                            {setting.name === 'inspection' && !!timerSettings[setting.name] && (
                                <LinkButton
                                    title="Inspection settings"
                                    onPress={() => setShowInspectionModal(true)}
                                    color={getColor('primary200')}
                                    style={{ alignItems: 'center' }}
                                />
                            )}
                        </SettingItem>
                    ))}
                </ScrollView>
                <CustomModal.ButtonsContainer>
                    <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
                    <CustomModal.Button type="primary" onPress={onSaveSettingsHandler} title={trans('save')} />
                </CustomModal.ButtonsContainer>
            </CustomModal>
            <InspectionSettingsModal showModal={showInspectionModal} onClose={() => setShowInspectionModal(false)} />
        </>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
    },
});
