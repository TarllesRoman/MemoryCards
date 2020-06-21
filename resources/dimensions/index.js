import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

/**
 * Esse arquivo exporta constantes importantes a todo o programa. 
 *  As dimensões contidas aqui são de extrema importancia para o bom funcionamento da responsividade do app,
 *  altera-las e/ou não respeita-las pode acarretar em comportamentos estranhos durante a execução.
 */

const {width, height} = Dimensions.get('window');


export const STATUSBAR = {
    height: Constants.statusBarHeight
}

export const CONTAINER = {
    width: width,
    height: height - STATUSBAR.height,
}
  
export const HEADER = {
    height: CONTAINER.height/12.0,
    marginBottom: 15,
}
  
export const FOOTER = {
   height: CONTAINER.height/12.0,
   width: CONTAINER.width,
}
  
export const TABLE = {
   height: CONTAINER.height/1.2, // == CONTAINER.height/12.0 * 10
   width: CONTAINER.width,
   vertical_spacing: height/6,
   horizontal_spacing: width/4,
}
  
export const CARD = {
   width: (CONTAINER.width - TABLE.horizontal_spacing)/3.0,
   height: (TABLE.height - TABLE.vertical_spacing)/3.0,
}

export const SLIDE = {
    vertical: CONTAINER.height/1.9,
    horizontal: CONTAINER.width/1.5
}