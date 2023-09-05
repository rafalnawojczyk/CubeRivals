import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONTS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';

export const FormErrorMessage = ({ error, visible }: { error?: string; visible?: boolean }) => {
    const getColor = useColors();

    if (!error || !visible) {
        return null;
    }

    return <Text style={[styles.errorText, { color: getColor('error') }]}>{error}</Text>;
};

const styles = StyleSheet.create({
    errorText: {
        marginLeft: 15,
        fontSize: FONTS.sm,
        marginTop: 2,
        marginBottom: 8,
    },
});
