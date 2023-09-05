import { Text, StyleSheet } from 'react-native';
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
            <Text>UserProfileScreen</Text>
            <CustomButton type="primary" onPress={logoutHandler} title="LOGOUT" />
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({});
