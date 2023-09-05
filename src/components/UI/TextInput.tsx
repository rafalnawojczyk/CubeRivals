import React from 'react';
import { TextInput as RNTextInput, View, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { TextInputProps as RNTextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';
import { IconButton } from './IconButton';
import { PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';

interface TextInputProps {
    leftIconName: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    handlePasswordVisibility?: () => void;
    otherProps: RNTextInputProps;
}

export const TextInput = ({ leftIconName, rightIcon, handlePasswordVisibility, otherProps }: TextInputProps) => {
    const getColor = useColors();

    return (
        <View style={[styles.container, { backgroundColor: getColor('background'), borderColor: getColor('gray100') }]}>
            {leftIconName ? (
                <Ionicons name={leftIconName} size={22} color={getColor('gray100')} style={styles.marginRight} />
            ) : null}
            <RNTextInput
                style={[styles.textInput, { color: getColor('text') }]}
                placeholderTextColor={getColor('gray100')}
                {...otherProps}
            />
            {rightIcon ? (
                <IconButton
                    icon={rightIcon}
                    size={22}
                    color={getColor('gray100')}
                    onPress={() => {
                        if (handlePasswordVisibility) {
                            handlePasswordVisibility();
                        }
                    }}
                    style={styles.marginRight}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        flexDirection: 'row',
        padding: 12,
        marginVertical: 12,
        alignItems: 'center',
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        width: '100%',
        fontSize: 18,
    },
    marginRight: {
        marginRight: PADDING.sm,
    },
});
