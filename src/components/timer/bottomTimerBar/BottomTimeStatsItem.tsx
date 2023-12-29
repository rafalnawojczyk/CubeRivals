import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../../../hooks/useColors';
import { FONTS } from '../../../styles/base';

export const BottomTimeStatsItem = ({ title, amount }: { title: string; amount: string }) => {
    const getColor = useColors();

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: getColor('accentLight') }]}>{title}</Text>
            <Text style={[styles.text, { color: getColor('text') }]}>{amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: FONTS.micro,
        textTransform: 'uppercase',
        letterSpacing: 1.1,
        width: '100%',
    },
    text: {
        fontSize: FONTS.m,
        fontWeight: '600',
        width: '100%',
    },
});
