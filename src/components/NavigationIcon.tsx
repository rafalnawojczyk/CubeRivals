import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '../hooks/useColors';
import ClockIcon from '../assets/icons/ClockIcon';
import ChartIcon from '../assets/icons/ChartIcon';
import AwardIcon from '../assets/icons/AwardIcon';
import SettingIcon from '../assets/icons/SettingIcon';
import ChecklistIcon from '../assets/icons/ChecklistIcon';
import { useTranslation } from '../hooks/useTranslation';
import { FONTS, PADDING } from '../styles/base';

const NavIconsMap = {
    timer: ClockIcon,
    stats: ChartIcon,
    rivals: AwardIcon,
    settings: SettingIcon,
    list: ChecklistIcon,
} as const;

interface NavigationIconProps {
    icon: keyof typeof NavIconsMap;
    color: string;
    isActive: boolean;
}

export const NavigationIcon = ({ icon, color, isActive }: NavigationIconProps) => {
    const getColor = useColors();
    const trans = useTranslation();

    const namesMap = {
        timer: trans('timer'),
        stats: 'Statistics',
        rivals: 'Rivals',
        settings: 'Settings',
        list: 'Times',
    } as const;

    const bgActiveColor = getColor('primary600');

    const CurrentItem = NavIconsMap[icon];

    return (
        <View style={styles.container}>
            <View style={[styles.innerContainer, { backgroundColor: isActive ? bgActiveColor : 'transparent' }]}>
                <CurrentItem color={isActive ? getColor('white') : color} />
                {/* {icon === 'timer' && isActive && (
                    <Text style={[styles.text, { color: getColor('text') }]}>{trans('timer')}</Text>
                )} */}
                {isActive && <Text style={[styles.text, { color: getColor('text') }]}>{namesMap[icon]}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        // height: '70%',
        // aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: PADDING.micro,
        paddingVertical: 4,
        borderRadius: 9999,
        flexDirection: 'row',
    },
    text: {
        fontWeight: '600',
        fontSize: FONTS.micro,
    },
});
