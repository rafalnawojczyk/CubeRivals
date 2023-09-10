import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { CustomButton } from '../../UI/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '../../../store/user-context';
import { TimerSettingsContext } from '../../../store/timer-settings-context';
import { AddSessionModal } from './AddNewSessionModal';
import { SolvesContext } from '../../../store/solves-context';
import { Session } from '../../../models/realm-models/SessionSchema';
import { BSON } from 'realm';

interface ManageSessionModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const ManageSessionModal = ({ showModal, onClose }: ManageSessionModalProps) => {
    const { timerSettings, updateSettings } = useContext(TimerSettingsContext);
    const { sessions, addSession } = useContext(SolvesContext);
    const { isLoaded } = useContext(UserContext);
    const [showAddSessionModal, setShowAddSessionModal] = useState(false);
    const getColor = useColors();
    const trans = useTranslation();

    const SessionModalItem = ({
        session,
        onPickSessionHandler,
    }: {
        session: Session;
        onPickSessionHandler: (id: BSON.ObjectId) => void;
    }) => {
        return (
            <Pressable onPress={() => onPickSessionHandler(session._id)}>
                <View>
                    <Text style={{ color: getColor('text') }}>{session.name}</Text>
                </View>
            </Pressable>
        );
    };

    const onAddNewSessionHandler = (sessionName: string) => {
        const trimmedSessionName = sessionName.trim();

        if (trimmedSessionName.length === 0) {
            return;
        }

        const newSessionId = addSession(trimmedSessionName, timerSettings.cube);

        onPickSessionHandler(newSessionId);
    };

    const onPickSessionHandler = (id: BSON.ObjectId) => {
        updateSettings({ session: id });
        setShowAddSessionModal(false);
        onClose();
    };

    useEffect(() => {
        if (isLoaded) {
            // if (sessions.length > 0) {
            //     // TODO: SHOULD SET CURRENT SESSION TO LAST USED SESSION
            //     // @ts-ignore
            //     const lastUsedSession = sessions.reduce((maxObject, currentObject) => {
            //         return currentObject.used > maxObject.used ? currentObject : maxObject;
            //     }, sessions[0]);
            //     updateSettings({ session: lastUsedSession._id });
            //     return;
            // }

            if (sessions.length === 0) {
                const newSessionId = addSession(trans('defaultSessionName'), timerSettings.cube);
                updateSettings({ session: newSessionId });
            }
        }
    }, [isLoaded, timerSettings.cube]);

    return (
        <>
            <CustomModal isVisible={showModal} onClose={onClose} size="lg" showCloseX={false}>
                <View style={styles.topContainer}>
                    <Text style={[styles.modalTitle, { color: getColor('text') }]}>{trans('manageSessionsTitle')}</Text>
                    <CustomButton type="primary" onPress={() => setShowAddSessionModal(true)}>
                        <View style={styles.addButtonContainer}>
                            <MaterialIcons name="my-library-add" size={FONTS.lg} color={getColor('text')} />
                            <Text style={[styles.buttonText, { color: getColor('text') }]}>{trans('add')}</Text>
                        </View>
                    </CustomButton>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={sessions}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <SessionModalItem session={item} onPickSessionHandler={onPickSessionHandler} />
                        )}
                    />
                </View>
                <View style={[styles.footer, { borderTopColor: getColor('gray100') }]}>
                    <Text style={[styles.footerText, { color: getColor('gray100') }]}> {trans('holdToEdit')}</Text>
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
