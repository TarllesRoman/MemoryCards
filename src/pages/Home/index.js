import React, {Component, createRef} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import { t, LOCALES, setLocale } from "../../../resources/locales";
import prefs from '../../../resources/preferences';


const logo = require('../../../assets/icon.png');
const br_flag = require('../../../assets/Img/brasil.png');
const us_flag = require('../../../assets/Img/estados-unidos.png');

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            lang: LOCALES.pt_br,
        }

        this.navigator = props.navigation;
    }

    async componentDidMount () {
        let lg = await prefs.language();
        if(lg == null) await prefs.setLanguage(this.state.lang);
        else {
            setLocale(lg);
            this.setState({lang: lg});
        }
    }

    async setLanguage( language ) {
        await prefs.setLanguage(language);
        this.setState({lang: language});
    }

    _play = () => {
        this.navigator.push('Game', { complexity: "medium" });
    }

    _scoreboard = () => {
        this.navigator.push('Scoreboard', { complexity: "medium" });
    }
    
    
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={ logo }/>
                
                <Text style={styles.title}>{ t('game_name') }</Text>
                
                <TouchableOpacity style={styles.button} onPress={ this._play }>
                    <Text style={styles.buttonText}>{ t('play') }</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={ this._scoreboard }>
                    <Text style={styles.buttonText}>{ t('scoreb') }</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={ () => console.log("button")}>
                    <Text style={styles.buttonText}>{ t('rules') }</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.button, {marginBottom: 0}]} onPress={ () => console.log("button")}>
                    <Text style={styles.buttonText}>{ t('about') }</Text>
                </TouchableOpacity>
                
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={ (this.state.lang == LOCALES.pt_br)? styles.flag_selected : {} }
                                      onPress={ () => this.setLanguage(LOCALES.pt_br) }
                    >
                        <Image style={styles.flag} source={ br_flag }/>
                    </TouchableOpacity>
                    <TouchableOpacity style={ (this.state.lang == LOCALES.en)? styles.flag_selected : {} }
                                      onPress={ () => this.setLanguage(LOCALES.en) }
                    >
                        <Image style={styles.flag} source={ us_flag }/>
                    </TouchableOpacity>
                </View>
            
            </View>
            );
        }
        
    };