import { Text, StyleSheet } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useTranslation } from '../hooks/useTranslation';

export const SettingsScreen = () => {
    const trans = useTranslation();

    return (
        <SafeAreaCard>
            <Text>UserProfileScreen</Text>
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({});
