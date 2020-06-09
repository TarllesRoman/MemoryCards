import React, { Component } from 'react';
import { Animated, Easing, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import { TIME } from '../../../resources/dimensions';

/**
 * Abre todas as cartas do array utilizando o metodo Animated.stagger,
 *  cada carta demora 1" para abrir e o atraso entre cada animação é de 100ms
 */
export function open_all (cards) {
    Animated.stagger(TIME.stagger, 
        cards.map( card => {
            return Animated.timing( card.state.zspin, {
                toValue: 2,
                duration: TIME.open,
                asing: Easing.linear
            })
        })
    ).start(); 
}

/**
 * Fecha todas as cartas do array utilizando o metodo Animated.stagger,
 *  cada carta demora 1" para fechar e o atraso entre cada animação é de 100ms
 */
export function close_all (cards) {
    let sequence_1 = [];
    
    sequence_1 = cards.map( card => {
        return Animated.timing( card.state.zspin, {
            toValue: 0,
            duration: TIME.close,
            asing: Easing.linear
        })
    });

    Animated.stagger(TIME.stagger, sequence_1).start( ); 
}

/**
 * Rederiza uma carta de acordo com as propriedades recebidas, e também provê
 *  métodos para abrir, fechar e deslizar a carta renderizada. As propriedades aceitas são:
 *   - front         : imagem a ser exibida quando a carta esta aberta
 *   - background    : imagem a ser exibida quando a carta esta fechada
 *   - onpress       : função a ser executada quando a carta é pressionada
 *   - number        : o numero da carta que será exibida (A-9, J, Q, K)
 *   -? opened       : decide se a carta deve ser renderizada aberta ou fechada, default is false
 * 
 * ps: Cada carta já está dentro de um ToucheableOpacity
 */
export default class Card extends Component {
    constructor (props) {
        super(props);
        this._number = props.number;
        this.state = {
            front: props.front,
            background: props.background,
            opened: props.opened ? props.opened : false,
            yval: new Animated.Value(0),
            xval: new Animated.Value(0),
            zspin: new Animated.Value( props.opened ? 2 : 0),
        }
        this.zval = this.state.zspin.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['180deg', '270deg', '360deg']
        });
        this.state.zspin.addListener(({value}) => {
            if(!this.state.opened && value > 1)
                this.setState({opened: true});
            if(this.state.opened && value < 1)
                this.setState({opened: false});
        }); 
    }

    //True ou false se a carta esta aberta
    _isOpen = () => {
        return this.state.opened;
    }

    //Abre essa a carta usando uma animação de 1"
    _open = () => {
        Animated.timing( this.state.zspin, {
            toValue: 2,
            duration: TIME.open,
            asing: Easing.linear
        }).start();
    }

    //Fecha essa a carta usando uma animação de 1"
    _close = () => {
        Animated.timing( this.state.zspin, {
            toValue: 0,
            duration: TIME.close,
            asing: Easing.linear
        }).start();
    }

    //Desliza essa a carta, verticalmente, para o valor (to); usando uma animação de 1"
    _slideVertically = (to) => {
        Animated.timing(this.state.yval, {
            toValue: to,
            duration: TIME.slide_vertically,
            asing: Easing.linear
        }).start();
    }

    //Desliza essa a carta, horizontalmente, para o valor (to); usando uma animação de 1"
    _slideHorizontally = (to) => {
        Animated.timing(this.state.xval, {
            toValue: to,
            duration: TIME.slide_horizontally,
            asing: Easing.linear
        }).start();
    }

    render () {
        return (
            <Animated.View style={[styles.card,
                { top: this.state.yval },
                { left: this.state.xval },
                { transform: [{rotateY: this.zval}] }
                ]}
            >
                <TouchableOpacity onPress={this.props.onpress} style={styles.cardImage}>
                    <Image style={styles.cardImage} source={ (this.state.opened)? this.state.front : this.state.background }/>
                </TouchableOpacity>
            </Animated.View>
        )
    };
};