import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { CustomButton } from '../../UI/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { SessionObjectInterface, UserContext } from '../../../store/user-context';
import { TimerSettingsContext } from '../../../store/timer-settings-context';
import uuid from 'react-native-uuid';
import { AddSessionModal } from './AddNewSessionModal';

interface ManageSessionModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const ManageSessionModal = ({ showModal, onClose }: ManageSessionModalProps) => {
    const { timerSettings, updateSettings } = useContext(TimerSettingsContext);
    const { isLoaded, sessions, updateUser } = useContext(UserContext);
    const [showAddSessionModal, setShowAddSessionModal] = useState(false);
    const getColor = useColors();
    const translate = useTranslation();

    const onAddNewSessionHandler = (sessionName: string) => {
        const trimmedSessionName = sessionName.trim();

        const newSession: SessionObjectInterface = {
            name: trimmedSessionName,
            cube: timerSettings.cube,
            id: uuid.v4().toString(),
            lastUsed: Date.now(),
        };

        updateUser({ sessions: [newSession] });
        updateSettings({ session: newSession.id });

        onClose();
    };

    useEffect(() => {
        if (isLoaded) {
            const currentCubeSessions = sessions.filter(session => session.cube === timerSettings.cube);

            if (currentCubeSessions.length > 0) {
                const lastUsedSession = currentCubeSessions.reduce((maxObject, currentObject) => {
                    return currentObject.lastUsed > maxObject.lastUsed ? currentObject : maxObject;
                }, currentCubeSessions[0]);
                updateSettings({ session: lastUsedSession.id });
                return;
            }

            const newSession: SessionObjectInterface = {
                name: translate('defaultSessionName'),
                cube: timerSettings.cube,
                id: uuid.v4().toString(),
                lastUsed: Date.now(),
            };

            updateUser({ sessions: [newSession] });
            updateSettings({ session: newSession.id });
        }
    }, [isLoaded, timerSettings.cube]);

    return (
        <>
            <CustomModal isVisible={showModal} onClose={onClose} size="lg" showCloseX={false}>
                <View style={styles.topContainer}>
                    <Text style={styles.modalTitle}>{translate('manageSessionsTitle')}</Text>
                    <CustomButton type="primary" onPress={() => setShowAddSessionModal(true)}>
                        <View style={styles.addButtonContainer}>
                            <Ionicons name="add-outline" size={FONTS.lg} color={getColor('text')} />
                            <Text style={[styles.buttonText, { color: getColor('text') }]}>{translate('add')}</Text>
                        </View>
                    </CustomButton>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={sessions.filter(session => session.cube === timerSettings.cube)}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Text>{item.name}</Text>}
                    />
                </View>
                <View style={[styles.footer, { borderTopColor: getColor('gray100') }]}>
                    <Text style={[styles.footerText, { color: getColor('gray100') }]}> {translate('holdToEdit')}</Text>
                </View>
            </CustomModal>
            <AddSessionModal
                showModal={showAddSessionModal}
                onClose={() => setShowAddSessionModal(false)}
                onAddSession={onAddNewSessionHandler}
            />
        </>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: PADDING.md,
    },
    modalTitle: {
        fontSize: FONTS.lg,
        fontWeight: 'bold',
    },
    addButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: PADDING.sm,
    },
    footer: {
        marginTop: PADDING.md,
        borderTopWidth: 1,
        width: '100%',
    },
    footerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: PADDING.sm,
    },
    listContainer: {
        width: '100%',
        maxHeight: DIMENSIONS.fullHeight * 0.6,
    },
    buttonText: {
        fontWeight: 'bold',
    },
});
