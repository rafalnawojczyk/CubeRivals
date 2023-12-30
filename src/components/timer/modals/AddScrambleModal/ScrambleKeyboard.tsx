import { StyleSheet, Text, View } from 'react-native';
import { ScrambleKey } from './ScrambleKey';
import { FONTS, PADDING } from '../../../../styles/base';
import { Dispatch } from 'react';
import { useColors } from '../../../../hooks/useColors';

export const scrambleKeys = [
    ['U', "U'"],
    ["L'", 'B', "B'", 'R'],
    ['L', "F'", 'F', "R'"],
    ["D'", 'D'],
] as const;

const flatScrambleKeys = scrambleKeys.flat();

export type ScrambleKeyType = (typeof flatScrambleKeys)[number];

export const ScrambleKeyboard = ({
    scramble,
    setScramble,
}: {
    scramble: string[];
    setScramble: Dispatch<React.SetStateAction<string[]>>;
}) => {
    const getColor = useColors();

    const handleKeyPress = (key: ScrambleKeyType) => {
        if (scramble.length === 0) {
            setScramble([key]);
            return;
        }

        setScramble(prevScramble => {
            const lastChar = prevScramble[prevScramble.length - 1];
            const currentLetter = key[0];

            if (lastChar.includes(currentLetter)) {
                if (lastChar.includes('2')) {
                    if (key.includes("'")) {
                        return [...prevScramble.slice(0, prevScramble.length - 1), `${currentLetter}`];
                    } else {
                        return [...prevScramble.slice(0, prevScramble.length - 1), `${currentLetter}'`];
                    }
                } else {
                    if (key !== lastChar) {
                        return [...prevScramble.slice(0, prevScramble.length - 1)];
                    } else {
                        return [...prevScramble.slice(0, prevScramble.length - 1), `${currentLetter}2`];
                    }
                }
            } else {
                return [...prevScramble, key];
            }
        });
    };

    return (
        <View style={styles.outerContainer}>
            <Text
                style={[styles.text, { marginBottom: scramble.length === 0 ? 0 : PADDING.sm, color: getColor('text') }]}
            >
                {scramble.join(' ')}
            </Text>
            {scrambleKeys.map((row, index) => (
                <View style={[styles.row, { marginTop: index === 0 ? 0 : PADDING.micro }]}>
                    {row.map(key => (
                        <ScrambleKey keyName={key} onPress={handleKeyPress} />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignSelf: 'center',
        gap: PADDING.micro,
    },
    text: {
        fontWeight: '500',
        fontSize: FONTS.lg,
    },
});
