import { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CubeType } from '../../models/cubes';
import { TimerSettingsContext } from '../../store/timer-settings-context';
import { FONTS, DIMENSIONS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { IconButton } from '../UI/IconButton';
import { TimerSettingsModal } from '../timerSettingsModal/TimerSettingsModal';
import { ManageSessionModal } from './modals/ManageSessionsModal';
import { CustomButton } from '../UI/CustomButton';
import { TopBarCubeButton } from './TopBarCubeButton';

export const TopTimerBar = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);
    const { updateSettings, timerSettings } = useContext(TimerSettingsContext);
    const getColor = useColors();

    const onCubeTypeChange = (cubeType: CubeType) => {
        updateSettings({ cube: cubeType });
    };

    return (
        <>
            <ManageSessionModal showModal={showSessionModal} onClose={() => setShowSessionModal(false)} />
            <TimerSettingsModal showModal={showSettings} onClose={() => setShowSettings(false)} />
            <View style={styles.topBarContainer}>
                <View style={styles.topBar}>
                    <IconButton
                        icon="settings-outline"
                        size={FONTS.lg}
                        color={getColor('gray100')}
                        onPress={() => setShowSettings(true)}
                    />
                    <TopBarCubeButton title={timerSettings.cube} session={timerSettings.session} />
                    <IconButton
                        icon="pricetags-outline"
                        size={FONTS.lg}
                        color={getColor('gray100')}
                        onPress={() => setShowSessionModal(true)}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    topBar: {
        height: DIMENSIONS.fullHeight * 0.1,
        width: DIMENSIONS.fullWidth * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topBarContainer: {
        width: '100%',
        alignItems: 'center',
    },
});
