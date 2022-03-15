import React, { Component, createRef } from 'react';
import { View, ToastAndroid } from 'react-native';
import { Audio } from 'expo-av';

import Card, { open_all, close_all, TIMER } from '../../Card';
import { SLIDE } from '../../../../resources/dimensions';
import { delay, shuffle, playSound } from '../../../../resources/tools';
import preferences from '../../../../resources/preferences';
import { t } from "../../../../resources/locales";

import styles from './styles';

const card_images = preferences.deck().hearts;

const sounds_repo = '../../../../assets/Sounds/';
const SOUNDS = {
    shuffle: new Audio.Sound(),
    open: new Audio.Sound(),
    error: new Audio.Sound(),
    win: new Audio.Sound(),
}

export default class Hard extends Component {
    constructor(props) {
        super(props);

        TIMER.toload = 1750;
        TIMER.toshow = 3000;
        TIMER.toinit = 12000;

        this.state = {
            sequence: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        }
        this.cards_ref = [
            [createRef(), createRef(), createRef()],
            [createRef(), createRef(), createRef()],
            [createRef(), createRef(), createRef()],
        ];
        this.next = 0;
        this.attempts = 0;
        this.running = true;

        this.moves_vector = [
            () => {
                // Embaralhamento 1, troca a primeira e ultima linhas
                this.move_line(SLIDE.vertical, this.cards_ref[0]);
                this.move_line(SLIDE.vertical * -1, this.cards_ref[2]);
            },
            () => {
                // Embaralhamento 2, troca a primeira e ultima colunas
                this.move_column(SLIDE.horizontal,
                    this.cards_ref[0][0], this.cards_ref[1][0], this.cards_ref[2][0]);
                this.move_column(SLIDE.horizontal * -1,
                    this.cards_ref[0][2], this.cards_ref[1][2], this.cards_ref[2][2]);
            },
            () => {
                // >Volta as colunas para a sua posição original
                this.move_column(0,
                    this.cards_ref[0][0], this.cards_ref[1][0], this.cards_ref[2][0]);
                this.move_column(0,
                    this.cards_ref[0][2], this.cards_ref[1][2], this.cards_ref[2][2]);
            },
            () => {
                // >Volta as linhas para a sua posição original
                this.move_line(0, this.cards_ref[0]);
                this.move_line(0, this.cards_ref[2]);
            },
        ];

        this.move_index = 0;
    }

    open_cards() {
        let cards = [];

        this.cards_ref.forEach(line => {
            line.forEach(card => cards.push(card.current));
        });

        open_all(cards);
    }

    close_cards() {
        let cards = [];

        this.cards_ref.forEach(line => {
            line.forEach(card => cards.push(card.current));
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

    next_moveIndex() {
        if (this.move_index >= this.moves_vector.length) {
            this.move_index = 1;
            return 0;
        } else
            return this.move_index++;
    }

    //Recebe o tempo de renderização das cartas, aguarda tal tempo antes de iniciar o jogo
    _init = async () => {

        //Countdown representando o tempo de espera para a execução dos movimentos
        this.props.timer.current.countDown(TIMER.toinit);

        //Mostra todas as cartas
        this.open_cards();
        await delay(TIMER.open + (TIMER.stagger * 9) + TIMER.toshow);


        playSound(SOUNDS.shuffle);
        this.moves_vector[this.next_moveIndex()]();
        await delay(TIMER.slide_vertically);


        this.moves_vector[this.next_moveIndex()]();
        playSound(SOUNDS.shuffle);
        await delay((TIMER.slide_horizontally) + TIMER.toshow / 4.0);

        //Depois de embaralhar fecha as cartas
        this.close_cards();
        await delay(TIMER.close + (TIMER.stagger * 9));

        this.next = 1;

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
        if (this.running) return Promise.reject("Running other function"); else this.running = true;
        // >Fecha todas as cartas,
        this.props.timer.current.countUp((TIMER.close + TIMER.stagger * (this.next - 1)));
        this.close_cards();
        await delay(TIMER.close + (TIMER.stagger * (this.next - 1)));


        while (this.move_index < 4) {
            this.moves_vector[this.next_moveIndex()]();
            playSound(SOUNDS.shuffle);
            await delay(TIMER.slide_horizontally);
        }

        // >Gera uma sequencia para posicionar as cartas
        this.setState({
            sequence: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        });

        // >Reseta contadores
        this.next = 0;
        this.attempts = 0;

        this._init();
    }

    _handleClick = async (pressed) => {
        if (this.running) {
            ToastAndroid.show(t('wait'), ToastAndroid.SHORT);
            return;
        } else if (pressed.current._isOpen()) return;
        else this.running = true;

        this.props.attemptsCounter();

        if (pressed.current._number === this.next) {
            this.props.toNext(++this.next);
            playSound(SOUNDS.open);
            pressed.current._open();
        } else {
            pressed.current._open();
            await delay(TIMER.open / 2);

            playSound(SOUNDS.error);
            pressed.current._shake();
            await delay(TIMER.toshow / 3);

            this.moves_vector[this.next_moveIndex()]();
            playSound(SOUNDS.shuffle);
            await delay(TIMER.slide_horizontally + (TIMER.toshow / 2));

            this.close_cards();
            await delay(TIMER.close + (TIMER.stagger * (this.next - 1)));
            this.next = 1;
            this.props.toNext(this.next);
        }

        if (this.next === 10) {
            playSound(SOUNDS.win);
            this.props.onWin();
        }

        this.running = false;
    }

    componentDidMount() {
        SOUNDS.open.loadAsync(require(sounds_repo + 'card_opening.mp3'));
        SOUNDS.shuffle.loadAsync(require(sounds_repo + 'card_slide.mp3'));
        SOUNDS.error.loadAsync(require(sounds_repo + 'error_tonelong.mp3'));
        SOUNDS.win.loadAsync(require(sounds_repo + 'win_sound.mp3'));

        delay(TIMER.toload).then(this._init);
    }

    componentWillUnmount() {
        SOUNDS.shuffle.unloadAsync();
        SOUNDS.open.unloadAsync();
        SOUNDS.error.unloadAsync();
        SOUNDS.win.unloadAsync();
    }

    render_line = (props) => {
        let { refs, numbers } = props;
        const cards = numbers.map((n, index) =>
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
                {cards}
            </View>
        );
    }

    render() {
        let seq = this.state.sequence;
        return (
            <View style={styles.table}>
                <this.render_line refs={this.cards_ref[0]} numbers={seq.slice(0, 3)} />
                <this.render_line refs={this.cards_ref[1]} numbers={seq.slice(3, 6)} />
                <this.render_line refs={this.cards_ref[2]} numbers={seq.slice(6)} />
            </View>
        );
    }

};