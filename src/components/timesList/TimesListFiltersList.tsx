import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { TimesListFilterObj } from './TimesList';
import { useTranslation } from '../../hooks/useTranslation';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { Dispatch } from 'react';
import { IconButton } from '../UI/IconButton';

export const TimesListFiltersList = ({
    filters,
    setFilters,
}: {
    filters: TimesListFilterObj;
    setFilters: Dispatch<React.SetStateAction<TimesListFilterObj>>;
}) => {
    const trans = useTranslation();
    const getColor = useColors();

    const transMap: any = {
        createdAt: trans('date'),
        inspection: trans('inspectionTime'),
        time: trans('time'),
        starred: trans('timesList.starredOnly'),
        desc: trans('descending'),
        asc: trans('ascending'),
    };

    const dataToRender = [filters.filter, filters.starred ? 'starred' : null].filter(el => !!el) as string[];

    const renderFilterTile = (item: string) => {
        const onPressHandler = () => {
            if (item === 'starred') {
                setFilters(prev => {
                    const newFilters = { ...prev };
                    delete newFilters.starred;

                    return newFilters;
                });
            } else {
                setFilters(prev => {
                    const newFilters = { ...prev };
                    delete newFilters.filter;
                    delete newFilters.order;

                    return newFilters;
                });
            }
        };

        return (
            <Pressable style={[styles.item, { borderColor: getColor('accentLight') }]} onPress={onPressHandler}>
                <IconButton
                    icon="close"
                    size={FONTS.lg}
                    color={getColor('error')}
                    style={{ flex: 1 }}
                    onPress={onPressHandler}
                />
                <Text style={[styles.itemText, { color: getColor('gray100') }]}>{`${transMap[item]}${
                    item !== 'starred' ? `: ${transMap[filters.order!].toLowerCase()}` : ''
                }`}</Text>
            </Pressable>
        );
    };

    return (
        <>
            {filters.filter || filters.starred ? (
                <FlatList
                    style={styles.container}
                    horizontal
                    data={dataToRender}
                    contentContainerStyle={{ gap: PADDING.md, justifyContent: 'center' }}
                    renderItem={({ item }) => renderFilterTile(item)}
                />
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    container: { maxHeight: DIMENSIONS.fullWidth * 0.1, marginTop: PADDING.sm },
    item: {
        paddingVertical: 4,
        paddingHorizontal: PADDING.md,
        borderWidth: 1,
        borderRadius: 50000,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
    },
    itemText: {
        fontWeight: 'bold',
        fontSize: FONTS.m,
    },
});
