import React, { Component } from 'react';
import { Animated, Easing, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

/** 
 * Tempo em ms configurados para as animações acontecerem
 */
export const TIMER = {
    slide_vertically: 1000,
    slide_horizontally: 1000,
    stagger: 100,
    open: 800,
    close: 800,
    shake: 500
}

/**
 * Abre todas as cartas do array utilizando o metodo Animated.stagger,
 *  cada carta demora 1" para abrir e o atraso entre cada animação é de 100ms
 */
export function open_all(cards) {
    Animated.stagger(TIMER.stagger,
        cards.map(card => {
            return Animated.timing(card.state.zspin, {
                toValue: 2,
                duration: TIMER.open,
                asing: Easing.linear
            })
        })
    ).start();
}

/**
 * Fecha todas as cartas do array utilizando o metodo Animated.stagger,
 *  cada carta demora 1" para fechar e o atraso entre cada animação é de 100ms
 */
export function close_all(cards) {
    let sequence_1 = [];

    sequence_1 = cards.map(card => {
        return Animated.timing(card.state.zspin, {
            toValue: 0,
            duration: TIMER.close,
            asing: Easing.linear
        })
    });

    Animated.stagger(TIMER.stagger, sequence_1).start();
}

/**
 * Rederiza uma carta de acordo com as propriedades recebidas, e também provê
 *  métodos para abrir, fechar e deslizar a carta renderizada. As propriedades aceitas são:
 *   - front         : imagem a ser exibida quando a carta esta aberta
 *   - background    : imagem a ser exibida quando a carta esta fechada
 *   - onpress       : função a ser executada quando a carta é pressionada
 *   - number        : o numero da carta que será exibida (A-9, J, Q, K)
 *   -? opened       : decide se a carta deve ser renderizada aberta(true) ou fechada(false), default is false
 * 
 * ps: Cada carta já está dentro de um ToucheableOpacity
 */
export default class Card extends Component {
    constructor(props) {
        super(props);
        this._number = props.number;
        this.state = {
            front: props.front,
            background: props.background,
            opened: props.opened ? props.opened : false,
            yval: new Animated.Value(0),
            xval: new Animated.Value(0),
            zspin: new Animated.Value(props.opened ? 2 : 0),
            zshake: new Animated.Value(1),
        }
        this.zval = this.state.zspin.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['180deg', '270deg', '360deg']
        });
        this.shakeval = this.state.zshake.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['-10deg', '0deg', '10deg']
        });
        this.state.zspin.addListener(({ value }) => {
            if (!this.state.opened && value > 1)
                this.setState({ opened: true });
            if (this.state.opened && value < 1)
                this.setState({ opened: false });
        });
    }

    //True ou false se a carta esta aberta
    _isOpen = () => {
        return this.state.opened;
    }

    //Abre essa a carta usando uma animação de 1"
    _open = () => {
        Animated.timing(this.state.zspin, {
            toValue: 2,
            duration: TIMER.open,
            asing: Easing.linear
        }).start();
    }

    //Fecha essa a carta usando uma animação de 1"
    _close = () => {
        Animated.timing(this.state.zspin, {
            toValue: 0,
            duration: TIMER.close,
            asing: Easing.linear
        }).start();
    }

    //Desliza essa a carta, verticalmente, para o valor (to); usando uma animação de 1"
    _slideVertically = (to) => {
        Animated.timing(this.state.yval, {
            toValue: to,
            duration: TIMER.slide_vertically,
            asing: Easing.linear
        }).start();
    }

    //Desliza essa a carta, horizontalmente, para o valor (to); usando uma animação de 1"
    _slideHorizontally = (to) => {
        Animated.timing(this.state.xval, {
            toValue: to,
            duration: TIMER.slide_horizontally,
            asing: Easing.linear
        }).start();
    }

    _shake = () => {
        Animated.sequence([
            Animated.timing(this.state.zshake, {
                toValue: 2,
                duration: 100,
                asing: Easing.linear
            }),
            Animated.timing(this.state.zshake, {
                toValue: 0,
                duration: 100,
                asing: Easing.linear
            }),
            Animated.timing(this.state.zshake, {
                toValue: 2,
                duration: 100,
                asing: Easing.linear
            }),
            Animated.timing(this.state.zshake, {
                toValue: 0,
                duration: 100,
                asing: Easing.linear
            }),
            Animated.timing(this.state.zshake, {
                toValue: 1,
                duration: 100,
                asing: Easing.linear
            }),
        ]).start();
    }


    handlePress = (e) => {
        this.props.onpress();
    }

    render() {
        return (
            <Animated.View style={{
                top: this.state.yval,
                left: this.state.xval,
                transform: [{ rotateY: this.zval }, { rotate: this.shakeval }]
            }}
            >
                <TouchableOpacity onPress={this.handlePress} style={styles.card}>
                    <Image style={styles.cardImage} source={(this.state.opened) ? this.state.front : this.state.background} />
                </TouchableOpacity>
            </Animated.View>
        )
    };
};