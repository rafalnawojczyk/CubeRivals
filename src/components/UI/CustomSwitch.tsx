import { Switch } from 'react-native';
import { useColors } from '../../hooks/useColors';

interface CustomSwitchProps {
    value: any;
    onChange: () => void;
}

export const CustomSwitch = ({ value, onChange }: CustomSwitchProps) => {
    const getColor = useColors();

    return (
        <Switch
            trackColor={{ false: getColor('gray100'), true: getColor('primary200') }}
            ios_backgroundColor={getColor('gray100')}
            onValueChange={onChange}
            value={value}
            thumbColor={getColor('primary500')}
            style={{ transform: [{ scale: 1.3 }] }}
        />
    );
};
