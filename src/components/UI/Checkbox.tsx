import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColors } from '../../hooks/useColors';

export const CheckBox = ({ isChecked, onPress }: { onPress: () => void; isChecked: boolean }) => {
    const iconName = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';
    const getColor = useColors();

    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <MaterialCommunityIcons
                    name={iconName}
                    size={24}
                    color={isChecked ? getColor('primary200') : getColor('gray100')}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: 25,
    },
});
