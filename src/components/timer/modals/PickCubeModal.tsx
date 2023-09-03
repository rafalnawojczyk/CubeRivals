import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useColors } from '../../../hooks/useColors';
import { useTranslation } from '../../../hooks/useTranslation';
import { CUBES_DATA } from '../../../constants/CubesData';
import { CubeDataInterface, CubeType } from '../../../models/cubes';
import { useContext } from 'react';
import { TimerSettingsContext } from '../../../store/timer-settings-context';

interface PickCubeModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const PickCubeModal = ({ showModal, onClose }: PickCubeModalProps) => {
    const { updateSettings } = useContext(TimerSettingsContext);
    const getColor = useColors();
    const translate = useTranslation();

    const onPickCubeHandler = (id: CubeType) => {
        updateSettings({ cube: id });
        onClose();
    };

    const RenderCubeItem = ({ item }: { item: CubeDataInterface }) => {
        return (
            <Pressable onPress={() => onPickCubeHandler(item.id)} style={styles.cubeItem}>
                <View style={styles.cubeItem}>
                    <Image style={styles.cubeImage} source={item.icon} resizeMode="contain" />
                    <Text style={styles.cubeText}>{item.fullName}</Text>
                </View>
            </Pressable>
        );
    };

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={translate('selectPuzzle')} size="lg">
            <View style={{ maxHeight: DIMENSIONS.fullHeight * 0.6 }}>
                <FlatList
                    data={CUBES_DATA}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    renderItem={({ item }) => <RenderCubeItem item={item} />}
                />
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 2,
        minHeight: DIMENSIONS.fullHeight * 0.2,
        padding: PADDING.sm,
        fontSize: FONTS.md,
    },
    cubeItem: {
        width: DIMENSIONS.fullWidth * 0.25,
        padding: PADDING.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cubeImage: {
        width: DIMENSIONS.fullWidth * 0.1,
        height: DIMENSIONS.fullWidth * 0.1,
    },
    cubeText: {},
    cubesList: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cubeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
