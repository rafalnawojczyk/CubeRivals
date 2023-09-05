import { initializeApp } from 'firebase/app';
import { Persistence, initializeAuth, setPersistence } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';
import Constants from 'expo-constants';

// Initialize Firebase
const firebaseConfig = {
    apiKey: Constants?.expoConfig?.extra?.firebaseApiKey,
    authDomain: Constants?.expoConfig?.extra?.firebaseAuthDomainN,
    databaseURL: Constants?.expoConfig?.extra?.firebaseDatabaseUrl,
    projectId: Constants?.expoConfig?.extra?.firebaseProjectId,
    storageBucket: Constants?.expoConfig?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants?.expoConfig?.extra?.firebaseMessagingSenderId,
    appId: Constants?.expoConfig?.extra?.firebaseAppId,
    measurementId: Constants?.expoConfig?.extra?.firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = initializeAuth(app);

const persistenceConfig: Persistence = { type: 'LOCAL' };

setPersistence(auth, persistenceConfig);

export { auth, app };
