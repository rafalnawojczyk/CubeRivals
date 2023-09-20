import 'dotenv/config';

export default {
    expo: {
        name: 'Cube-rivals',
        slug: 'Cube-rivals',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icons/icon.png',
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/icons/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/icons/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            package: 'com.anonymous.Cuberivals',
        },
        web: {
            favicon: './assets/icons/favicon.png',
        },
        plugins: ['expo-localization'],

        extra: {
            realmAppId: process.env.REALM_APP_ID,
        },
    },
};
