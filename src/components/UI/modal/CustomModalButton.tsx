import { ButtonType, CustomButton } from '../CustomButton';

interface CustomModalButton {
    type: ButtonType;
    onPress: () => void;
    title: string;
}

export const CustomModalButton = ({ type, onPress, title }: CustomModalButton) => {
    return <CustomButton type={type} onPress={onPress} title={title} />;
};
