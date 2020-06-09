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
}
  
export const TABLE = {
   height: CONTAINER.height/12.0 * 10,
}
  
export const CARD = {
   width: (CONTAINER.width - 80)/3.0,
   height: (TABLE.height - 100)/3.0,
}

export const TIME = {
    toload: 1500,
    toshow: 2000,
    slide_vertically: 1000,
    slide_horizontally: 1000,
    stagger: 100,
    open: 1000,
    close: 1000
}