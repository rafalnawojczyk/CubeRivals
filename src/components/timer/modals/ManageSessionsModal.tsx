import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useState, useContext } from 'react';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { CustomButton } from '../../UI/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import { TimerSettingsContext } from '../../../store/timer-settings-context';
import { AddSessionModal } from './AddNewSessionModal';
import { ChangeSessionNameModal } from './ChangeSessionNameModal';
import { createSession, getDb } from '../../../model/database';
import { Model, Q } from '@nozbe/watermelondb';
import { Session } from '../../../model/session.model';
import { withObservables } from '@nozbe/watermelondb/react';

interface ManageSessionModalProps {
    sessions: Model[];
    showModal: boolean;
    onClose: () => void;
}

const SessionModalItem = ({
    session,
    onPickSessionHandler,
    blockPickHandler = false,
}: {
    session: Session;
    onPickSessionHandler: () => void;
    blockPickHandler: boolean;
}) => {
    const [showEditSessionModal, setShowEditSessionModal] = useState(false);
    const getColor = useColors();

    const onEditSessionName = async (sessionName: string) => {
        const trimmedSessionName = sessionName.trim();

        if (trimmedSessionName.length > 0) {
            await getDb().write(async () => {
                await session.update(() => {
                    session.name = trimmedSessionName;
                });
            });
        }
    };

    const onPickSession = async () => {
        await getDb().write(async () => {
            await session.update(() => {
                session.lastSeenAt = new Date();
            });
        });
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
                    if (!blockPickHandler) {
                        onPickSession();
                    }
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

const ManageSessionModal = ({ showModal, onClose, sessions }: ManageSessionModalProps) => {
    const { timerSettings } = useContext(TimerSettingsContext);
    const [showAddSessionModal, setShowAddSessionModal] = useState(false);
    const getColor = useColors();
    const trans = useTranslation();

    const onAddNewSessionHandler = (sessionName: string) => {
        const trimmedSessionName = sessionName.trim();

        if (trimmedSessionName.length === 0) {
            return;
        }

        createSession(trimmedSessionName, timerSettings.cube);

        onPickSessionHandler();
    };

    const onPickSessionHandler = () => {
        setShowAddSessionModal(false);
        onClose();
    };

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
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <SessionModalItem
                                blockPickHandler={index === 0}
                                session={item as Session}
                                onPickSessionHandler={onPickSessionHandler}
                            />
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

const enhance = withObservables(['sessions', 'cube'], ({ sessions, cube }) => ({
    sessions: getDb()
        .collections.get('sessions')
        .query(Q.where('cube', Q.like(`%${cube}%`)), Q.sortBy('last_seen_at', Q.desc)),
}));

export const EnhancedManageSessionModal = enhance(ManageSessionModal);
