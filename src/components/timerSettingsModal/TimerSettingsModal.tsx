import { useContext, useState } from 'react';
import { CustomModal } from '../UI/modal/CustomModal';
import { TimerSettingsContext, TimerSettingsType } from '../../store/timer-settings-context';
import { useTranslation } from '../../hooks/useTranslation';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SettingsSwitchItem } from './SettingsSwitchItem';
import { SettingItem } from './SettingItem';
import { LinkButton } from '../UI/LinkButton';
import { useColors } from '../../hooks/useColors';
import { InspectionSettingsModal } from './InspectionSettingsModal';
import { FONTS, PADDING } from '../../styles/base';
import { NumberPickerModal } from '../NumberPickerModal';
import { RemoveConfirmModal } from '../timer/modals/RemoveConfirmModal';
import { ListSelectModal } from '../ListSelectModal';

interface TimerSettingsModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const TimerSettingsModal = ({ showModal, onClose }: TimerSettingsModalProps) => {
    const { timerSettings, updateSettings, resetSettings } = useContext(TimerSettingsContext);
    const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
    const [showHoldDelayModal, setShowHoldDelayModal] = useState(false);
    const [showScramblePlacementModal, setShowScramblePlacementModal] = useState(false);
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

    const resetTimerSettingsHandler = () => {
        resetSettings();
        setShowResetConfirmModal(false);
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
                    <SettingItem>
                        <View style={styles.settingContainer}>
                            <Text style={{ color: getColor('text'), fontSize: FONTS.md }}>
                                {trans('timerSettings.holdDelay')}
                            </Text>
                            <LinkButton
                                textStyle={{ fontSize: FONTS.md }}
                                title={`${timerSettings.holdDelay}ms`}
                                onPress={() => setShowHoldDelayModal(true)}
                                color={getColor('primary200')}
                            />
                        </View>
                    </SettingItem>
                    <SettingItem showBorder={false}>
                        <View style={styles.settingContainer}>
                            <Text style={{ color: getColor('text'), fontSize: FONTS.md }}>
                                {trans('timerSettings.scrambleBlockPlacement')}
                            </Text>
                            <LinkButton
                                textStyle={{ fontSize: FONTS.md }}
                                title={trans(
                                    `timerSettings.scrambleBlockPlacement-${timerSettings.scrambleBlockPlacement}`
                                )}
                                onPress={() => setShowScramblePlacementModal(true)}
                                color={getColor('primary200')}
                            />
                        </View>
                    </SettingItem>
                </ScrollView>
                <CustomModal.ButtonsContainer>
                    <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
                    <CustomModal.Button
                        type="error"
                        onPress={() => setShowResetConfirmModal(true)}
                        title={trans('reset')}
                    />
                    <CustomModal.Button type="primary" onPress={onSaveSettingsHandler} title={trans('save')} />
                </CustomModal.ButtonsContainer>
            </CustomModal>
            <InspectionSettingsModal showModal={showInspectionModal} onClose={() => setShowInspectionModal(false)} />
            <NumberPickerModal
                showModal={showHoldDelayModal}
                onClose={() => setShowHoldDelayModal(false)}
                currentNumber={timerSettings.holdDelay}
                modalTitle={trans('timerSettings.holdDelayModalTitle')}
                onSelect={(newTime: number) => updateSettings({ holdDelay: newTime })}
            />
            <ListSelectModal
                showModal={showScramblePlacementModal}
                onClose={() => setShowScramblePlacementModal(false)}
                optionsList={['top', 'bottom']}
                listNameRender={(item: string) =>
                    trans(`timerSettings.scrambleBlockPlacement-${item as 'top' | 'bottom'}`)
                }
                currentItem={timerSettings.scrambleBlockPlacement}
                modalTitle={trans('timerSettings.scramblePlacementModal')}
                onSelect={(item: string) => {
                    updateSettings({ scrambleBlockPlacement: item as 'top' | 'bottom' });
                    setShowScramblePlacementModal(false);
                }}
            />
            <RemoveConfirmModal
                size="lg"
                title={trans('timerSettings.resetDesc')}
                confirmTitle={trans('reset')}
                showModal={showResetConfirmModal}
                onClose={() => setShowResetConfirmModal(false)}
                onConfirm={resetTimerSettingsHandler}
            />
        </>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
    },
    settingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: PADDING.sm,
    },
});
