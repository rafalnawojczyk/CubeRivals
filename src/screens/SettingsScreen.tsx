import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useTranslation } from '../hooks/useTranslation';
import { CustomButton } from '../components/UI/CustomButton';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

export const SettingsScreen = () => {
    const trans = useTranslation();

    const logoutHandler = () => {
        signOut(auth);
    };

    return (
        <SafeAreaCard>
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Text>UserProfileScreen</Text>

                    <CustomButton type="primary" onPress={logoutHandler} title="LOGOUT" />
                </ScrollView>
            </View>
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignItems: 'center',
    },
});
