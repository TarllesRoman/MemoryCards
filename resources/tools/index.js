import AsyncStorage from '@react-native-community/async-storage';
import {ASKEY_SCOREBOARD} from '../keys';


//Reproduz o objeto recebido a partir de seu 1 ms, o objeto deve ser do tipo Audio.Sound disponivel no pacote 'expo-av'
export const playSound = async (sound) => {
    try {
        await sound.playFromPositionAsync(1);
    } catch (error) {
        console.log(error);
    } 
}

//Função asyncrona para provocar um delay na execução, o tempo é passado em ms
export const delay = (ms) => new Promise(res => setTimeout(res, ms));

//Algoritmo de embaralhamento Fisher-Yates
export const shuffle = (array) => {
    let m = array.length, t, i;
    
    while (m) {
        i = Math.floor(Math.random() * m--);
        
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array;
}

//Cria um objeto jogador com nome e pontuação
export const createWinner = (name, score) => {
    return {
        name: name,
        score: score
    };
}

//Salva um vetor ganhadores no async storage, sobreescrevendo o que estava anteriormente
export const storeWinners = async (subkey, winners) => {
    try {
        const jsonValue = JSON.stringify(winners);
        await AsyncStorage.setItem(`${ASKEY_SCOREBOARD}_${subkey}`, jsonValue);
    } catch (e) {
        console.log("ERRO ao salvar jogadores");
    }
}

//Obtem o vetor de ganhadores salvo no localstorage, retorna null caso não encontre
export const getWinners = async (subkey) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`${ASKEY_SCOREBOARD}_${subkey}`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log("ERRO ao obter jogadores");
    }
}