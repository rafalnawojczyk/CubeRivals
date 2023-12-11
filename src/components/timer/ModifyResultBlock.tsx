import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Result } from '../../models/result';
import { AddNoteModal } from './modals/AddNoteModal';
import { IconButton } from '../UI/IconButton';
import { FONTS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { RemoveConfirmModal } from './modals/RemoveConfirmModal';
import { Solve } from '../../models/realm-models/SolveSchema';
import { useTranslation } from '../../hooks/useTranslation';
import { deleteSolve, editSolve } from '../../models/utils';
import { useCurrentSession } from '../../hooks/useCurrentSession';

export type ButtonName = 'remove' | 'dnf' | '+2' | 'note' | 'star';

interface ModifyButton {
    name: ButtonName;
    activeIcon?: keyof typeof MaterialIcons.glyphMap;
    icon: keyof typeof MaterialIcons.glyphMap;
}

export const buttonsMap: ModifyButton[] = [
    {
        name: 'remove',
        icon: 'delete-forever',
    },
    {
        name: 'dnf',
        icon: 'warning',
    },
    {
        name: '+2',
        icon: 'outlined-flag',
    },
    {
        name: 'note',
        icon: 'chat',
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

    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getColor = useColors();
    const trans = useTranslation();

    const handleConfirmDeleteSolve = () => {
        if (solve) {
            setShowDeleteModal(false);
            deleteSolve(solve, currentSession);
            onDelete();
        }
    };

    const addCommentHandler = (comment: string) => {
        const commentTrimmed = comment.trim();

        if (commentTrimmed.length > 0) {
            setSolveResult(prev => ({ ...prev, note: comment }));
            if (solve) {
                editSolve(solve, { note: commentTrimmed }, currentSession);
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
                    editSolve(solve, { flag: undefined }, currentSession);
                }
                return;
            }

            setSolveResult(prev => ({ ...prev, flag: 'dnf' }));

            if (solve) {
                editSolve(solve, { flag: 'dnf' }, currentSession);
            }
        }

        if (name === '+2') {
            if (solve?.flag === '+2') {
                setSolveResult(prev => ({ ...prev, flag: undefined }));

                if (solve) {
                    editSolve(solve, { flag: undefined }, currentSession);
                }
                return;
            }

            setSolveResult(prev => ({ ...prev, flag: '+2' }));

            if (solve) {
                editSolve(solve, { flag: '+2' }, currentSession);
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

                editSolve(solve, { star: newStarValue }, currentSession);
            }
        }
    };

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
                        <IconButton
                            key={button.name}
                            onPress={() => onButtonPress(button.name)}
                            icon={button.icon}
                            size={FONTS.lg}
                            color={getColor('gray100')}
                        />
                    ))}
                    <IconButton
                        key="star"
                        onPress={() => onButtonPress('star')}
                        icon={solve?.star ? 'star-rate' : 'star-border'}
                        size={FONTS.lg}
                        color={solve?.star ? getColor('primary200') : getColor('gray100')}
                    />
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
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
