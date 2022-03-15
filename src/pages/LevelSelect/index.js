import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { t } from "../../../resources/locales";

import styles from './styles';

const logo = require('../../../assets/icon.png');

export default class LevelSelect extends Component {
    constructor(props) {
        super(props);
    }

    _play = (complexity) => {
        this.props.navigation.push('Game', { complexity });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={logo} />

                <Text style={styles.title}>{t("difficulty")}</Text>

                <TouchableOpacity style={styles.button} onPress={() => this._play('easy')}>
                    <Text style={styles.buttonText}>{t('easy')}</Text>
                    <MaterialCommunityIcons name="cards-diamond" size={35} style={[styles.icon, {
                        color: '#DC143C'
                    }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this._play('medium')}>
                    <Text style={styles.buttonText}>{t('medium')}</Text>
                    <MaterialCommunityIcons name="cards-spade" size={35} style={[styles.icon, {
                        color: '#000'
                    }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this._play('hard')}>
                    <Text style={styles.buttonText}>{t('hard')}</Text>
                    <MaterialCommunityIcons name="cards-heart" size={35} style={[styles.icon, {
                        color: '#DC143C'
                    }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this._play('unfair')}>
                    <Text style={styles.buttonText}>{t('unfair')}</Text>
                    <MaterialCommunityIcons name="cards-club" size={35} style={[styles.icon, {
                        color: '#000'
                    }]} />
                </TouchableOpacity>


                <TouchableOpacity style={styles.back_button} onPress={this.props.navigation.goBack}>
                    <MaterialCommunityIcons name="arrow-left" size={20} style={styles.back_icon} />
                    <Text style={styles.back_buttonText}>{t('back')}</Text>
                </TouchableOpacity>
            </View>
        );
    }

};