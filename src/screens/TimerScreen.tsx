import { Text, StyleSheet } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { Timer } from '../components/timer/Timer';

export const TimerScreen = () => {
    return (
        <SafeAreaCard>
            <Text>TIMER SCREEN</Text>
            <Timer />
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({});

// Timer should have some area that is clickable(where timer is shown)
// It should be pressed for X ms to turn timer to ready state(change color? and hide UI),
// When released - it should start counting time up until it's pressed again
//
// When inspection time is set, first touch will turn 15s timer, and then the same as before to turn timer on(inspection time is stopped once pressed)
//
// When solve is done, show Final time and 4 buttons:
// - Delete solve, DNF, flag as +2, add comment (read how DNF should be treated like, comment max to X characters)
//
// Each solve should be saved with Date, Scramble, Note, Time, Cube id(3x3x3, 4x4x4 etc), additional flag(0 as DNF, 1 as +2, 2 as DNS)
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
