import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

/**
 * Esse arquivo exporta constantes importantes a todo o programa. 
 *  As dimensões contidas aqui são de extrema importancia para o bom funcionamento da responsividade do app,
 *  altera-las e/ou não respeita-las pode acarretar em comportamentos estranhos durante a execução.
 */

export const STATUSBAR_HEIGHT = Constants.statusBarHeight;
export const A_STORAGE_KEY = 'memc_winners';

export const CONTAINER_DIMENSIONS = {
  width: width,
  height: height - STATUSBAR_HEIGHT,
}

export const HEADER_DIMENSIONS = {
  height: CONTAINER_DIMENSIONS.height/12.0,
  marginBottom: 15,
}

export const FOOTER_DIMENSIONS = {
  height: CONTAINER_DIMENSIONS.height/12.0,
}

export const TABLE_DIMENSIONS = {
  height: CONTAINER_DIMENSIONS.height/12.0 * 10,
}

export const CARD_DIMENSIONS = {
  width: (CONTAINER_DIMENSIONS.width - 80)/3.0,
  height: (TABLE_DIMENSIONS.height - 100)/3.0,
}

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
      await AsyncStorage.setItem(`${A_STORAGE_KEY}_${subkey}`, jsonValue);
  } catch (e) {
     console.log("ERRO ao salvar jogadores");
  }
}

//Obtem o vetor de ganhadores salvo no localstorage, retorna null caso não encontre
export const getWinners = async (subkey) => {
  try {
      const jsonValue = await AsyncStorage.getItem(`${A_STORAGE_KEY}_${subkey}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
      console.log("ERRO ao obter jogadores");
  }
}