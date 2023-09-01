import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { Timer } from '../components/timer/Timer';
import { DIMENSIONS, FONTS } from '../styles/base';
import { IconButton } from '../components/UI/IconButton';
import { useColors } from '../hooks/useColors';
import { TimerSettingsModal } from '../components/timerSettingsModal/TimerSettingsModal';

// TODO: read about navigation/route types
// @ts-ignore
export const TimerScreen = ({ navigation }) => {
    const [showSettings, setShowSettings] = useState(false);
    const getColor = useColors();

    return (
        <SafeAreaCard>
            <TimerSettingsModal showModal={showSettings} onClose={() => setShowSettings(false)} />
            <View style={styles.topBar}>
                <IconButton
                    icon="settings-outline"
                    size={FONTS.xl}
                    color={getColor('gray100')}
                    onPress={() => setShowSettings(true)}
                />
            </View>
            <Timer />
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({
    topBar: {
        width: 0.95 * DIMENSIONS.fullWidth,
        height: DIMENSIONS.fullHeight * 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

// Timer should have some area that is clickable(where timer is shown)
// When released - it should start counting time up until it's pressed again
//
// When inspection time is set, first touch will turn 15s timer, and then the same as before to turn timer on(inspection time is stopped once pressed)
//
//
// DO NOT SAVE CUBE ID - it will be determined in file name? or in file header, determined by cube and group of solves(session name)
// For now store only in state, but later on save in DB and/or in files using expo-file-system
//
// Show pen button to add your own scramble instead of generated one, reset button to regenerate scramble to fresh one
//
// UI should show cube in scrambled state in small image, and it should be clickable to enlarge image as a modal
//
// UI should have a button which will open new modal to choose puzzle (3x3x3, 4x4x4 and so on) so times will be bind to this puzzle
//
// UI should also have a button to manage session, so user Can add like "blindfolded" or "one handed" to all events
//
// Small indicator of Ao5/Ao12/Ao50/Ao100
//
// Small indicator of Avg/best/ amount of solves/deviation
//
//
// Settings should have:
// - button to navigate to app settings
// - options to turn on inspection time
// - options to turn on trimming 5% on each end in avg(so if it should calc mean or avg)
// - hide everything while solving(actual time too!)
// - auto export to file/cloud each X solves(possibly 100?)
// - option to show all ms in solve. Default - show times like 6.24 not 6.124
// - options to select your own sticker colors on cube(for colorblind ppl)
