import { Result } from '../../models/result';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../../utils/formatTime';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useTranslation } from '../../hooks/useTranslation';
import { useState } from 'react';
import { formatDateToDDMM } from '../../utils/formatDateToDDMM';
import { MaterialIcons } from '@expo/vector-icons';
import { TimeDetailsModal } from './TimeDetailsModal';

const showTimeResult = (result: Result) => {
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

export const TimeListItem = ({ result }: { result: Result }) => {
    const [showTimeDetailsModal, setShowTimeDetailsModal] = useState(false);
    const getColor = useColors();
    const trans = useTranslation();

    return (
        <>
            <Pressable onPress={() => setShowTimeDetailsModal(true)}>
                <View style={[styles.container, { backgroundColor: getColor('primary200') }]}>
                    <View style={styles.topBar}>
                        <Text style={[styles.date, { color: getColor('gray100') }]}>
                            {formatDateToDDMM(result.date)}
                        </Text>

                        <Text style={[styles.penalty, { color: getColor('error') }]}>
                            {result.flag === '+2' ? '+2' : ''}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={[styles.time, { color: getColor('text') }]}>
                        {showTimeResult(result)}
                    </Text>
                    {result.note ? (
                        <MaterialIcons name="chat" color={getColor('gray100')} size={FONTS.sm} />
                    ) : (
                        <Text></Text>
                    )}
                </View>
            </Pressable>

            <TimeDetailsModal
                showModal={showTimeDetailsModal}
                onClose={() => setShowTimeDetailsModal(false)}
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
});
