import { StyleSheet, FlatList, Text, View, Pressable } from 'react-native';
import { CustomModal } from './UI/modal/CustomModal';
import { DIMENSIONS, FONTS } from '../styles/base';
import { useColors } from '../hooks/useColors';

import { SettingItem } from './timerSettingsModal/SettingItem';

interface ListSelectModalProps {
    showModal: boolean;
    onClose: () => void;
    onSelect: (item: string) => void;
    optionsList: string[];
    currentItem: string;
    modalTitle: string;
    listNameRender: (arg: string) => string;
}

export const ListSelectModal = ({
    showModal,
    onClose,
    onSelect,
    currentItem,
    optionsList,
    modalTitle,
    listNameRender,
}: ListSelectModalProps) => {
    const getColor = useColors();

    const ListItem = ({ itemName }: { itemName: string }) => (
        <Pressable onPress={() => onSelect(itemName)}>
            <SettingItem>
                <View>
                    <Text
                        style={[
                            styles.itemName,
                            { color: currentItem === itemName ? getColor('primary200') : getColor('text') },
                        ]}
                    >
                        {listNameRender(itemName)}
                    </Text>
                </View>
            </SettingItem>
        </Pressable>
    );

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={modalTitle} size="md">
            <FlatList
                data={optionsList}
                keyExtractor={item => item[0]}
                renderItem={({ item }) => <ListItem itemName={item} />}
            />
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    itemName: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: DIMENSIONS.fullWidth * 0.5,
        fontSize: FONTS.md,
    },
});
