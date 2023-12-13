import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { useTranslation } from '../../../hooks/useTranslation';
import { LinkButton } from '../../UI/LinkButton';
import { useColors } from '../../../hooks/useColors';
import { NumberPickerModal } from '../../NumberPickerModal';
import { SettingsSwitchItem } from '../../timerSettingsModal/SettingsSwitchItem';
import { FONTS, PADDING } from '../../../styles/base';
import { SettingItem } from '../../timerSettingsModal/SettingItem';
import { useTimerSettingsStore } from '../../../store/timerSettingsStore';

interface AverageThresholdsModalProps {
    showModal: boolean;
    onClose: () => void;
}

const unusedNumber = 9;

export const AverageThresholdsModal = ({ showModal, onClose }: AverageThresholdsModalProps) => {
    const [cutEndsInAvgs, updateSettings, avgThresholds] = useTimerSettingsStore(state => [
        state.cutEndsInAvgs,
        state.updateSettings,
        state.avgThresholds,
    ]);
    const [editThreshold, setEditThreshold] = useState(unusedNumber);
    const [thresholds, setThresholds] = useState(avgThresholds);
    const getColor = useColors();

    const trans = useTranslation();

    return (
        <>
            <CustomModal
                isVisible={showModal}
                onClose={onClose}
                title={trans('timerSettings.customizeAvgThresholds')}
                size="lg"
            >
                <SettingItem>
                    <SettingsSwitchItem
                        title={trans('timerSettings.cutEndsAvg')}
                        subtitle={trans('timerSettings.cutEndsAvgDesc')}
                        value={cutEndsInAvgs}
                        onSwitch={() => updateSettings({ cutEndsInAvgs: !cutEndsInAvgs })}
                    />
                </SettingItem>
                <View style={styles.container}>
                    <View>
                        <Text style={{ color: getColor('text'), fontSize: FONTS.m, textAlign: 'center' }}>
                            {trans('timerSettings.avgThresholdsDesc')}
                        </Text>
                    </View>
                    <View style={styles.horizontalContainer}>
                        {thresholds.map((threshold, index) => (
                            <LinkButton
                                key={index}
                                color={getColor('primary200')}
                                title={threshold.toString()}
                                onPress={() => setEditThreshold(index)}
                                textStyle={styles.number}
                            />
                        ))}
                    </View>
                </View>

                <CustomModal.ButtonsContainer>
                    <CustomModal.Button type="secondary" onPress={onClose} title={trans('cancel')}></CustomModal.Button>
                    <CustomModal.Button
                        type="primary"
                        onPress={() => {
                            updateSettings({ avgThresholds: thresholds });
                            onClose();
                        }}
                        title={trans('save')}
                    />
                </CustomModal.ButtonsContainer>
            </CustomModal>
            {editThreshold !== unusedNumber && (
                <NumberPickerModal
                    showModal={editThreshold !== unusedNumber}
                    onClose={() => setEditThreshold(unusedNumber)}
                    currentNumber={thresholds[editThreshold]}
                    modalTitle={trans('timerSettings.editAvgThreshold')}
                    onSelect={(pickedNumber: number) => {
                        setThresholds(prev => {
                            const newThresholds = [...prev];
                            newThresholds[editThreshold] = pickedNumber;

                            return newThresholds.sort((a, b) => a - b);
                        });
                        setEditThreshold(unusedNumber);
                    }}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: PADDING.md,
        width: '90%',
        paddingVertical: PADDING.md,
        alignItems: 'center',
    },
    horizontalContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        fontSize: FONTS.md,
    },
    number: {
        fontSize: FONTS.lg,
    },
});
