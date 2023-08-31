import { SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useColors } from '../../hooks/useColors';

export const SafeAreaCard = ({ children }: { children?: React.ReactNode }) => {
    const getColor = useColors();

    return (
        <View style={[styles.container, { backgroundColor: getColor('background') }]}>
            <SafeAreaView style={[styles.container, styles.safeViewContainer]}>{children}</SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeViewContainer: {
        marginTop: Constants.statusBarHeight,
    },
});
