import translationPL from '../locales/translations/pl.json';
import translationEN from '../locales/translations/en.json';
import { useContext } from 'react';
import { UserContext } from '../store/user-context';

const translationObject = {
    pl: translationPL,
    en: translationEN,
};

export const useTranslation = () => {
    const userData = useContext(UserContext);
    const lang = userData.lang.toLowerCase();

    const trans = (stringTotrans: keyof typeof translationEN) => {
        if (Object.keys(translationObject).includes(lang)) {
            // @ts-ignore
            return translationObject[lang][stringTotrans];
        }

        return translationObject['en'][stringTotrans];
    };

    return trans;
};
