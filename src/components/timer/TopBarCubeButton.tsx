import { Text, Pressable, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useState } from 'react';
import { CUBES_DATA } from '../../constants/CubesData';
import { PickCubeModal } from './modals/PickCubeModal';
import { useTranslation } from '../../hooks/useTranslation';

export const TopBarCubeButton = ({ title, session }: { title: string; session?: string }) => {
    const [showCubePicker, setShowCubePicker] = useState(false);
    const getColor = useColors();
    const trans = useTranslation();

    return (
        <>
            <PickCubeModal showModal={showCubePicker} onClose={() => setShowCubePicker(false)} />
            <Pressable
                style={styles.container}
                android_ripple={{ color: getColor('primary200') }}
                onPress={() => setShowCubePicker(true)}
            >
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.title, { color: getColor('text') }]}>
                            {CUBES_DATA.find(el => el.id === title)?.fullName}
                        </Text>
                        <Text style={[styles.session, { color: getColor('gray100') }]}>
                            {session ? session : trans('defaultSessionName')}
                        </Text>
                    </View>
                    <MaterialIcons
                        style={styles.icon}
                        name="keyboard-arrow-down"
                        size={FONTS.lg}
                        color={getColor('gray100')}
                    />
                </View>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: DIMENSIONS.fullWidth * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: PADDING.sm,
    },
    title: {
        fontSize: FONTS.md,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    session: {
        fontSize: FONTS.sm,
        opacity: 0.8,
        textAlign: 'center',
    },
    textContainer: {
        marginRight: PADDING.sm,
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: -10,
    },
});
