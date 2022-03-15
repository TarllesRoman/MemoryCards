import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid, ScrollView, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { t } from "../../../resources/locales";

import styles from './styles';

const logo = require('../../../assets/icon.png');

export default class About extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.title}>{t('about')}</Text>

                <ScrollView style={styles.scroll_view}>
                    <Text style={{
                        fontSize: 18,
                        textAlign: 'justify'
                    }}>
                        {t('about_1')}
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        textAlign: 'center'
                    }}>
                        {`\u2022 \n ${t('about_2')} \n`}
                        {`\u2022 \n ${t('about_3')} \n`}
                        {`\u2022 \n ${t('about_4')} \n`}
                        {`\u2022 \n ${t('about_5')} \n`}
                        {`\u2022 \n ${t('about_6')} \n`}
                        {`\u2022 \n ${t('about_7')} \n`}
                    </Text>
                    <TouchableOpacity style={styles.contact_button}>
                        <MaterialCommunityIcons name="email-edit" size={40} style={styles.contact_icon}
                            onPress={() => Linking.openURL('mailto:roman.tarlles@gmail.com')}
                            />
                        <MaterialCommunityIcons name="github-box" size={40} style={styles.contact_icon}
                            onPress={() => Linking.openURL('https://github.com/TarllesRoman')}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 12,
                        textAlign: 'center'
                    }}>
                        {`\u2022 \n Tarlles Roman Sfredo © 2020 \n`}
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