import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { DIMENSIONS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { TimerSettingsModal } from '../timerSettingsModal/TimerSettingsModal';
import { ManageSessionModal } from './modals/ManageSessionsModal';
import { TopBarCubeButton } from './TopBarCubeButton';
import { useTimerSettingsStore } from '../../store/timerSettingsStore';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import { TopBarSessionButton } from './TopBarSessionButton';

export const TopTimerBar = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);
    const cube = useTimerSettingsStore(state => state.cube);

    const getColor = useColors();

    return (
        <>
            <ManageSessionModal showModal={showSessionModal} onClose={() => setShowSessionModal(false)} />
            <TimerSettingsModal showModal={showSettings} onClose={() => setShowSettings(false)} />
            <View style={styles.topBarContainer}>
                <View style={styles.topBar}>
                    <View style={styles.barItem}>
                        <Pressable
                            onPress={() => setShowSettings(true)}
                            style={[styles.settingsIcon, { borderColor: getColor('background100') }]}
                        >
                            <SettingsIcon color={getColor('gray500')} />
                        </Pressable>
                    </View>
                    <View style={styles.barItem}>
                        <TopBarCubeButton title={cube} />
                    </View>
                    <View style={styles.barItem}>
                        <TopBarSessionButton onPress={() => setShowSessionModal(true)} />
                    </View>
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
    settingsIcon: {
        width: 39,
        height: 39,
        borderRadius: 9999,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barItem: {
        width: '33%',
    },
});
