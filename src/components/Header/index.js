import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { t } from "../../../resources/locales";

import styles from './styles';

/**
 * Renderiza um componente que exibe o status de 'Próximo nº' e 'Jogadas', além de um botão que reset.
 *  O estado inicial desses valores é recebido como uma propriedade. Essa classe também provê
 *  métodos get/set para esses valores e um métodos para setar esses valores ao seu estado inicial.
 *  As propriedades aceitas são:
 *      - onreset       : Método executado quando o botão reset é pressionado
 *      - next          : Valor inicial exibido em 'Próximo nº'
 *      - attempts      : Valor inicial exibido em 'Jogadas'
 */
export default class Header extends Component {
    constructor (props) {  
        super(props);
        this.onReset = props.onreset;
        this.state = {
            next: props.next,
            attempts: props.attempts
        }
    }

    _getNext = () => this.state.next;
    _setNext(next){
        this.setState({next: next});
    }

    _getAttempts = () => this.state.attempts; 
    _setAttempts(attempts) {
        this.setState({attempts: attempts});
    }

    _setCounters = (next, attempts) => {
        this.setState( {next: next, attempts:  attempts});
    }

    _resetCounters = () => {
        this.setState( {next: this.props.next, attempts: this.props.attempts});
    }

    _handleClick = () => {
        this.onReset();
    }

    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {t('next_n')}: {this.state.next}, {t('attempts')}: {this.state.attempts}
                </Text>
                
                <TouchableOpacity style={styles.headerButton}
                    onPress={ this._handleClick }>
                        <Feather name="refresh-cw" style={styles.headerButtonText}/>
                </TouchableOpacity>

            </View>
        );
    }

};