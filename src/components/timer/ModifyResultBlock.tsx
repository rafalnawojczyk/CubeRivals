import { StyleSheet, View } from 'react-native';
import { ModifyResultIconButton } from './ModifyResultIconButton';
import { Ionicons } from '@expo/vector-icons';

export type ButtonName = 'remove' | 'dnf' | '+2' | 'note';

interface ModifyButton {
    name: ButtonName;
    icon: keyof typeof Ionicons.glyphMap;
    action: () => void;
}

const buttonsMap: ModifyButton[] = [
    {
        name: 'remove',
        icon: 'trash-bin-outline',
        action: () => {},
    },
    {
        name: 'dnf',
        icon: 'warning-outline',
        action: () => {},
    },
    {
        name: '+2',
        icon: 'flag-outline',
        action: () => {},
    },
    {
        name: 'note',
        icon: 'chatbox-outline',
        action: () => {},
    },
];

export const ModifyResultBlock = () => {
    const onButtonPress = (name: ButtonName) => {
        const item = buttonsMap.find(el => el.name === name)!;

        console.log(item.name);
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                {buttonsMap.map(button => (
                    <ModifyResultIconButton name={button.name} onPress={onButtonPress} icon={button.icon} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

// +2 / DNF  should show updated time on screen with option to revert changes and back to measured time state with refresh-outline but flipped horizontally?

// note should show modal with "Add comment" block with cancel/add buttons

// remove should show modal "Delete solve?" with cancel/delete buttons
