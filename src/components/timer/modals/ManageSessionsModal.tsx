import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { CustomButton } from '../../UI/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import { AddSessionModal } from './AddNewSessionModal';

import { Session } from '../../../models/realm-models/SessionSchema';
import { ChangeSessionNameModal } from './ChangeSessionNameModal';
import { useTimerSettingsStore } from '../../../store/timerSettingsStore';
import { addSession, editSession } from '../../../models/utils';
import { useQuery, useRealm, useUser } from '@realm/react';

interface ManageSessionModalProps {
    showModal: boolean;
    onClose: () => void;
}

const SessionModalItem = ({
    session,
    onPickSessionHandler,
}: {
    session: Session;
    onPickSessionHandler: () => void;
}) => {
    const [showEditSessionModal, setShowEditSessionModal] = useState(false);
    const getColor = useColors();

    const onEditSessionName = (sessionName: string) => {
        const trimmedSessionName = sessionName.trim();

        if (trimmedSessionName.length > 0) {
            editSession(session, { name: trimmedSessionName });
        }
    };

    return (
        <>
            {showEditSessionModal && (
                <ChangeSessionNameModal
                    onChangeName={onEditSessionName}
                    onClose={() => setShowEditSessionModal(false)}
                    showModal={showEditSessionModal}
                    currentName={session.name}
                />
            )}
            <Pressable
                onPress={() => {
                    editSession(session, { used: new Date() });
                    onPickSessionHandler();
                }}
                onLongPress={() => setShowEditSessionModal(true)}
            >
                <View style={[styles.listItem, { borderBottomColor: getColor('gray100') }]}>
                    <Text style={[styles.listText, { color: getColor('text') }]}>{session.name}</Text>
                </View>
            </Pressable>
        </>
    );
};

export const ManageSessionModal = ({ showModal, onClose }: ManageSessionModalProps) => {
    const cube = useTimerSettingsStore(state => state.cube);
    const [showAddSessionModal, setShowAddSessionModal] = useState(false);
    const getColor = useColors();
    const trans = useTranslation();
    const user = useUser();

    const realm = useRealm();
    const sessions = useQuery(Session, collection => collection.filtered('cube == $0', cube), [cube]);

    const onAddNewSessionHandler = (sessionName: string) => {
        const trimmedSessionName = sessionName.trim();

        if (trimmedSessionName.length === 0) {
            return;
        }

        addSession(trimmedSessionName, cube, user.id);

        onPickSessionHandler();
    };

    const onPickSessionHandler = () => {
        setShowAddSessionModal(false);
        onClose();
    };

    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(sessions);
        });
    }, [realm, sessions, cube]);

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
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item }) => (
                            <SessionModalItem session={item} onPickSessionHandler={onPickSessionHandler} />
                        )}
                    />
                </View>
                <View style={[styles.footer, { borderTopColor: getColor('primary200') }]}>
                    <Text style={[styles.footerText, { color: getColor('gray100') }]}>
                        {trans('pressToPick')}
                        {'  /  '}
                        {trans('holdToEdit')}
                    </Text>
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
    listItem: {
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: PADDING.sm,
        borderBottomWidth: 1,
    },
    listText: {
        fontWeight: 'bold',
        fontSize: FONTS.md,
    },
});
