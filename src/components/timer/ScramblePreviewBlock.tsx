import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generateScramble } from '../../utils/generateScramble';
import { useColors } from '../../hooks/useColors';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { AddScrambleModal } from './modals/AddScrambleModal';
import { AddTimeModal } from './modals/AddTimeModal';
import { Result } from '../../models/result';
import { useTimerSettingsStore } from '../../store/timerSettingsStore';
import { useTranslation } from '../../hooks/useTranslation';
import { ScramblePillIcon } from './ScramblePillIcon';
import FireIcon from '../../assets/icons/FireIcon';
import AddIcon from '../../assets/icons/AddIcon';
import EditIcon from '../../assets/icons/EditIcon';
import RotateIcon from '../../assets/icons/RotateIcon';
import ArrowLeftIcon from '../../assets/icons/ArrowLeftIcon';

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
    const [cube, scrambleBlockPlacement] = useTimerSettingsStore(state => [state.cube, state.scrambleBlockPlacement]);
    const [showAddScrambleModal, setShowAddScrambleModal] = useState(false);
    const [showAddTimeModal, setShowAddTimeModal] = useState(false);
    const getColor = useColors();
    const trans = useTranslation();

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
        const scr = generateScramble(cube);
        onChangeScramble(scr[0], newCube);
    };

    const onAddTimeHandler = (result: Result, saveScramble: boolean) => {
        onAddTime(result, saveScramble);
        setShowAddTimeModal(false);
    };

    useEffect(() => {
        onRegenerateScramble(true);
    }, [cube]);

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

            <View style={[styles.outerContainer, { backgroundColor: getColor('backgroundLight') }]}>
                <View style={[{ flexDirection: scrambleBlockPlacement === 'top' ? 'column' : 'column-reverse' }]}>
                    <Text style={[styles.title, { color: getColor('gray600') }]}>{trans('currentScramble')}</Text>

                    <Text style={[styles.scramble, { color: getColor('gray100') }]}>
                        {scramble[scramble.length - 1]}
                    </Text>

                    <View style={styles.buttonsContainer}>
                        {scramble.length > 1 && (
                            <ScramblePillIcon title={trans('last')} onPress={onSetPrevScramble}>
                                <ArrowLeftIcon color={getColor('accentLight')} />
                            </ScramblePillIcon>
                        )}

                        <ScramblePillIcon title={trans('add')} onPress={onShowAddTime}>
                            <AddIcon color={getColor('accentLight')} />
                        </ScramblePillIcon>
                        <ScramblePillIcon accent={isWarmup} title={trans('warmup')} onPress={toggleWarmup}>
                            <FireIcon color={isWarmup ? getColor('white') : getColor('accentLight')} />
                        </ScramblePillIcon>
                        <ScramblePillIcon title={trans('edit')} onPress={onShowAddScramble}>
                            <EditIcon color={getColor('accentLight')} />
                        </ScramblePillIcon>

                        {showRegenerateScramble && (
                            <ScramblePillIcon title={trans('new')} onPress={() => onRegenerateScramble(false)}>
                                <RotateIcon color={getColor('accentLight')} />
                            </ScramblePillIcon>
                        )}
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: DIMENSIONS.fullWidth * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 24,
        paddingVertical: PADDING.md,
        marginTop: PADDING.sm,
        paddingHorizontal: PADDING.m,
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: PADDING.sm,
    },
    scramble: {
        paddingHorizontal: PADDING.micro,
        fontSize: FONTS.md,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: PADDING.sm,
        letterSpacing: 2.1,
    },
    title: {
        marginBottom: PADDING.m,
        fontSize: FONTS.s,
        textAlign: 'center',
    },
});
