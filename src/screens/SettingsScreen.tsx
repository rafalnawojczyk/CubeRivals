import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { TranslationCodes, useTranslation } from '../hooks/useTranslation';
import { CustomButton } from '../components/UI/CustomButton';

import { FONTS, PADDING } from '../styles/base';
import { useContext, useState } from 'react';
import { TimerSettingsModal } from '../components/timerSettingsModal/TimerSettingsModal';
import { SettingsSwitchItem } from '../components/timerSettingsModal/SettingsSwitchItem';
import { ThemeContext } from '../store/theme-context';
import { SettingItem } from '../components/timerSettingsModal/SettingItem';
import { useColors } from '../hooks/useColors';
import { SettingsIconButtonItem } from '../components/timerSettingsModal/SettingsIconButtonItem';
import { CustomSettingItem } from '../components/timerSettingsModal/CustomSettingItem';
import { LinkButton } from '../components/UI/LinkButton';
import { UserContext } from '../store/user-context';
import { langMap } from '../locales/langMap';
import { ListSelectModal } from '../components/ListSelectModal';

export const SettingsScreen = () => {
    const { setThemeByUser, isDarkTheme } = useContext(ThemeContext);
    const [showLangModal, setShowLangModal] = useState(false);
    const { lang, updateUser } = useContext(UserContext);
    const [showTimerSettings, setShowTimerSettings] = useState(false);
    const trans = useTranslation();
    const getColor = useColors();

    const logoutHandler = () => {};

    return (
        <>
            <SafeAreaCard>
                <ScrollView style={{ paddingHorizontal: PADDING.sm }} contentContainerStyle={{ alignItems: 'center' }}>
                    <SettingItem>
                        <SettingsIconButtonItem
                            name="settings"
                            onPress={() => setShowTimerSettings(true)}
                            title={trans('settings.showTimerSettings')}
                            subtitle={trans('settings.timerSettingsDesc')}
                        />
                    </SettingItem>
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
                    <SettingItem>
                        <SettingsSwitchItem
                            title={trans('settings.darkMode')}
                            subtitle={trans('settings.darkModeDesc')}
                            value={isDarkTheme}
                            onSwitch={() => setThemeByUser(isDarkTheme ? 'light' : 'dark')}
                        />
                    </SettingItem>
                    <CustomButton type="primary" onPress={logoutHandler} title={trans('auth.signout')} />
                </ScrollView>
            </SafeAreaCard>
            <TimerSettingsModal showModal={showTimerSettings} onClose={() => setShowTimerSettings(false)} />
            <ListSelectModal
                optionsList={Object.keys(langMap)}
                showModal={showLangModal}
                onClose={() => setShowLangModal(false)}
                currentItem={langMap[lang]}
                onSelect={lang => {
                    const selectedLang = lang as TranslationCodes;
                    updateUser({ lang: selectedLang });
                    setShowLangModal(false);
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({});
