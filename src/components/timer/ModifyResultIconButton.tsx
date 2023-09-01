import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../../hooks/useColors';
import { FONTS } from '../../styles/base';
import { ButtonName } from './ModifyResultBlock';

export const ModifyResultIconButton = ({
    icon,
    name,
    onPress,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    name: ButtonName;
    onPress: (name: ButtonName) => void;
}) => {
    const getColor = useColors();

    return (
        <Pressable onPress={() => onPress(name)}>
            <View>
                <Ionicons name={icon} size={FONTS.lg} color={getColor('gray100')} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({});
