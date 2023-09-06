import { StyleSheet, FlatList, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import { CustomModal } from './UI/modal/CustomModal';
import { DIMENSIONS, FONTS, PADDING } from '../styles/base';
import { useColors } from '../hooks/useColors';
import { TranslationCodes, useTranslation } from '../hooks/useTranslation';
import { langMap } from '../locales/langMap';
import { SettingItem } from './timerSettingsModal/SettingItem';

interface LanguageSelectModalProps {
    showModal: boolean;
    onClose: () => void;
    onSelectLanguage: (lang: TranslationCodes) => void;
    currentLang: TranslationCodes;
}

interface LangItemProps {
    langCode: TranslationCodes;
    langName: string;
}

export const LanguageSelectModal = ({
    showModal,
    onClose,
    onSelectLanguage,
    currentLang,
}: LanguageSelectModalProps) => {
    const getColor = useColors();
    const trans = useTranslation();

    const LangItem = ({ langCode, langName }: LangItemProps) => (
        <Pressable onPress={() => onSelectLanguage(langCode)}>
            <SettingItem>
                <View>
                    <Text
                        style={[
                            styles.langName,
                            { color: currentLang === langCode ? getColor('primary200') : getColor('text') },
                        ]}
                    >
                        {langName}
                    </Text>
                </View>
            </SettingItem>
        </Pressable>
    );

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={trans('settings.selectLang')} size="md">
            <FlatList
                data={Object.entries(langMap) as [TranslationCodes, string][]}
                keyExtractor={item => item[0]}
                renderItem={({ item }) => <LangItem langCode={item[0]} langName={item[1]} />}
            />
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    langName: {
        textAlign: 'center',
        fontWeight: 'bold',
        width: DIMENSIONS.fullWidth * 0.5,
        fontSize: FONTS.md,
    },
});
