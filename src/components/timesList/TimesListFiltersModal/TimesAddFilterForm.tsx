import { View, StyleSheet } from 'react-native';
import { Dispatch, useEffect, useState } from 'react';
import { PADDING } from '../../../styles/base';
import DropDownPicker from 'react-native-dropdown-picker';
import { TimesListFilterObj, filterType } from '../TimesList';
import { useTranslation } from '../../../hooks/useTranslation';
import { SettingsSwitchItem } from '../../timerSettingsModal/SettingsSwitchItem';

interface TimesAddFilterFormProps {
    filters: TimesListFilterObj;
    setFilters: Dispatch<React.SetStateAction<TimesListFilterObj>>;
}

export const TimesAddFilterForm = ({ filters, setFilters }: TimesAddFilterFormProps) => {
    const trans = useTranslation();
    const [openPicker, setOpenPicker] = useState(false);
    const [openOrderPicker, setOpenOrderPicker] = useState(false);
    const [value, setValue] = useState<any>(filters.filter);
    const [orderValue, setOrderValue] = useState<any>(filters.order ?? 'asc');
    const [filterItems, setFilterItems] = useState<{ label: string; value: filterType }[]>([
        { label: trans('date'), value: 'createdAt' },
        { label: trans('time'), value: 'time' },
        { label: trans('inspectionTime'), value: 'inspection' },
    ]);
    const [filterOrder, setFilterOrder] = useState([
        { label: trans('ascending'), value: 'asc' },
        { label: trans('descending'), value: 'desc' },
    ]);

    useEffect(() => {
        if (value) {
            setFilters(prev => {
                const newFilterObj: TimesListFilterObj = {};

                if (prev.starred) {
                    newFilterObj.starred = prev.starred;
                }

                newFilterObj.filter = value;
                newFilterObj.order = orderValue;

                return newFilterObj;
            });
        }
    }, [value, orderValue]);

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <DropDownPicker
                    multiple={false}
                    placeholder={trans('timesList.pickFilter')}
                    value={value}
                    setValue={setValue}
                    open={openPicker}
                    setOpen={setOpenPicker}
                    items={filterItems}
                    setItems={setFilterItems}
                    zIndex={389001}
                    itemKey="value"
                />
            </View>
            {value && (
                <View>
                    <DropDownPicker
                        multiple={false}
                        placeholder={trans('timesList.pickSorting')}
                        value={orderValue}
                        setValue={setOrderValue}
                        open={openOrderPicker}
                        setOpen={setOpenOrderPicker}
                        items={filterOrder}
                        setItems={setFilterOrder}
                        zIndex={389000}
                        itemKey="value"
                    />
                </View>
            )}
            <SettingsSwitchItem
                title={trans('timesList.starredOnly')}
                value={!!filters.starred}
                onSwitch={() => setFilters(prev => ({ ...prev, starred: !prev.starred }))}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: PADDING.sm,
        width: '100%',
        alignItems: 'center',
        paddingVertical: PADDING.sm,
        paddingHorizontal: PADDING.md,
        zIndex: 99,
    },
});
