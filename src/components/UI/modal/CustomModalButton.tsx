import { ButtonType, CustomButton } from '../CustomButton';

interface CustomModalButton {
    type: ButtonType;
    onPress: () => void;
    children?: React.ReactNode;
}

export const CustomModalButton = ({ type, onPress, children }: CustomModalButton) => {
    return (
        <CustomButton type={type} onPress={onPress}>
            {children}
        </CustomButton>
    );
};
