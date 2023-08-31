import translationPL from '../locales/translations/pl.json';
import translationEN from '../locales/translations/en.json';
import { useContext } from 'react';
import { UserContext } from '../store/user-context';

const translationObject = {
    pl: translationPL,
    en: translationEN,
};

export const useTranslation = () => {
    const { lang, username } = useContext(UserContext);

    const translate = (stringToTranslate: keyof typeof translationEN) => {
        console.log(lang);
        console.log(username);

        if (Object.keys(translationObject).includes(lang)) {
            // @ts-ignore
            return translationObject[lang][stringToTranslate];
        }

        return translationObject['en'][stringToTranslate];
    };

    return translate;
};
