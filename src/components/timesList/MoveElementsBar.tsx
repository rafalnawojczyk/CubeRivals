import { View, Text, StyleSheet, Alert } from 'react-native';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { CustomSwitch } from '../UI/CustomSwitch';
import { useTranslation } from '../../hooks/useTranslation';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { Session } from '../../models/realm-models/SessionSchema';
import { CustomButton } from '../UI/CustomButton';
import { useCurrentSession } from '../../hooks/useCurrentSession';
import { useSessions } from '../../hooks/useSessions';

export const MoveElementsBar = ({
    amount,
    selectedAll,
    onDeselectAll,
    onSelectAll,
    onMoveElements,
}: {
    amount: number;
    selectedAll: boolean;
    onDeselectAll: () => void;
    onSelectAll: () => void;
    onMoveElements: (session: Session) => void;
}) => {
    const [moveTo, setMoveTo] = useState<string>();
    const [openPicker, setOpenPicker] = useState(false);
    const currentSession = useCurrentSession();
    const sessions = useSessions();
    const trans = useTranslation();
    const [sessionsToMove, setSessionsToMove] = useState(
        sessions
            .map((el: Session) =>
                el._id.toString() === currentSession._id.toString()
                    ? {
                          value: el._id.toString(),
                          label: el.name,
                      }
                    : undefined
            )
            .filter((el: any) => !!el) as unknown as {
            value: string;
            label: string;
        }[]
    );
    const getColor = useColors();

    const moveTimesHandler = () => {
        if (moveTo) {
            const sessionToMove = sessions.find((el: Session) => el._id.toString() === moveTo.toString());
            if (sessionToMove) {
                onMoveElements(sessionToMove);
            } else {
                Alert.alert('Ooops!', 'There was an error while moving the times');
            }
        }
    };

    return (
        <View style={[styles.container, { borderColor: getColor('gray100') }]}>
            <View style={styles.innerContainer}>
                <View style={styles.switchContainer}>
                    <CustomSwitch value={selectedAll} onChange={selectedAll ? onDeselectAll : onSelectAll} />
                    <Text style={[styles.itemText, { color: getColor('text') }]}>
                        {selectedAll ? trans('timesList.deselectAll') : trans('timesList.selectAll')}
                    </Text>
                </View>
                <Text style={[styles.additionalText, { color: getColor('text') }]}>
                    {trans('timesList.selected')}: {amount}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: PADDING.sm }}>
                <DropDownPicker
                    multiple={false}
                    placeholder={trans('timesList.moveSessionTo')}
                    //@ts-ignore
                    value={moveTo}
                    containerStyle={{ flex: 5 }}
                    setValue={setMoveTo}
                    open={openPicker}
                    setOpen={setOpenPicker}
                    items={sessionsToMove}
                    setItems={setSessionsToMove}
                    itemKey="value"
                />
                <CustomButton
                    onPress={moveTimesHandler}
                    type="primary"
                    title={'Move'}
                    style={{ flex: 2, paddingLeft: PADDING.sm }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: DIMENSIONS.fullWidth * 0.11,
        marginTop: PADDING.sm,
        borderWidth: 1,
        padding: PADDING.sm,
        borderRadius: 8,
        zIndex: 5,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switchContainer: {
        flexDirection: 'row',
        gap: PADDING.sm,
        alignItems: 'center',
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: FONTS.md,
    },
    additionalText: {
        fontSize: FONTS.m,
    },
});
