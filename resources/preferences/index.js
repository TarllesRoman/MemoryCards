import AsyncStorage from '@react-native-community/async-storage';

import { ASKEY_LOCALE } from '../keys';
import { setLocale } from '../locales';

import * as decks from '../../assets/Decks';

export default {
    deck: () => {
        return decks.Mask;
    },
    language: async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(`${ASKEY_LOCALE}`);
            return jsonValue != null? JSON.parse(jsonValue).l : null;
        } catch(e) {
            console.log("ERRO ao obter locale");
            console.error(e);
        }
    },
    setLanguage: async (language) => {
        try {
            const jsonValue = JSON.stringify({l: language});
            await AsyncStorage.setItem(`${ASKEY_LOCALE}`, jsonValue);
            setLocale(language);
        } catch (e) {
            console.log("ERRO ao salvar language");
            console.error(e);
        }
    }, 

}