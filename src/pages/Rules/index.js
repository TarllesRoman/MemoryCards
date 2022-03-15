import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { t } from "../../../resources/locales";

import styles from './styles';

const logo = require('../../../assets/icon.png');

export default class Rules extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.title}>{t('rules')}</Text>

                <ScrollView style={styles.scroll_view}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: 'center'
                    }}>
                        {`\u2022 \n ${t('rule_1')} \n`}
                        {`\u2022 \n ${t('rule_2')} \n`}
                        {`\u2022 \n ${t('rule_3')} \n`}
                        {`\u2022 \n ${t('rule_4')} \n`}
                        {`\u2022 \n ${t('rule_5')} \n`}
                        {`\u2022 \n ${t('rule_6')} \n`}
                        {`\u2022 \n ${t('rule_7')} \n`}

                    </Text>
                </ScrollView>

                <TouchableOpacity style={styles.back_button} onPress={this.props.navigation.goBack}>
                    <MaterialCommunityIcons name="arrow-left" size={20} style={styles.back_icon} />
                    <Text style={styles.back_buttonText}>{t('back')}</Text>
                </TouchableOpacity>
            </View>
        );
    }

};