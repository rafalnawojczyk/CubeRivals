import { Pressable, StyleSheet, View } from 'react-native';
import { ReactNode, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Result } from '../../models/result';
import { AddNoteModal } from './modals/AddNoteModal';
import { useColors } from '../../hooks/useColors';
import { RemoveConfirmModal } from './modals/RemoveConfirmModal';
import { Solve } from '../../models/realm-models/SolveSchema';
import { useTranslation } from '../../hooks/useTranslation';
import { deleteSolve, editSolve } from '../../models/utils';
import { useCurrentSession } from '../../hooks/useCurrentSession';
import { useRealm } from '@realm/react';
import TrashIcon from '../../assets/icons/TrashIcon';
import WarningIcon from '../../assets/icons/WarningIcon';
import FlagIcon from '../../assets/icons/FlagIcon';
import CommentIcon from '../../assets/icons/CommentIcon';
import StarIcon from '../../assets/icons/StarIcon';
import { PADDING } from '../../styles/base';

export type ButtonName = 'remove' | 'dnf' | '+2' | 'note' | 'star';

interface ModifyButton {
    name: ButtonName;
    activeIcon?: keyof typeof MaterialIcons.glyphMap;
    icon: (color: string) => ReactNode;
    condition?: (solve: Solve) => boolean;
}

export const buttonsMap: ModifyButton[] = [
    {
        name: 'remove',
        icon: color => <TrashIcon color={color} />,
    },
    {
        name: 'dnf',
        icon: color => <WarningIcon color={color} />,
        condition: (solve: Solve) => solve.flag === 'dnf',
    },
    {
        name: '+2',
        icon: color => <FlagIcon color={color} />,
        condition: (solve: Solve) => solve.flag === '+2',
    },
    {
        name: 'note',
        icon: color => <CommentIcon color={color} />,
        condition: (solve: Solve) => !!solve?.note?.length && solve.note.length > 0,
    },
];

export const ModifyResultBlock = ({
    setSolveResult,
    showDelete = true,
    solve,
    onDelete,
}: {
    setSolveResult: React.Dispatch<React.SetStateAction<Result>>;
    showDelete?: boolean;
    solve?: Solve;
    onDelete: () => void;
}) => {
    const currentSession = useCurrentSession();
    const realm = useRealm();
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getColor = useColors();
    const trans = useTranslation();

    const handleConfirmDeleteSolve = () => {
        if (solve) {
            setShowDeleteModal(false);
            deleteSolve(solve, currentSession, realm);
            onDelete();
        }
    };

    const addCommentHandler = (comment: string) => {
        const commentTrimmed = comment.trim();

        if (commentTrimmed.length > 0) {
            setSolveResult(prev => ({ ...prev, note: comment }));
            if (solve) {
                editSolve(solve, { note: commentTrimmed }, currentSession, realm);
            }
        }

        setShowCommentModal(false);
    };

    const onButtonPress = (name: ButtonName) => {
        if (name === 'note') {
            setShowCommentModal(true);
        }

        if (name === 'dnf') {
            if (solve?.flag === 'dnf') {
                setSolveResult(prev => ({ ...prev, flag: undefined }));

                if (solve) {
                    editSolve(solve, { flag: undefined }, currentSession, realm);
                }
                return;
            }

            setSolveResult(prev => ({ ...prev, flag: 'dnf' }));

            if (solve) {
                editSolve(solve, { flag: 'dnf' }, currentSession, realm);
            }
        }

        if (name === '+2') {
            if (solve?.flag === '+2') {
                setSolveResult(prev => ({ ...prev, flag: undefined }));

                if (solve) {
                    editSolve(solve, { flag: undefined }, currentSession, realm);
                }
                return;
            }

            setSolveResult(prev => ({ ...prev, flag: '+2' }));

            if (solve) {
                editSolve(solve, { flag: '+2' }, currentSession, realm);
            }
        }

        if (name === 'remove') {
            setShowDeleteModal(true);
        }

        if (name === 'star') {
            let newStarValue;

            setSolveResult(prev => {
                newStarValue = prev.star ? !prev.star : true;

                return { ...prev, star: newStarValue };
            });

            if (solve) {
                if (newStarValue === undefined) {
                    newStarValue = solve?.star ? !solve.star : true;
                }

                editSolve(solve, { star: newStarValue }, currentSession, realm);
            }
        }
    };

    if (!solve || !solve.isValid()) return null;

    const buttonsToRender = showDelete ? buttonsMap : buttonsMap.filter(button => button.name !== 'remove');

    return (
        <>
            <RemoveConfirmModal
                confirmTitle={trans('delete')}
                title={trans('removeSolveTitle')}
                showModal={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDeleteSolve}
            />
            <AddNoteModal
                showModal={showCommentModal}
                onAddNote={addCommentHandler}
                onClose={() => setShowCommentModal(false)}
                currentNote={solve?.note ? solve.note : ''}
            />
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    {buttonsToRender.map(button => (
                        <View key={button.name} style={styles.iconsContainer}>
                            <Pressable onPress={() => onButtonPress(button.name)}>
                                {button.icon(
                                    button.condition?.(solve) ? getColor('primary600') : getColor('accentLight')
                                )}
                            </Pressable>
                        </View>
                    ))}
                    <View style={styles.iconsContainer}>
                        <Pressable onPress={() => onButtonPress('star')}>
                            <StarIcon color={solve?.star ? getColor('primary600') : getColor('accentLight')} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        gap: PADDING.m,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
});
