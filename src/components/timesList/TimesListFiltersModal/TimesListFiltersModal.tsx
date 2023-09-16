import { CustomModal } from '../../UI/modal/CustomModal';
import { useTranslation } from '../../../hooks/useTranslation';
import { TimesListFilterObj } from '../TimesList';
import { Dispatch } from 'react';
import { TimesAddFilterForm } from './TimesAddFilterForm';

interface TimesListFiltersModalProps {
    showModal: boolean;
    onClose: () => void;
    setFilters: Dispatch<React.SetStateAction<TimesListFilterObj>>;
    currentFilters: TimesListFilterObj;
}

export const TimesListFiltersModal = ({
    showModal,
    onClose,
    setFilters,
    currentFilters,
}: TimesListFiltersModalProps) => {
    const trans = useTranslation();

    return (
        <CustomModal isVisible={showModal} onClose={onClose} title={trans('timesList.filterModal')} size="lg">
            <TimesAddFilterForm filters={currentFilters} setFilters={setFilters} />
            <CustomModal.ButtonsContainer>
                <CustomModal.Button
                    type="error"
                    onPress={() => {
                        setFilters({ filter: 'createdAt', order: 'asc' });
                        onClose();
                    }}
                    title={trans('reset')}
                />
                <CustomModal.Button
                    type="primary"
                    onPress={() => {
                        onClose();
                    }}
                    title={trans('save')}
                />
            </CustomModal.ButtonsContainer>
        </CustomModal>
    );
};
