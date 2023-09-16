import { Pressable, View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../../utils/formatTime';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useState, useContext } from 'react';
import { formatDateToDDMM } from '../../utils/formatDateToDDMM';
import { MaterialIcons } from '@expo/vector-icons';
import { TimeDetailsModal } from './TimeDetailsModal';
import { Solve } from '../../models/realm-models/SolveSchema';
import { TimerSettingsContext } from '../../store/timer-settings-context';

const showTimeResult = (result: Solve) => {
    if (result.flag === 'dnf') {
        return 'DNF';
    }
    if (result.flag === 'dns') {
        return 'DNS';
    }

    if (result.flag === '+2') {
        return formatTime(result.time + 2000);
    }

    return formatTime(result.time);
};

export const TimeListItem = ({
    result,
    onSelectItem,
    isSelected,
}: {
    result: Solve;
    isSelected: boolean;
    onSelectItem: (item: Solve) => void;
}) => {
    const [showTimeDetailsModal, setShowTimeDetailsModal] = useState(false);
    const { timerSettings } = useContext(TimerSettingsContext);
    const [hideTime, setHideTime] = useState(false);
    const getColor = useColors();

    if (hideTime) {
        return null;
    }

    return (
        <>
            <Pressable
                onPress={() => setShowTimeDetailsModal(true)}
                delayLongPress={timerSettings.holdDelay}
                onLongPress={() => onSelectItem(result)}
            >
                <View
                    style={[
                        styles.container,
                        { backgroundColor: getColor('primary200'), borderColor: isSelected ? 'red' : 'transparent' },
                    ]}
                >
                    <View style={styles.topBar}>
                        <Text style={[styles.date, { color: getColor('gray100') }]}>
                            {formatDateToDDMM(result.createdAt)}
                        </Text>

                        <Text style={[styles.penalty, { color: getColor('error') }]}>
                            {result.flag === '+2' ? '+2' : ''}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={[styles.time, { color: getColor('text') }]}>
                        {showTimeResult(result)}
                    </Text>
                    <View style={styles.bottomIconsContainer}>
                        {result.note ? (
                            <MaterialIcons name="chat" color={getColor('gray100')} size={FONTS.sm} />
                        ) : (
                            <Text></Text>
                        )}
                        {result.star ? (
                            <MaterialIcons name="star" color={getColor('gray100')} size={FONTS.sm} />
                        ) : (
                            <Text></Text>
                        )}
                    </View>
                </View>
            </Pressable>

            <TimeDetailsModal
                showModal={showTimeDetailsModal}
                onClose={() => {
                    setShowTimeDetailsModal(false);
                }}
                onDelete={() => {
                    setHideTime(true);
                }}
                result={result}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: DIMENSIONS.fullHeight * 0.08,
        marginBottom: PADDING.md,
        borderRadius: 9,
        minWidth: '30%',
        maxWidth: '100%',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderWidth: 2,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        fontSize: FONTS.md,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    date: {
        fontSize: FONTS.sm,
    },
    penalty: {
        fontSize: FONTS.sm,
        fontWeight: 'bold',
    },
    bottomIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
});
