import { Text, StyleSheet } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';

export const UserProfileScreen = () => {
    return (
        <SafeAreaCard>
            <Text>USER PROFILE SCREEN</Text>
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});