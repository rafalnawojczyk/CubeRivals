import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { TranslationCodes, useTranslation } from '../hooks/useTranslation';
import { CustomButton } from '../components/UI/CustomButton';

import { DIMENSIONS, FONTS, PADDING } from '../styles/base';
import { useState } from 'react';
import { TimerSettingsModal } from '../components/timerSettingsModal/TimerSettingsModal';
import { SettingsSwitchItem } from '../components/timerSettingsModal/SettingsSwitchItem';
import { SettingItem } from '../components/timerSettingsModal/SettingItem';
import { useColors } from '../hooks/useColors';
import { SettingsIconButtonItem } from '../components/timerSettingsModal/SettingsIconButtonItem';
import { CustomSettingItem } from '../components/timerSettingsModal/CustomSettingItem';
import { LinkButton } from '../components/UI/LinkButton';

import { langMap } from '../locales/langMap';
import { ListSelectModal } from '../components/ListSelectModal';
import { useAuth } from '@realm/react';
import { useUserStore } from '../store/userStore';
import { useThemeStore } from '../store/themeStore';

export const SettingsScreen = () => {
    const { setThemeByUser, isDarkTheme } = useThemeStore(state => ({
        setThemeByUser: state.setThemeByUser,
        isDarkTheme: state.isDarkTheme,
    }));
    const [showLangModal, setShowLangModal] = useState(false);
    const { lang, updateUser } = useUserStore(state => ({ lang: state.lang, updateUser: state.updateUser }));
    const [showTimerSettings, setShowTimerSettings] = useState(false);
    const { logOut } = useAuth();

    const trans = useTranslation();
    const getColor = useColors();

    const logoutHandler = () => {
        logOut();
    };

    return (
        <>
            <SafeAreaCard>
                <View style={styles.outerContainer}>
                    <Text style={[styles.title, { color: getColor('text') }]}>{trans('settings.title')}</Text>
                    <View style={{ maxHeight: DIMENSIONS.fullHeight - 270 }}>
                        <ScrollView
                            style={[styles.settingsContainer, { backgroundColor: getColor('backgroundLight') }]}
                            contentContainerStyle={{ alignItems: 'center' }}
                        >
                            <SettingItem>
                                <CustomSettingItem
                                    title={trans('settings.selectLang')}
                                    rightItem={
                                        <LinkButton
                                            title={langMap[lang]}
                                            color={getColor('primary200')}
                                            textStyle={{ fontSize: FONTS.md }}
                                            onPress={() => setShowLangModal(true)}
                                        />
                                    }
                                />
                            </SettingItem>
                            <SettingItem showBorder={false}>
                                <SettingsSwitchItem
                                    title={trans('settings.darkMode')}
                                    subtitle={trans('settings.darkModeDesc')}
                                    value={isDarkTheme}
                                    onSwitch={() => setThemeByUser(isDarkTheme ? 'light' : 'dark')}
                                />
                            </SettingItem>
                        </ScrollView>
                    </View>
                    <CustomButton
                        type="primary"
                        style={{ marginTop: PADDING.md }}
                        onPress={() => setShowTimerSettings(true)}
                        title={trans('settings.goToTimerSettings')}
                    />
                    <CustomButton type="cancel" onPress={logoutHandler} title={trans('auth.signout')} />
                </View>
            </SafeAreaCard>
            <TimerSettingsModal showModal={showTimerSettings} onClose={() => setShowTimerSettings(false)} />
            <ListSelectModal
                modalTitle={trans('settings.selectLang')}
                optionsList={Object.keys(langMap)}
                showModal={showLangModal}
                onClose={() => setShowLangModal(false)}
                currentItem={lang}
                listNameRender={(item: string) => langMap[item as TranslationCodes]}
                onSelect={lang => {
                    const selectedLang = lang as TranslationCodes;
                    updateUser({ lang: selectedLang });
                    setShowLangModal(false);
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        paddingHorizontal: PADDING.m,
    },
    settingsContainer: {
        paddingHorizontal: PADDING.m,
        borderRadius: 16,
    },
    title: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: FONTS.lg,
        fontWeight: 'bold',
        marginBottom: PADDING.md,
    },
});
