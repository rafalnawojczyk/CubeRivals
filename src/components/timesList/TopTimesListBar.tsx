import { Dispatch, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { IconButton } from '../UI/IconButton';
import { TimesListFilterObj } from './TimesList';
import { TimesListFiltersModal } from './TimesListFiltersModal/TimesListFiltersModal';
import { useTranslation } from '../../hooks/useTranslation';

interface TopTimesListBarProps {
    search: string;
    setSearch: Dispatch<React.SetStateAction<string>>;
    setFilters: Dispatch<React.SetStateAction<TimesListFilterObj>>;
    filters: TimesListFilterObj;
}

export const TopTimesListBar = ({ search, setSearch, setFilters, filters }: TopTimesListBarProps) => {
    const [showFilters, setShowFilters] = useState(false);
    const trans = useTranslation();
    const getColor = useColors();
    const inputRef = useRef(null);

    return (
        <>
            <View style={[styles.outerContainer, { borderColor: getColor('text') }]}>
                <View style={styles.container}>
                    <IconButton
                        icon="search"
                        size={FONTS.lg}
                        color={getColor('gray100')}
                        style={{ flex: 1 }}
                        onPress={() => {
                            //@ts-ignore
                            inputRef?.current?.focus();
                        }}
                    />
                    {search.length > 0 && (
                        <IconButton
                            icon="close"
                            size={FONTS.lg}
                            color={getColor('error')}
                            style={{ flex: 1 }}
                            onPress={() => setSearch('')}
                        />
                    )}
                    <TextInput
                        ref={inputRef}
                        style={[styles.textInput, { color: getColor('text') }]}
                        keyboardType="default"
                        value={search}
                        onChangeText={setSearch}
                        placeholder={trans('timesList.searchPlaceholder')}
                        placeholderTextColor={getColor('gray100')}
                    />
                    <IconButton
                        icon="filter-list-alt"
                        size={FONTS.lg}
                        color={getColor('gray100')}
                        style={{ flex: 1 }}
                        onPress={() => setShowFilters(prev => !prev)}
                    />
                </View>
            </View>
            <TimesListFiltersModal
                showModal={showFilters}
                onClose={() => setShowFilters(false)}
                setFilters={setFilters}
                currentFilters={filters}
            />
        </>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 8,
        borderWidth: 1,
        padding: PADDING.sm,
        gap: PADDING.sm,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        fontSize: FONTS.m,
        flex: 8,
    },
});
