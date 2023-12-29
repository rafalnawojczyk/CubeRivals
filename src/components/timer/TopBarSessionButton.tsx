import { Text, Pressable, View, StyleSheet } from 'react-native';
import { FONTS, PADDING } from '../../styles/base';
import { useColors } from '../../hooks/useColors';
import { useTranslation } from '../../hooks/useTranslation';
import { useCurrentSession } from '../../hooks/useCurrentSession';
import { truncateString } from '../../utils/truncateString';

export const TopBarSessionButton = ({ onPress }: { onPress: () => void }) => {
    const currentSession = useCurrentSession();
    const trans = useTranslation();
    const getColor = useColors();

    return (
        <>
            <View style={styles.container}>
                <Pressable
                    style={styles.container}
                    android_ripple={{ color: getColor('background100') }}
                    onPress={onPress}
                >
                    <View style={[styles.innerContainer]}>
                        <View style={styles.textContainer}>
                            <Text style={[styles.subtitle, { color: getColor('gray500') }]}>
                                {trans('session').toUpperCase()}
                            </Text>
                            <Text style={[styles.title, { color: getColor('text') }]}>
                                {truncateString(currentSession.name, 9)}
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
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        borderRadius: 20,
        overflow: 'hidden',
    },
    innerContainer: {
        padding: PADDING.sm,
        borderRadius: 20,
    },
    title: {
        fontSize: FONTS.s,
        fontWeight: '600',
        textAlign: 'right',
    },
    subtitle: {
        fontSize: FONTS.micro,
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
    textContainer: {
        gap: 2,
    },
});
