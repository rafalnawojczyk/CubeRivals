import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { CustomModal } from '../UI/modal/CustomModal';
import { FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useTranslation } from '../../hooks/useTranslation';
import { formatTime } from '../../utils/formatTime';
import { TimerSettingsContext } from '../../store/timer-settings-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ModifyResultBlock, buttonsMap } from '../timer/ModifyResultBlock';
import { formatTimestamp } from '../../utils/formatTimestamp';
import { Solve } from '../../models/realm-models/SolveSchema';

interface TimeDetailsModalProps {
    showModal: boolean;
    onClose: () => void;
    result: Solve;
}

export const TimeDetailsModal = ({ showModal, onClose, result }: TimeDetailsModalProps) => {
    const { timerSettings } = useContext(TimerSettingsContext);
    const getColor = useColors();

    const date = formatTimestamp(result.createdAt);

    return (
        <CustomModal isVisible={showModal} onClose={onClose} size="lg">
            <View style={[styles.topBar, { borderBlockColor: getColor('gray100') }]}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={[styles.timerText, { color: getColor('gray100') }]}>
                        {formatTime(
                            result.flag === '+2' ? result.time + 2000 : result.time,
                            !timerSettings.showWholeMs
                        )}
                    </Text>
                    <Text style={[styles.penalty, { color: getColor('error') }]}>
                        {result.flag ? result.flag.toUpperCase() : ''}
                    </Text>
                </View>
                <View style={styles.dateContainer}>
                    <MaterialIcons name="date-range" size={FONTS.md} color={getColor('text')} />
                    <View>
                        <Text style={[styles.date, { color: getColor('text'), marginBottom: 2 }]}>{date.date}</Text>
                        <Text style={[styles.date, { color: getColor('text') }]}>{date.time}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.scrambleContainer, { borderBlockColor: getColor('gray100') }]}>
                <Text style={[styles.scramble, { color: getColor('text') }]}>{result.scramble}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ModifyResultBlock solve={result} showDelete setSolveResult={() => {}} onDelete={onClose} />
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        width: '100%',
        paddingBottom: PADDING.sm,
        borderBottomWidth: 1,
    },
    timerText: {
        fontSize: FONTS['xl'],
        fontFamily: 'robotoMono-light',
        fontWeight: 'bold',
    },
    penalty: {
        fontSize: FONTS.m,
        fontWeight: 'bold',
        padding: 6,
    },
    date: {
        fontWeight: '200',
        fontSize: FONTS.sm,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: FONTS.sm,
    },
    scrambleContainer: {
        width: '100%',
        paddingVertical: PADDING.md,
        borderBottomWidth: 1,
    },
    scramble: {
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: PADDING.md,
        alignSelf: 'flex-end',
        paddingTop: PADDING.md,
    },
});

// This modal should show:
// TIME as a big one - maybe the same size as on timer screen
// Scramble beneath time,
// somewhere put a date of a solve?
// of course add ModifyResultBlock - before time or ?
// buttons to  cancel and save modifications
// time modifications should be done only on save? or cancel will just close modal?

// TODO:  onChangeScramble should get a function that will update result in realm database
