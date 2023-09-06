import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export const useTogglePasswordVisibility = () => {
    // password will not be initially visible
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState<keyof typeof MaterialIcons.glyphMap>('visibility');

    // function that toggles password visibility on a TextInput component on a password field
    const handlePasswordVisibility = () => {
        if (rightIcon === 'visibility') {
            setRightIcon('visibility-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'visibility-off') {
            setRightIcon('visibility');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return {
        passwordVisibility,
        handlePasswordVisibility,
        rightIcon,
    };
};
