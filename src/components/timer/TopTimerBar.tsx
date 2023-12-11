import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FONTS, DIMENSIONS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { IconButton } from '../UI/IconButton';
import { TimerSettingsModal } from '../timerSettingsModal/TimerSettingsModal';
import { ManageSessionModal } from './modals/ManageSessionsModal';
import { TopBarCubeButton } from './TopBarCubeButton';
import { SolvesContext } from '../../store/solves-context';
import { useTimerSettingsStore } from '../../store/timerSettingsStore';

export const TopTimerBar = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);
    const cube = useTimerSettingsStore(state => state.cube);
    const { currentSession: session } = useContext(SolvesContext);

    const getColor = useColors();

    return (
        <>
            <ManageSessionModal showModal={showSessionModal} onClose={() => setShowSessionModal(false)} />
            <TimerSettingsModal showModal={showSettings} onClose={() => setShowSettings(false)} />
            <View style={styles.topBarContainer}>
                <View style={styles.topBar}>
                    <IconButton
                        icon="settings"
                        size={FONTS.lg}
                        color={getColor('gray100')}
                        onPress={() => setShowSettings(true)}
                    />
                    <TopBarCubeButton
                        title={cube}
                        // @ts-ignore
                        session={session?.name}
                    />
                    <IconButton
                        icon="list-alt"
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
