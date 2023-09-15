import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generateScramble } from '../../utils/generateScramble';
import { TimerSettingsContext } from '../../store/timer-settings-context';
import { useColors } from '../../hooks/useColors';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { IconButton } from '../UI/IconButton';
import { AddScrambleModal } from './modals/AddScrambleModal';
import { AddTimeModal } from './modals/AddTimeModal';
import { Result } from '../../models/result';

export const ScramblePreviewBlock = ({
    onChangeScramble,
    scramble,
    showRegenerateScramble = true,
    onSetPrevScramble,
    isWarmup,
    toggleWarmup,
    onAddTime,
}: {
    onChangeScramble: (scramble: string, newCube: boolean) => void;
    scramble: string[];
    showRegenerateScramble?: boolean;
    onAddTime: (result: Result, saveScramble: boolean) => void;
    isWarmup: boolean;
    toggleWarmup: () => void;
    onSetPrevScramble: () => void;
}) => {
    const { timerSettings } = useContext(TimerSettingsContext);
    const [showAddScrambleModal, setShowAddScrambleModal] = useState(false);
    const [showAddTimeModal, setShowAddTimeModal] = useState(false);
    const getColor = useColors();

    const onAddOwnScramble = (ownScramble: string) => {
        onChangeScramble(ownScramble, false);
    };

    const onShowAddScramble = () => {
        setShowAddScrambleModal(true);
    };

    const onShowAddTime = () => {
        setShowAddTimeModal(true);
    };

    const onRegenerateScramble = (newCube: boolean = false) => {
        const scr = generateScramble(timerSettings.cube);
        onChangeScramble(scr[0], newCube);
    };

    const onAddTimeHandler = (result: Result, saveScramble: boolean) => {
        onAddTime(result, saveScramble);
        setShowAddTimeModal(false);
    };

    useEffect(() => {
        onRegenerateScramble(true);
    }, [timerSettings.cube]);

    return (
        <>
            <AddTimeModal
                showModal={showAddTimeModal}
                onClose={() => setShowAddTimeModal(false)}
                onAddTime={onAddTimeHandler}
            />

            <AddScrambleModal
                onAddScramble={onAddOwnScramble}
                onClose={() => setShowAddScrambleModal(false)}
                showModal={showAddScrambleModal}
            />

            <View style={styles.outerContainer}>
                <View
                    style={[
                        styles.container,
                        { flexDirection: timerSettings.scrambleBlockPlacement === 'top' ? 'column' : 'column-reverse' },
                    ]}
                >
                    <Text style={[styles.scramble, { color: getColor('gray100') }]}>
                        {scramble[scramble.length - 1]}
                    </Text>
                    <View style={styles.buttonsContainer}>
                        {scramble.length > 1 && (
                            <IconButton
                                icon="fast-rewind"
                                size={FONTS.lg}
                                color={getColor('gray100')}
                                onPress={onSetPrevScramble}
                            />
                        )}
                        <IconButton
                            icon="local-fire-department"
                            size={FONTS.lg}
                            color={isWarmup ? getColor('error') : getColor('gray100')}
                            onPress={toggleWarmup}
                        />
                        <IconButton
                            icon="add-alarm"
                            size={FONTS.lg}
                            color={getColor('gray100')}
                            onPress={onShowAddTime}
                        />
                        <IconButton
                            icon="mode-edit"
                            size={FONTS.lg}
                            color={getColor('gray100')}
                            onPress={onShowAddScramble}
                        />
                        {showRegenerateScramble && (
                            <IconButton
                                icon="refresh"
                                size={FONTS.lg}
                                color={getColor('gray100')}
                                onPress={() => onRegenerateScramble(false)}
                            />
                        )}
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
        marginBottom: PADDING.sm,
    },
});
