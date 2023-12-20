import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useState } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { AddSessionModal } from './AddNewSessionModal';
import { Session } from '../../../models/realm-models/SessionSchema';
import { ChangeSessionNameModal } from './ChangeSessionNameModal';
import { useTimerSettingsStore } from '../../../store/timerSettingsStore';
import { addSession, editSession } from '../../../models/utils';
import { useRealm, useUser } from '@realm/react';
import { Realm } from 'realm/dist/bundle';
import { useSessions } from '../../../hooks/useSessions';
import { useCurrentSession } from '../../../hooks/useCurrentSession';

interface ManageSessionModalProps {
    showModal: boolean;
    onClose: () => void;
}

const SessionModalItem = ({
    session,
    realm,
    isSelected,
    onPress,
}: {
    session: Session;
    realm: Realm;
    isSelected: boolean;
    onPress: (id: string) => void;
}) => {
    const [showEditSessionModal, setShowEditSessionModal] = useState(false);
    const getColor = useColors();

    const onEditSessionName = (sessionName: string) => {
        const trimmedSessionName = sessionName.trim();

        if (trimmedSessionName.length > 0) {
            editSession(session, { name: trimmedSessionName }, realm);
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
                onLongPress={() => setShowEditSessionModal(true)}
                onPress={() => onPress(session._id.toString())}
            >
                <View style={[styles.listItem]}>
                    <View style={[styles.listIndicatorContainer]}>
                        <View
                            style={[
                                styles.listIndicator,
                                {
                                    backgroundColor: isSelected ? getColor('primary600') : getColor('gray500'),
                                    ...(isSelected ? {} : { border: 2, borderColor: getColor('gray800') }),
                                },
                            ]}
                        />
                    </View>
                    <Text style={[styles.listText, { color: isSelected ? getColor('primary600') : getColor('text') }]}>
                        {session.name}
                    </Text>
                </View>
            </Pressable>
        </>
    );
};

export const ManageSessionModal = ({ showModal, onClose }: ManageSessionModalProps) => {
    const cube = useTimerSettingsStore(state => state.cube);
    const [showAddSessionModal, setShowAddSessionModal] = useState(false);
    const currentSession = useCurrentSession();
    const [currentlySelected, setCurrentlySelected] = useState<string>(currentSession?._id.toString() ?? '');
    const trans = useTranslation();
    const user = useUser();

    const realm = useRealm();
    const sessions = useSessions();

    const onAddNewSessionHandler = (sessionName: string) => {
        const trimmedSessionName = sessionName.trim();

        if (trimmedSessionName.length === 0) {
            return;
        }
        const newSession = addSession(trimmedSessionName, cube, user.id, realm);

        onPickSessionHandler(newSession._id.toString());
    };

    const onPickSessionHandler = (id: string) => {
        setShowAddSessionModal(false);
        setCurrentlySelected(id);
    };

    const onSelectSession = () => {
        if (currentlySelected === currentSession._id.toString()) {
            onClose();
        }

        const sessionToSelect = sessions.find(session => session._id.toString() === currentlySelected);

        if (sessionToSelect) {
            editSession(sessionToSelect, { used: new Date() }, realm);
        }

        onClose();
    };

    return (
        <>
            <CustomModal
                isVisible={showModal}
                onClose={onClose}
                size="lg"
                showCloseX={false}
                subtitle={trans('manageSessionsSubtitle')}
                title={trans('manageSessionsTitle')}
            >
                <View style={styles.listContainer}>
                    <FlatList
                        data={sessions}
                        keyExtractor={item => item._id.toString()}
                        renderItem={({ item }) => (
                            <SessionModalItem
                                session={item}
                                onPress={onPickSessionHandler}
                                isSelected={currentlySelected === item._id.toString()}
                                realm={realm}
                            />
                        )}
                    />
                </View>
                <CustomModal.ButtonsContainer>
                    <CustomModal.Button type="primary" onPress={onSelectSession} title={trans('select')} />
                    <CustomModal.Button
                        type="secondary"
                        onPress={() => setShowAddSessionModal(true)}
                        title={trans('add')}
                    />
                    <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
                </CustomModal.ButtonsContainer>
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
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: PADDING.md,
    },
    listContainer: {
        width: '100%',
        maxHeight: DIMENSIONS.fullHeight * 0.6,
    },
    listItem: {
        width: '100%',
        textAlign: 'left',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: PADDING.m,
        flexDirection: 'row',
        paddingLeft: PADDING.m,
    },
    listText: {
        fontSize: FONTS.m,
    },
    listIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
    },
    listIndicator: {
        width: 22,
        height: 22,
        overflow: 'hidden',
        borderRadius: 99999,
        marginRight: PADDING.m,
    },
});
