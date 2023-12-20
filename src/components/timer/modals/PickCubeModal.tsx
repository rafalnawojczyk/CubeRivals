import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import { CustomModal } from '../../UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../../../styles/base';
import { useTranslation } from '../../../hooks/useTranslation';
import { CUBES_DATA } from '../../../constants/CubesData';
import { CubeDataInterface, CubeType } from '../../../models/cubes';
import { useColors } from '../../../hooks/useColors';
import { useTimerSettingsStore } from '../../../store/timerSettingsStore';
import { useState } from 'react';

interface PickCubeModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const PickCubeModal = ({ showModal, onClose }: PickCubeModalProps) => {
    const { updateSettings, cube } = useTimerSettingsStore(state => ({
        updateSettings: state.updateSettings,
        cube: state.cube,
    }));
    const [selectedCube, setSelectedCube] = useState(cube);
    const trans = useTranslation();
    const getColor = useColors();

    const onPickCubeHandler = (id: CubeType) => {
        updateSettings({ cube: id });

        onClose();
    };

    const RenderCubeItem = ({ item }: { item: CubeDataInterface }) => {
        return (
            <Pressable
                onPress={() => setSelectedCube(item.id)}
                style={[
                    styles.cubeItem,
                    {
                        backgroundColor: getColor('gray800'),
                        ...(selectedCube === item.id
                            ? { borderWidth: 6, borderColor: getColor('primary600'), padding: 6 }
                            : {}),
                    },
                ]}
            >
                <Text
                    style={[
                        styles.cubeText,
                        { color: selectedCube === item.id ? getColor('primary600') : getColor('text') },
                    ]}
                >
                    {item.fullName}
                </Text>
            </Pressable>
        );
    };

    return (
        <CustomModal
            isVisible={showModal}
            onClose={onClose}
            title={trans('selectPuzzle')}
            size="lg"
            subtitle={trans('selectPuzzleSubtitle')}
        >
            <View style={{ maxHeight: DIMENSIONS.fullHeight * 0.4 }}>
                <FlatList
                    data={CUBES_DATA}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    renderItem={({ item }) => <RenderCubeItem item={item} />}
                    contentContainerStyle={{ gap: PADDING.m }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
            </View>

            <CustomModal.ButtonsContainer>
                <CustomModal.Button
                    type="primary"
                    onPress={() => onPickCubeHandler(selectedCube)}
                    title={trans('select')}
                />
                <CustomModal.Button type="cancel" onPress={onClose} title={trans('cancel')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    cubeItem: {
        width: '30%',
        height: 'auto',
        aspectRatio: 1 / 1,
        padding: PADDING.sm,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cubeText: {
        fontSize: FONTS.m,
        textAlign: 'center',
        fontFamily: 'robotoMono-medium',
    },
});
