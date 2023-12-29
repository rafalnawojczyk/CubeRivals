import {  useState } from 'react';
import { CustomModal } from '../UI/modal/CustomModal';
import { TimerSettingsType } from '../../store/timerSettingsStore';
import { useTranslation } from '../../hooks/useTranslation';
import { ScrollView, StyleSheet, View, Text, Modal } from 'react-native';
import { SettingsSwitchItem } from './SettingsSwitchItem';
import { SettingItem } from './SettingItem';
import { LinkButton } from '../UI/LinkButton';
import { useColors } from '../../hooks/useColors';
import { InspectionSettingsModal } from './InspectionSettingsModal';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { NumberPickerModal } from '../NumberPickerModal';
import { RemoveConfirmModal } from '../timer/modals/RemoveConfirmModal';
import { ListSelectModal } from '../ListSelectModal';
import { useTimerSettingsStore } from '../../store/timerSettingsStore';

interface TimerSettingsModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const TimerSettingsModal = ({ showModal, onClose }: TimerSettingsModalProps) => {
    const timerState = useTimerSettingsStore(state => state);
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
        timerState.resetSettings();
        setShowResetConfirmModal(false);
    };

    return (
        <>
            <Modal animationType="slide" transparent={true} visible={showModal} onRequestClose={onClose}>
                <View style={[styles.modal, { backgroundColor: getColor('background') }]}>
                    <Text style={[styles.title, { color: getColor('text') }]}>{trans('timerSettingsTitle')}</Text>
                    <ScrollView
                        fadingEdgeLength={2000}
                        style={[styles.settingsContainer, { backgroundColor: getColor('backgroundLight') }]}
                    >
                        {switchSettingsMap.map(setting => (
                            <SettingItem key={setting.name}>
                                <SettingsSwitchItem
                                    value={timerState[setting.name]}
                                    title={setting.title}
                                    onSwitch={() =>
                                        timerState.updateSettings({ [setting.name]: !timerState[setting.name] })
                                    }
                                    subtitle={setting.subtitle}
                                />
                                {setting.name === 'inspection' && !!timerState[setting.name] && (
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
                                    title={`${timerState.holdDelay}ms`}
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
                                        `timerSettings.scrambleBlockPlacement-${timerState.scrambleBlockPlacement}`
                                    )}
                                    onPress={() => setShowScramblePlacementModal(true)}
                                    color={getColor('primary200')}
                                />
                            </View>
                        </SettingItem>
                    </ScrollView>
                    <CustomModal.ButtonsContainer>
                        <CustomModal.Button type="primary" onPress={onSaveSettingsHandler} title={trans('save')} />
                        <CustomModal.Button
                            type="error"
                            onPress={() => setShowResetConfirmModal(true)}
                            title={trans('reset')}
                        />
                        <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
                    </CustomModal.ButtonsContainer>
                </View>
            </Modal>
            <InspectionSettingsModal showModal={showInspectionModal} onClose={() => setShowInspectionModal(false)} />
            <NumberPickerModal
                showModal={showHoldDelayModal}
                onClose={() => setShowHoldDelayModal(false)}
                currentNumber={timerState.holdDelay}
                modalTitle={trans('timerSettings.holdDelayModalTitle')}
                onSelect={(newTime: number) => timerState.updateSettings({ holdDelay: newTime })}
            />
            <ListSelectModal
                showModal={showScramblePlacementModal}
                onClose={() => setShowScramblePlacementModal(false)}
                optionsList={['top', 'bottom']}
                listNameRender={(item: string) =>
                    trans(`timerSettings.scrambleBlockPlacement-${item as 'top' | 'bottom'}`)
                }
                currentItem={timerState.scrambleBlockPlacement}
                modalTitle={trans('timerSettings.scramblePlacementModal')}
                onSelect={(item: string) => {
                    timerState.updateSettings({ scrambleBlockPlacement: item as 'top' | 'bottom' });
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
    modal: {
        width: DIMENSIONS.fullWidth,
        height: DIMENSIONS.fullHeight,
        zIndex: 9999,
        paddingHorizontal: PADDING.m,
    },
    title: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: FONTS.lg,
        fontWeight: 'bold',
        marginBottom: PADDING.md,
    },
    settingsContainer: {
        flex: 1,
        paddingHorizontal: PADDING.m,
        borderRadius: 16,
    },
    settingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: PADDING.sm,
    },
});
