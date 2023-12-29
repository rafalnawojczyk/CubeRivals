import { StyleSheet, TextInput, View, Text, Pressable } from 'react-native';
import { useRef, useState } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { ButtonName, ModifyResultBlock, buttonsMap } from '../ModifyResultBlock';
import { formatNumberInput } from '../../../utils/formatNumberInput';
import { CheckBox } from '../../UI/Checkbox';
import { Result } from '../../../models/result';
import { ResultIconButton } from '../ResultIconButton';
import { Solve } from '../../../models/realm-models/SolveSchema';
import { AddNoteModal } from './AddNoteModal';

interface AddTimeModalProps {
    showModal: boolean;
    onClose: () => void;
    onAddTime: (result: Result, saveScramble: boolean) => void;
}

export const AddTimeModal = ({ showModal, onClose, onAddTime }: AddTimeModalProps) => {
    const [time, setTime] = useState('');
    const [saveScramble, setSaveScramble] = useState(true);
    const [result, setResult] = useState<Result>({ time: 0, scramble: '' });
    const [showNoteModal, setShowNoteModal] = useState(false);
    const getColor = useColors();
    const trans = useTranslation();
    const inputRef = useRef(null);

    const handleSolveModifiers = (name: ButtonName) => {
        if (name === '+2') {
            setResult(prev => ({ ...prev, flag: '+2' }));
            return;
        }

        if (name === 'dnf') {
            setResult(prev => ({ ...prev, flag: 'dnf' }));
            return;
        }

        if (name === 'star') {
            setResult(prev => ({ ...prev, star: !prev.star }));
            return;
        }

        if (name === 'note') {
            setShowNoteModal(true);
        }
    };

    return (
        <>
            <AddNoteModal
                onAddNote={note => {
                    setResult(prev => ({ ...prev, note }));
                    setShowNoteModal(false);
                }}
                showModal={showNoteModal}
                currentNote={result.note ? result.note : ''}
                onClose={() => setShowNoteModal(false)}
            />
            <CustomModal
                isVisible={showModal}
                onClose={onClose}
                subtitle={trans('addTimeDesc')}
                title={trans('addTime')}
                size="lg"
            >
                <View style={styles.textInputContainer}>
                    <TextInput
                        ref={inputRef}
                        value={time}
                        onChangeText={setTime}
                        style={[styles.textInput]}
                        textAlignVertical="top"
                        keyboardType="decimal-pad"
                        autoFocus={true}
                    />
                    <Pressable
                        onPress={() => {
                            //@ts-ignore
                            inputRef?.current?.focus();
                        }}
                    >
                        <View
                            style={[
                                styles.textContainer,
                                {
                                    borderColor: getColor('accentLight'),
                                },
                            ]}
                        >
                            <Text style={[styles.time, { color: getColor('text') }]}>{formatNumberInput(time)}</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.iconsContainer}>
                    {buttonsMap
                        .filter(el => el.name !== 'remove')
                        .map(button => (
                            <ResultIconButton
                                isActive={!!button?.condition?.(result as Solve)}
                                onPress={handleSolveModifiers}
                                button={button}
                            />
                        ))}
                </View>
                <ModifyResultBlock setSolveResult={setResult} showDelete={false} onDelete={() => {}} />

                <View style={styles.scrambleBlock}>
                    <CheckBox isChecked={saveScramble} onPress={() => setSaveScramble(prev => !prev)} />
                    <Pressable onPress={() => setSaveScramble(prev => !prev)}>
                        <Text
                            style={[
                                styles.scramble,
                                { color: saveScramble ? getColor('primary600') : getColor('gray500') },
                            ]}
                        >
                            {trans('useThisScramble')}
                        </Text>
                    </Pressable>
                </View>
                <CustomModal.ButtonsContainer>
                    <CustomModal.Button
                        type="primary"
                        onPress={() => {
                            const resultObj: any = { time: +(time + '0') };
                            if (result.flag) {
                                resultObj.flag = result.flag;
                            }

                            if (result.note) {
                                resultObj.note = result.note;
                            }
                            onAddTime(resultObj, saveScramble);
                            setTime('');
                            setResult({ time: 0, scramble: '' });
                        }}
                        title={trans('addTime')}
                    />
                    <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')}></CustomModal.Button>
                </CustomModal.ButtonsContainer>
            </CustomModal>
        </>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        position: 'absolute',
        opacity: 0,
        borderRadius: 2,
    },
    time: {
        width: '100%',
        fontSize: FONTS.xl,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInputContainer: {
        width: '100%',
    },
    textContainer: {
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: PADDING.lg,
        paddingVertical: PADDING.micro,
        borderRadius: 9999,
        minWidth: 150,
    },
    scrambleBlock: {
        width: '100%',
        marginBottom: PADDING.sm,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: FONTS.sm,
        justifyContent: 'flex-start',
    },
    scramble: {
        fontSize: FONTS.m,
        marginLeft: 4,
    },
    iconsContainer: {
        gap: PADDING.m,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: PADDING.m,
    },
});
