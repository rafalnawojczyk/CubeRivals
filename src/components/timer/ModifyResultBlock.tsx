import { StyleSheet, View } from 'react-native';
import { useState, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Result } from '../../models/result';
import { AddNoteModal } from './modals/AddNoteModal';
import { IconButton } from '../UI/IconButton';
import { FONTS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { RemoveResultConfirmModal } from './modals/RemoveResultConfirmModal';
import { Solve } from '../../models/realm-models/SolveSchema';
import { SolvesContext } from '../../store/solves-context';

export type ButtonName = 'remove' | 'dnf' | '+2' | 'note';

interface ModifyButton {
    name: ButtonName;
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
}: {
    setSolveResult: React.Dispatch<React.SetStateAction<Result>>;
    showDelete?: boolean;
    solve?: Solve;
}) => {
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { deleteSolve, editSolve } = useContext(SolvesContext);
    const getColor = useColors();

    const handleConfirmDeleteSolve = () => {
        if (solve) {
            deleteSolve(solve);
        }
    };

    const addCommentHandler = (comment: string) => {
        const commentTrimmed = comment.trim();

        if (commentTrimmed.length > 0) {
            setSolveResult(prev => ({ ...prev, note: comment }));
            if (solve) {
                editSolve(solve, { note: commentTrimmed });
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
                    editSolve(solve, { flag: undefined });
                }
                return;
            }

            setSolveResult(prev => ({ ...prev, flag: 'dnf' }));

            if (solve) {
                editSolve(solve, { flag: 'dnf' });
            }
        }

        if (name === '+2') {
            if (solve?.flag === '+2') {
                setSolveResult(prev => ({ ...prev, flag: undefined }));

                if (solve) {
                    editSolve(solve, { flag: undefined });
                }
                return;
            }

            setSolveResult(prev => ({ ...prev, flag: '+2' }));

            if (solve) {
                editSolve(solve, { flag: '+2' });
            }
        }

        if (name === 'remove') {
            setShowDeleteModal(true);
        }
    };

    const buttonsToRender = showDelete ? buttonsMap : buttonsMap.filter(button => button.name !== 'remove');

    return (
        <>
            <RemoveResultConfirmModal
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

// TODO: +2 / DNF  should show updated time on screen with option to revert changes and back to measured time state with refresh-outline but flipped horizontally?
