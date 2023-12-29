import { Pressable, StyleSheet, View } from 'react-native';
import { ButtonName, ModifyButton } from './ModifyResultBlock';
import { useColors } from '../../hooks/useColors';

export const ResultIconButton = ({
    button,
    onPress,
    isActive,
}: {
    button: ModifyButton;
    onPress: (a: ButtonName) => void;
    isActive: boolean;
}) => {
    const getColor = useColors();

    return (
        <View key={button.name} style={styles.iconsContainer}>
            <Pressable onPress={() => onPress(button.name)}>
                {button.icon(isActive ? getColor('primary600') : getColor('accentLight'))}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    iconsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
});
