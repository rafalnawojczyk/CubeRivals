import { Text, Pressable, View, StyleSheet } from 'react-native';
import { FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useState } from 'react';
import { CUBES_DATA } from '../../constants/CubesData';
import { PickCubeModal } from './modals/PickCubeModal';
import CubeIcon from '../../assets/icons/CubeIcon';

export const TopBarCubeButton = ({ title }: { title: string }) => {
    const [showCubePicker, setShowCubePicker] = useState(false);
    const getColor = useColors();

    return (
        <>
            <PickCubeModal showModal={showCubePicker} onClose={() => setShowCubePicker(false)} />
            <View style={[styles.container, { backgroundColor: getColor('backgroundLight') }]}>
                <Pressable
                    style={styles.container}
                    android_ripple={{ color: getColor('background100') }}
                    onPress={() => setShowCubePicker(true)}
                >
                    <View style={[styles.innerContainer]}>
                        <View style={styles.textContainer}>
                            <CubeIcon color={getColor('gray500')} />
                            <Text style={[styles.title, { color: getColor('text') }]}>
                                {CUBES_DATA.find(el => el.id === title)?.fullName}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    innerContainer: {
        padding: PADDING.sm,
        borderRadius: 20,
    },
    title: {
        fontSize: FONTS.s,
        fontWeight: '600',
        textAlign: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    icon: {
        position: 'absolute',
        right: -10,
    },
});
