import { StyleSheet, View, Text } from 'react-native';
import { useState, useContext } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { useTranslation } from '../../../hooks/useTranslation';
import { TimerSettingsContext } from '../../../store/timer-settings-context';
import { LinkButton } from '../../UI/LinkButton';
import { useColors } from '../../../hooks/useColors';
import { NumberPickerModal } from '../../NumberPickerModal';
import { SettingsSwitchItem } from '../../timerSettingsModal/SettingsSwitchItem';

interface AverageThresholdsModalProps {
    showModal: boolean;
    onClose: () => void;
}

const unusedNumber = 9;

export const AverageThresholdsModal = ({ showModal, onClose }: AverageThresholdsModalProps) => {
    const { timerSettings, updateSettings } = useContext(TimerSettingsContext);
    const [editThreshold, setEditThreshold] = useState(unusedNumber);
    const [thresholds, setThresholds] = useState(timerSettings.avgThresholds);
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
                <SettingsSwitchItem
                    title={trans('timerSettings.cutEndsAvg')}
                    subtitle={trans('timerSettings.cutEndsAvgDesc')}
                    value={timerSettings.cutEndsInAvgs}
                    onSwitch={() => updateSettings({ cutEndsInAvgs: !timerSettings.cutEndsInAvgs })}
                />
                <View>
                    {thresholds.map((threshold, index) => (
                        <View key={index}>
                            <Text>{trans('averageOf')}:</Text>
                            <LinkButton
                                color={getColor('primary200')}
                                title={threshold.toString()}
                                onPress={() => setEditThreshold(index)}
                            />
                        </View>
                    ))}
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
                    modalTitle="Pick average threshold"
                    onSelect={(pickedNumber: number) => {
                        setThresholds(prev => {
                            const newThresholds = [...prev];
                            newThresholds[editThreshold] = pickedNumber;

                            return newThresholds;
                        });
                        setEditThreshold(unusedNumber);
                    }}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({});
