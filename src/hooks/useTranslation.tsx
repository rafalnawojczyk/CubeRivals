import translationPL from '../locales/translations/pl.json';
import translationEN from '../locales/translations/en.json';
import { useContext } from 'react';
import { UserContext } from '../store/user-context';

export type TranslationCodes = 'pl' | 'en';

const translationObject: Record<TranslationCodes, any> = {
    pl: translationPL,
    en: translationEN,
};

export const useTranslation = () => {
    const userData = useContext(UserContext);
    const lang = userData.lang.toLowerCase();

    const trans = (stringToTrans: keyof typeof translationEN) => {
        if (Object.keys(translationObject).includes(lang)) {
            // @ts-ignore
            return translationObject[lang][stringToTrans];
        }

        return translationObject['en'][stringToTrans];
    };

    return trans;
};
