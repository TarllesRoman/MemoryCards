// Import libraries
import I18n from 'ex-react-native-i18n';

// Import translations
import en from './en.json';
import pt_BR from './pt_BR.json';

//Bind and initialize i18n
I18n.defaultLocale = "pt-BR";
I18n.locale = "pt-BR";
I18n.translations = {
    "en-US": en,
    "pt-BR": pt_BR,
}
const getLanguage = async () => {
    try {
        I18n.initAsync();
    } catch (error) {
        console.log(error);
    }
}
getLanguage();


// Lista de possíveis locales
export const LOCALES = {
    en: "en-US",
    pt_br: "pt-BR"
}

// Função modulo para buscar o texto adequado
export function t(name) {
    return I18n.t(name, {locale: I18n.currentLocale()});
}

// Altera o locale atual
export function setLocale(locale){
    I18n.locale = locale;
}


