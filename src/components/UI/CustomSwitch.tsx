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
            trackColor={{ false: '#767577', true: getColor('secondary') }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onChange}
            value={value}
        />
    );
};
