import { View, Modal, StyleSheet, Text, Pressable } from 'react-native';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { CustomModalButton } from './CustomModalButton';
import { CustomModalButtonContainer } from './CustomModalButtonContainer';
import { IconButton } from '../IconButton';

interface CustomModalProps {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseX?: boolean;
}

export const CustomModal = ({
    isVisible,
    onClose,
    children,
    title,
    size = 'md',
    showCloseX = false,
}: CustomModalProps) => {
    const getColor = useColors();

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <Pressable onPress={() => onClose()}>
                <View
                    style={[styles.backdropGradient, { backgroundColor: getColor('background'), opacity: 0.9 }]}
                ></View>
            </Pressable>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, styles[size], { backgroundColor: getColor('background') }]}>
                    {showCloseX && (
                        <IconButton
                            size={FONTS.xl}
                            color={getColor('gray100')}
                            icon="close"
                            onPress={onClose}
                            style={styles.closeButton}
                        />
                    )}
                    {title && <Text style={[styles.modalTitle, { color: getColor('text') }]}>{title}</Text>}
                    {children}
                </View>
            </View>
        </Modal>
    );
};

CustomModal.Button = CustomModalButton;
CustomModal.ButtonsContainer = CustomModalButtonContainer;

const styles = StyleSheet.create({
    sm: {
        height: 'auto',
        width: DIMENSIONS.fullWidth * 0.4,
    },
    md: {
        height: 'auto',
        width: DIMENSIONS.fullWidth * 0.6,
    },
    lg: {
        height: 'auto',
        width: DIMENSIONS.fullWidth * 0.9,
    },
    xl: {
        height: DIMENSIONS.fullHeight * 0.85,
        width: DIMENSIONS.fullWidth * 0.95,
    },
    backdropGradient: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: DIMENSIONS.fullHeight,
        width: DIMENSIONS.fullWidth,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PADDING.micro,
        position: 'relative',
    },
    modalView: {
        margin: PADDING.micro,
        backgroundColor: 'white',
        borderRadius: PADDING.micro,
        padding: PADDING.md,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: FONTS.lg,
        fontWeight: 'bold',
        marginBottom: PADDING.md,
        alignSelf: 'flex-start',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: PADDING.sm,
    },
});
