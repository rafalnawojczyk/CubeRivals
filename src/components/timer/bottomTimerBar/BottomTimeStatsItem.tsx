import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../../../hooks/useColors';

export const BottomTimeStatsItem = ({ title, amount }: { title: string; amount: string }) => {
    const getColor = useColors();

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: getColor('text') }]}>{title}</Text>
            <Text style={[styles.text, { color: getColor('text') }]}>{amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {},
});
