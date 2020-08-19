import React, { Component, createRef } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';

import Card, { open_all, close_all, TIMER } from '../../Card';
import { delay, shuffle, playSound } from '../../../../resources/tools';
import preferences from '../../../../resources/preferences';

import styles from './styles';

const card_images = preferences.deck().diamonds;

const sounds_repo = '../../../../assets/Sounds/';
const SOUNDS = {
    shuffle: new Audio.Sound(),
    open: new Audio.Sound(),
    error: new Audio.Sound(),
    win: new Audio.Sound(),
}

TIMER.toload = 0;
TIMER.toshow = 5000;

export default class Easy extends Component {
    constructor(props) {
        super(props);

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
        this.running = false;
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

    //Recebe o tempo de renderização das cartas, aguarda tal tempo antes de iniciar o jogo
    _init = async () => {
        this.setState({ progress_time: 0 })
        if (this.running) return;
        else this.running = true;

        //Mostra todas as cartas
        this.open_cards();

        let delay_time = TIMER.open + (TIMER.stagger * 9) + TIMER.toshow
        this.props.timer.current.countDown(delay_time + 2000);
        await delay(delay_time);

        //fecha as cartas
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
        if (this.running) return; else this.running = true;
        // >Fecha todas as cartas,
        this.close_cards();
        this.props.timer.current.countUp((TIMER.close + TIMER.stagger * (this.next - 1)));
        await delay((TIMER.close + TIMER.stagger * (this.next - 1)) + 100);


        await delay(TIMER.slide_vertically);

        // >Gera uma sequencia para posicionar as cartas
        this.setState({
            sequence: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        });

        // >Reseta contadores
        this.next = 0;
        this.attempts = 0;

        this.running = false;
        this._init();
    }

    _handleClick = async (pressed) => {
        if (this.running || pressed.current._isOpen()) return; else this.running = true;

        this.props.moveCounter();

        if (pressed.current._number === this.next) {
            this.props.toNext(++this.next);
            playSound(SOUNDS.open);
            pressed.current._open();
        } else {
            playSound(SOUNDS.error);
        }

        if (this.next === 10) {
            playSound(SOUNDS.win);
            this.props.onWin();
        }

        this.running = false;
    }

    async componentDidMount() {
        SOUNDS.open.loadAsync(require(sounds_repo + 'card_opening.mp3'));
        SOUNDS.shuffle.loadAsync(require(sounds_repo + 'card_slide.mp3'));
        SOUNDS.error.loadAsync(require(sounds_repo + 'error_tone.mp3'));
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