import { Text, StyleSheet } from 'react-native';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { useContext } from 'react';
import { UserContext } from '../store/user-context';

export const UserProfileScreen = () => {
    const { user } = useContext(UserContext);

    console.log(user);

    return (
        <SafeAreaCard>
            <Text>{user?.uid}</Text>
        </SafeAreaCard>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
