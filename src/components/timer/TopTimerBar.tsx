import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FONTS, DIMENSIONS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { IconButton } from '../UI/IconButton';
import { TimerSettingsModal } from '../timerSettingsModal/TimerSettingsModal';
import { EnhancedManageSessionModal } from './modals/ManageSessionsModal';
import { TopBarCubeButton } from './TopBarCubeButton';
import { withObservables } from '@nozbe/watermelondb/react';
import { getDb } from '../../model/database';
import { Model, Q } from '@nozbe/watermelondb';
import { CubeType } from '../../models/cubes';
import { Session } from '../../model/session.model';

const TopTimerBar = ({ sessions, cube }: { sessions: Model[]; cube: CubeType }) => {
    const [showSettings, setShowSettings] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);

    const getColor = useColors();

    // TODO: if user loggs in - sync local DB with supabase DB
    // if user loggs in - check if his data is on server. If there is - sync it to localDB

    return (
        <>
            <EnhancedManageSessionModal
                cube={cube}
                showModal={showSessionModal}
                onClose={() => setShowSessionModal(false)}
            />
            <TimerSettingsModal showModal={showSettings} onClose={() => setShowSettings(false)} />
            <View style={styles.topBarContainer}>
                <View style={styles.topBar}>
                    <IconButton
                        icon="settings"
                        size={FONTS.lg}
                        color={getColor('gray100')}
                        onPress={() => setShowSettings(true)}
                    />
                    <TopBarCubeButton title={cube} session={(sessions as Session[])[0]?.name} />
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

//@ts-ignore
const enhance = withObservables(['sessions', 'cube'], ({ sessions, cube }) => ({
    sessions: getDb()
        .collections.get('sessions')
        .query(Q.where('cube', Q.like(`%${cube}%`)), Q.sortBy('last_seen_at', Q.desc)),
}));

export const EnhancedTopTimerBar = enhance(TopTimerBar);
