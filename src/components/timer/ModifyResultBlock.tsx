import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Result } from '../../models/result';
import { AddNoteModal } from './AddNoteModal';
import { IconButton } from '../UI/IconButton';
import { FONTS } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { RemoveResultConfirmModal } from './RemoveResultConfirmModal';

export type ButtonName = 'remove' | 'dnf' | '+2' | 'note';

interface ModifyButton {
    name: ButtonName;
    icon: keyof typeof Ionicons.glyphMap;
}

const buttonsMap: ModifyButton[] = [
    {
        name: 'remove',
        icon: 'trash-bin-outline',
    },
    {
        name: 'dnf',
        icon: 'warning-outline',
    },
    {
        name: '+2',
        icon: 'flag-outline',
    },
    {
        name: 'note',
        icon: 'chatbox-outline',
    },
];

export const ModifyResultBlock = ({
    setSolveResult,
}: {
    setSolveResult: React.Dispatch<React.SetStateAction<Result>>;
}) => {
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const getColor = useColors();

    const handleConfirmDeleteSolve = () => {
        console.log('DELETE SOLVE');
    };

    const addCommentHandler = (comment: string) => {
        const commentTrimmed = comment.trim();

        if (commentTrimmed.length > 0) {
            setSolveResult(prev => ({ ...prev, note: comment }));
        }

        setShowCommentModal(false);
    };

    const onButtonPress = (name: ButtonName) => {
        if (name === 'note') {
            setShowCommentModal(true);
        }

        if (name === 'dnf') {
            setSolveResult(prev => ({ ...prev, flag: 'dnf' }));
        }

        if (name === '+2') {
            setSolveResult(prev => ({ ...prev, flag: '+2' }));
        }

        if (name === 'remove') {
            setShowDeleteModal(true);
        }
    };

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
            />
            <View style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    {buttonsMap.map(button => (
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

// +2 / DNF  should show updated time on screen with option to revert changes and back to measured time state with refresh-outline but flipped horizontally?
