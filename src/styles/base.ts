import { Dimensions } from 'react-native';

export const DIMENSIONS = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width,
};

export const PADDING = {
    micro: 8,
    sm: 12,
    m: 16,
    md: 24,
    lg: 30,
    xl: 40,
} as const;

export const FONTS = {
    micro: 10,
    sm: 12,
    s: 14,
    m: 16,
    md: 18,
    lg: 24,
    xl: 36,
    '1xl': 52,
    '2xl': 64,
    '3xl': 72,
} as const;
