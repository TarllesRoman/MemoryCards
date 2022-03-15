import React, {Component} from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

import styles from './styles';

/**
 * TO-DO: Implementar banner do google ads
 * Por enquanto apenas reserva espaço para um banner futuro
 */
export default class Footer extends Component {
    constructor (props) {  
        super(props);
    }

    render() {
        return (
            <View style={styles.footer}>
                <AdMobBanner
                        bannerSize="smartBannerPortrait"
                        adUnitID="ca-app-pub-3960094842497316/3078462083"
                        onDidFailToReceiveAdWithError={ (err) => console.log(err) } 
                />
            </View>
        );
    }

};