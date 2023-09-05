import { RootStackParamList } from '../navigation/AuthStack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
