import React, { Component, createRef } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';

import styles from './styles';
import Card, { open_all, close_all } from '../../Card';
import  { delay, shuffle, playSound, CONTAINER_DIMENSIONS } from '../../../constant';

const slide_vertical_value = CONTAINER_DIMENSIONS.height/2.0 + 15
const slide_horizontal_value = (CONTAINER_DIMENSIONS.width/3.0) * 2

const deck = '../../../../assets/Decks/Mask/Spades/';
const card_images = [
    require(deck+'background.png'), require(deck+'spades_A.png'),
    require(deck+'spades_2.png'), require(deck+'spades_3.png'),
    require(deck+'spades_4.png'), require(deck+'spades_5.png'),
    require(deck+'spades_6.png'), require(deck+'spades_7.png'),
    require(deck+'spades_8.png'), require(deck+'spades_9.png')
]

const sounds_repo = '../../../../assets/Sounds/';
const SOUNDS = {
    shuffle: new Audio.Sound(),
    open: new Audio.Sound(),
    error: new Audio.Sound(),
    win: new Audio.Sound(),
}

export default class Medium extends Component {
    constructor (props) {
        super(props);

        this.state = {
            sequence: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        }
        this.cards_ref = [
            [createRef(), createRef(), createRef()],
            [createRef(), createRef(), createRef()],
            [createRef(), createRef(), createRef()],
        ];
        this.next = 1;
        this.attempts = 0;
        this.running = false;
    }

    open_cards() {
        let cards = [];

        this.cards_ref.forEach( line => {
            line.forEach ( card => cards.push(card.current) );
        });

        open_all(cards);
    }

    close_cards () {
        let cards = [];

        this.cards_ref.forEach( line => {
            line.forEach ( card => cards.push(card.current) );
        });

        cards = cards.filter(c => c._isOpen());

        close_all(cards);
    }

    move_line(to, line) {
        line.forEach(card => {
            card.current._slideVertically(to);
        });
    }

    move_column(to, ...column) {
        column.forEach(card => {
            card.current._slideHorizontally(to);
        });
    }

    _init = async () => {
        if(this.running) return;
        else this.running = true;

        //Mostra todas as cartas e após 2" começa a embaralhar
        this.open_cards();
        await delay(3000);

        // Embaralhamento 1, troca a primeira e ultima linhas
        this.move_line(slide_vertical_value, this.cards_ref[0]);
        this.move_line(slide_vertical_value * -1, this.cards_ref[2]);
        playSound(SOUNDS.shuffle);
        await delay(2000);
        // Embaralhamento 2, troca a primeira e ultima colunas
        this.move_column(slide_horizontal_value,
            this.cards_ref[0][0], this.cards_ref[1][0], this.cards_ref[2][0]);
        this.move_column(slide_horizontal_value * -1,
            this.cards_ref[0][2], this.cards_ref[1][2], this.cards_ref[2][2]);
        playSound(SOUNDS.shuffle);

        //Depois de embaralhar aguarda 2" e fecha as cartas
        await delay(3000);
        this.close_cards();

        this.running = false;
    }

    /**
     * Reinicia o jogo, executando as seguintes tarefas:
     *  >Fecha todas as cartas,
     *  >Volta as cartas para a sua posição original
     *  >Gera uma sequencia para posicionar as cartas
     *  >Reseta contadores
     *  >Executa o método init
     */
    _reinit = async () => {
        if(this.running) return; else this.running = true;
        // >Fecha todas as cartas,
        this.close_cards(false);
        await delay(200 * (this.next - 1));

        // >Volta as cartas para a sua posição original
        this.move_column(0,
            this.cards_ref[0][0], this.cards_ref[1][0], this.cards_ref[2][0]);
        this.move_column(0,
            this.cards_ref[0][2], this.cards_ref[1][2], this.cards_ref[2][2]);
        playSound(SOUNDS.shuffle);
        await delay(1000);
        this.move_line(0, this.cards_ref[0]);
        this.move_line(0, this.cards_ref[2]);
        playSound(SOUNDS.shuffle);
        await delay(1000);
        
        // >Gera uma sequencia para posicionar as cartas
        this.setState({
            sequence: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        });

        // >Reseta contadores
        this.next = 1;
        this.attempts = 0;

        this.running = false;
        this._init();
    }

    _handleClick = async (pressed) => {
        if(this.running) return; else this.running = true;

        this.props.moveCounter();

        if(pressed.current._number === this.next){
            this.props.toNext(++this.next);
            playSound(SOUNDS.open);
            pressed.current._open();
        }else{ 
            playSound(SOUNDS.error);
        }
        
        if(this.next === 10){
            playSound(SOUNDS.win);
            this.props.onWin();
        } 

        this.running = false;
    }

    componentDidMount() {
        SOUNDS.open.loadAsync( require(sounds_repo+'card_opening.mp3') );
        SOUNDS.shuffle.loadAsync( require(sounds_repo+'card_slide.mp3') );
        SOUNDS.error.loadAsync( require(sounds_repo+'error_tone.mp3') );
        SOUNDS.win.loadAsync( require(sounds_repo+'win_sound.mp3') );

        this._init();
    }

    componentWillUnmount() {
        SOUNDS.shuffle.unloadAsync();
        SOUNDS.open.unloadAsync();
        SOUNDS.error.unloadAsync();
        SOUNDS.win.unloadAsync();
    }

    render_line = (props) => {
        let {refs, numbers} = props;
        const cards = numbers.map( (n, index) => 
            <Card ref={refs[index]}
                key={n.toString()}
                number={n}
                background={card_images[0]} 
                front={card_images[n]}
                onpress={() => this._handleClick(refs[index])}
            />
        );
        return (
            <View style={styles.line}>
                { cards }
            </View>
        );
    }

    render() {
        let seq = this.state.sequence;
        return (
            <View style={styles.table}>
                <this.render_line refs={this.cards_ref[0]} numbers={seq.slice(0,3)} />
                <this.render_line refs={this.cards_ref[1]} numbers={seq.slice(3,6)} />
                <this.render_line refs={this.cards_ref[2]} numbers={seq.slice(6)} />
            </View>
        );
    }

};