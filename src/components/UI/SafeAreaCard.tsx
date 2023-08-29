import { useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import { ThemeContext } from '../../store/theme-context';
import { getColor } from '../../utils/getColor';

export const SafeAreaCard = ({ children }: { children?: React.ReactNode }) => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: getColor(isDarkTheme, 'background') }]}>
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

// TODO: margin top as nav height
