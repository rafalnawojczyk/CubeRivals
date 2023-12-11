import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { CustomModal } from '../UI/modal/CustomModal';
import { FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useTranslation } from '../../hooks/useTranslation';
import { SettingItem } from './SettingItem';
import { LinkButton } from '../UI/LinkButton';
import { SettingsSwitchItem } from './SettingsSwitchItem';
import { InspectionAlertsType, useTimerSettingsStore } from '../../store/timerSettingsStore';
import { ListSelectModal } from '../ListSelectModal';
import { NumberPickerModal } from '../NumberPickerModal';

interface InspectionSettingsModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const INSPECTION_TIME_THRESHOLDS = [0.5, 0.8];

export const InspectionSettingsModal = ({ showModal, onClose }: InspectionSettingsModalProps) => {
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [showInspectionAlertModal, setShowInspectionAlertModal] = useState(false);
    const [updateSettings, inspectionTime, inspectionAlerts] = useTimerSettingsStore(state => [
        state.updateSettings,
        state.inspectionTime,
        state.inspectionAlerts,
    ]);

    const getColor = useColors();
    const trans = useTranslation();

    return (
        <>
            <CustomModal
                isVisible={showModal}
                onClose={onClose}
                title={trans('timerSettings.editInspection')}
                size="lg"
            >
                <View style={{ width: '100%' }}>
                    <SettingItem>
                        <View style={styles.settingContainer}>
                            <Text style={{ color: getColor('text'), fontSize: FONTS.md }}>
                                {trans('timerSettings.inspectionTime')}
                            </Text>
                            <LinkButton
                                textStyle={{ fontSize: FONTS.md }}
                                title={`${inspectionTime}s`}
                                onPress={() => setShowTimeModal(true)}
                                color={getColor('primary200')}
                            />
                        </View>
                    </SettingItem>
                    <SettingItem>
                        <SettingsSwitchItem
                            value={inspectionAlerts !== 'none'}
                            title={trans('timerSettings.inspectionAlert')}
                            onSwitch={() => {
                                updateSettings({
                                    inspectionAlerts: inspectionAlerts === 'none' ? 'sound' : 'none',
                                });
                            }}
                            subtitle={trans('timerSettings.inspectionAlertDesc')
                                .replace('%1%', Math.ceil(inspectionTime * INSPECTION_TIME_THRESHOLDS[0]))
                                .replace('%2%', Math.ceil(inspectionTime * INSPECTION_TIME_THRESHOLDS[1]))}
                        />

                        {inspectionAlerts !== 'none' && (
                            <SettingItem showBorder={false}>
                                <View style={styles.settingContainer}>
                                    <Text style={{ color: getColor('text'), fontSize: FONTS.md }}>
                                        {trans('timerSettings.inspectionTimeAlertType')}
                                    </Text>
                                    <LinkButton
                                        textStyle={{ fontSize: FONTS.md }}
                                        title={trans(`timerSettings.inspectionTimeAlert-${inspectionAlerts}`)}
                                        onPress={() => setShowInspectionAlertModal(true)}
                                        color={getColor('primary200')}
                                    />
                                </View>
                            </SettingItem>
                        )}
                    </SettingItem>

                    <CustomModal.ButtonsContainer>
                        <CustomModal.Button type="primary" onPress={() => onClose()} title={trans('save')} />
                    </CustomModal.ButtonsContainer>
                </View>
            </CustomModal>
            <ListSelectModal
                modalTitle="TO CHANGE"
                listNameRender={(item: string) =>
                    trans(`timerSettings.inspectionTimeAlert-${item as InspectionAlertsType}`)
                }
                showModal={showInspectionAlertModal}
                onClose={() => setShowInspectionAlertModal(false)}
                optionsList={['none', 'vibration', 'sound', 'both']}
                currentItem={inspectionAlerts}
                onSelect={sound => {
                    updateSettings({
                        inspectionAlerts: sound as InspectionAlertsType,
                    });
                    setShowInspectionAlertModal(false);
                }}
            />
            <NumberPickerModal
                showModal={showTimeModal}
                onClose={() => setShowTimeModal(false)}
                currentNumber={inspectionTime}
                modalTitle={trans('timerSettings.inspectionTimeChange')}
                onSelect={(newTime: number) => updateSettings({ inspectionTime: newTime })}
            />
        </>
    );
};

const styles = StyleSheet.create({
    settingContainer: { flexDirection: 'row', gap: PADDING.md, alignItems: 'center' },
});
