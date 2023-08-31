import { Switch } from 'react-native';

interface CustomSwitchProps {
    value: any;
    onChange: () => void;
}

export const CustomSwitch = ({ value, onChange }: CustomSwitchProps) => {
    <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onChange}
        value={value}
    />;
};
