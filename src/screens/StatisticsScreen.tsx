import { Text, View } from 'react-native';
import { useContext } from 'react';
import { SafeAreaCard } from '../components/UI/SafeAreaCard';
import { CustomButton } from '../components/UI/CustomButton';
import { SolvesContext } from '../store/solves-context';

export const StatisticsScreen = () => {
    const { addSolve, sessions, addSession, deleteSolve } = useContext(SolvesContext);

    return (
        <SafeAreaCard>
            <CustomButton
                title="ADD RANDOM TIME"
                type="primary"
                onPress={() => {
                    addSolve();
                }}
            />
            <CustomButton
                title="ADD RANDOM SESSION"
                type="primary"
                onPress={() => {
                    addSession('New session 1', '222');
                }}
            />
            <CustomButton
                title="DELETE FIRST TIME"
                type="primary"
                onPress={() => {
                    const currentSession = sessions[0];

                    deleteSolve(currentSession.solves[0]);
                }}
            />

            <View>
                {sessions.map(session => (
                    <View key={session._id}>
                        <Text>{session.name}</Text>
                        {session.solves?.map(el => {
                            return <Text key={el._id}>{el.time}</Text>;
                        })}
                    </View>
                ))}
            </View>
        </SafeAreaCard>
    );
};
