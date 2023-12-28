import { StyleSheet, FlatList, Text, View, Pressable } from 'react-native';
import { CustomModal } from './UI/modal/CustomModal';
import { FONTS, PADDING } from '../styles/base';
import { useColors } from '../hooks/useColors';
import { useTranslation } from '../hooks/useTranslation';

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
    const trans = useTranslation();

    const ListItem = ({ itemName }: { itemName: string }) => {
        console.log(currentItem);
        console.log(itemName);
        const isSelected = currentItem === itemName;
        return (
            <Pressable onPress={() => onSelect(itemName)}>
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
                        {listNameRender(itemName)}
                    </Text>
                </View>
            </Pressable>
        );
    };

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={modalTitle} size="lg">
            <FlatList
                data={optionsList}
                style={{ width: '100%' }}
                keyExtractor={item => item[0]}
                renderItem={({ item }) => <ListItem itemName={item} />}
            />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button type="secondary" onPress={onClose} title={trans('cancel')} />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
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
