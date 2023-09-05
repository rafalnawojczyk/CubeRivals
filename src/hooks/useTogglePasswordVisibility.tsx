import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export const useTogglePasswordVisibility = () => {
    // password will not be initially visible
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState<keyof typeof Ionicons.glyphMap>('eye');

    // function that toggles password visibility on a TextInput component on a password field
    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return {
        passwordVisibility,
        handlePasswordVisibility,
        rightIcon,
    };
};
