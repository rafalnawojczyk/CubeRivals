import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DIMENSIONS, FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useContext, useState } from 'react';
import { UserContext } from '../../store/user-context';
import { CUBES_DATA } from '../../constants/CubesData';
import { PickCubeModal } from './modals/PickCubeModal';

export const TopBarCubeButton = ({ title, session }: { title: string; session: string }) => {
    const [showCubePicker, setShowCubePicker] = useState(false);
    const { sessions } = useContext(UserContext);
    const getColor = useColors();

    return (
        <>
            <PickCubeModal showModal={showCubePicker} onClose={() => setShowCubePicker(false)} />
            <Pressable
                style={styles.container}
                android_ripple={{ color: getColor('secondary') }}
                onPress={() => setShowCubePicker(true)}
            >
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.title, { color: getColor('text') }]}>
                            {CUBES_DATA.find(el => el.id === title)?.fullName}
                        </Text>
                        <Text style={[styles.session, { color: getColor('gray100') }]}>
                            {sessions.find(el => el.id === session)?.name}
                        </Text>
                    </View>
                    <Ionicons name="chevron-down-outline" size={FONTS.lg} color={getColor('gray100')} />
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
});

// TODO: maybe try to place cube title in the middle, and icon render absolute
