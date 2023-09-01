import { StyleSheet, Text, View } from 'react-native';
import { CustomSwitch } from '../UI/CustomSwitch';
import { DIMENSIONS } from '../../styles/base';

interface SettingsSwitchItemProps {
    title: string;
    onSwitch: () => void;
    value: boolean;
}

export const SettingsSwitchItem = ({ title, onSwitch, value }: SettingsSwitchItemProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.switch}>
                <CustomSwitch value={value} onChange={onSwitch} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: DIMENSIONS.fullWidth * 0.8,
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between',
    },
    text: {
        flex: 6,
    },
    switch: {
        flex: 1,
    },
});
