import React, {Component, createRef} from 'react';
import { View, Modal, Text, TouchableHighlight, TextInput } from 'react-native';

import styles, {modal_styles} from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { createWinner, storeWinners, getWinners } from '../../../resources/tools';
import { t } from "../../../resources/locales";

import Easy from '../../components/Levels/Easy';
import Medium from '../../components/Levels/Medium';

const levels = {
    "easy": Easy,
    "medium": Medium,
}

export default class Game extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modal: false,
            modalwin: false,
            name: t('_name'),
        }

        this.header_ref = createRef();
        this.level_ref = createRef();

        this.complexity = props.route.params.complexity;
        this.level = levels[this.complexity];

        this.attempts = 0;

        this.navigator = props.navigation;
        this.scoreBoard = [];
    }

    _win = async () => {
        this.scoreBoard = await getWinners(this.complexity);
        if(this.scoreBoard === null) this.scoreBoard = [];
        
        if (this.scoreBoard.length < 5) {
            this.setState({modalwin: true});
            return;
        }
        if(this.attempts < this.scoreBoard[this.scoreBoard.length -1].score){
            this.setState({modalwin: true});
            return;
        }
        
        this.setState({modal: true});
    }

    _reset = () => {
        this.attempts = 0;
        this.setState({name: t('_name')});
        this.header_ref.current._resetCounters();
        this.level_ref.current._reinit();
    }

    _incrementMove = () => {
        this.header_ref.current._setAttempts(++this.attempts);
    }

    _incrementNext = (next) => {
        this.header_ref.current._setNext(next);
    }

    _navigateToScoreboard = () => {
        this.setState({modal: false, modalwin: false});
        this.navigator.push('Scoreboard', { complexity: this.complexity });
    }

    _savePlayer = () => {
        let player = createWinner(this.state.name, this.attempts);
        this.scoreBoard.push(player);
        this.scoreBoard = this.scoreBoard.sort((a, b) => a.score - b.score);
        if(this.scoreBoard.length > 5)  this.scoreBoard.pop();

        storeWinners(this.complexity, this.scoreBoard);
        this._navigateToScoreboard();
    }

    render() {
        return (
            <View style={styles.container}>

                <Modal animationType="slide" transparent={true} visible={this.state.modal}>
                    <View style={modal_styles.container}>
                        <View style={modal_styles.view}>
                            <Text style={[modal_styles.text, {fontSize: 30}]}>{ t('congrats') }!!</Text>
                            <Text style={modal_styles.text}>{ t('total_att') }: {this.attempts}</Text>
                            <View style={modal_styles.buttonGroup}>
                                <TouchableHighlight style={modal_styles.button} onPress={() => this.setState({modal: false})}>
                                    <Text style={modal_styles.buttonText}>{ t('back') }</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={[modal_styles.button, {marginLeft: 10}]}
                                 onPress={this._navigateToScoreboard}>
                                    <Text style={modal_styles.buttonText}>{ t('scoreb') }</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal animationType="slide" transparent={true} visible={this.state.modalwin}>
                    <View style={modal_styles.container}>
                        <View style={modal_styles.view}>
                            <Text style={[modal_styles.text, {fontSize: 30}]}>{ t('congrats') }!!</Text>
                            <Text style={modal_styles.text}>{ t('total_att') }: {this.attempts}</Text>
                            <TextInput style={modal_styles.input}
                                onChangeText={text => this.setState({name: text})}
                                value={this.state.name}
                                selectTextOnFocus={true}
                                maxLength={20}
                            />
                            <View style={modal_styles.buttonGroup}>
                                <TouchableHighlight style={modal_styles.button} onPress={() => this.setState({modalwin: false})}>
                                    <Text style={modal_styles.buttonText}>{ t('back') }</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={[modal_styles.button, {marginLeft: 10}]}
                                 onPress={this._savePlayer}>
                                    <Text style={modal_styles.buttonText}>{ t('save') }</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Header ref={this.header_ref}
                    next={1}
                    attempts={0}
                    onreset={this._reset}
                />

                <this.level ref={this.level_ref}
                    onWin={this._win} 
                    moveCounter={this._incrementMove}
                    toNext={(next) => this._incrementNext(next)}
                    timer={this.header_ref}
                />
                
                <Footer />
            </View>
        );
    }

};