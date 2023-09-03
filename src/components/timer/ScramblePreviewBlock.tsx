import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generateScramble } from '../../utils/generateScramble';
import { TimerSettingsContext } from '../../store/timer-settings-context';
import { CubeType } from '../../models/cubes';
import { useColors } from '../../hooks/useColors';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { IconButton } from '../UI/IconButton';
import { AddScrambleModal } from './modals/AddScrambleModal';

export const ScramblePreviewBlock = ({
    onChangeScramble,
    scramble,
}: {
    onChangeScramble: (scramble: string) => void;
    scramble: string;
}) => {
    const { timerSettings } = useContext(TimerSettingsContext);
    const [showAddScrambleModal, setShowAddScrambleModal] = useState(false);
    const getColor = useColors();

    const onAddOwnScramble = (scramble: string) => {
        onChangeScramble(scramble);
    };

    const onShowAddScramble = () => {
        setShowAddScrambleModal(true);
    };

    const onRegenerateScramble = () => {
        const scr = generateScramble(timerSettings.cube);
        onChangeScramble(scr);
    };

    useEffect(() => {
        onRegenerateScramble();
    }, [timerSettings.cube]);

    return (
        <>
            <AddScrambleModal
                onAddScramble={onAddOwnScramble}
                onClose={() => setShowAddScrambleModal(false)}
                showModal={showAddScrambleModal}
            />
            <View style={styles.outerContainer}>
                <View style={styles.container}>
                    <Text style={[styles.scramble, { color: getColor('gray100') }]}>{scramble}</Text>
                    <View style={styles.buttonsContainer}>
                        <IconButton
                            icon="pencil-outline"
                            size={FONTS.lg}
                            color={getColor('gray100')}
                            onPress={onShowAddScramble}
                        />
                        <IconButton
                            icon="refresh-outline"
                            size={FONTS.lg}
                            color={getColor('gray100')}
                            onPress={onRegenerateScramble}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: DIMENSIONS.fullWidth * 0.95,
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: PADDING.sm,
    },
    scramble: {
        fontSize: FONTS.md,
        textAlign: 'center',
    },
});
