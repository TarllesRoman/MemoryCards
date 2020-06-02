import React, {Component} from 'react';
import { View, Text } from 'react-native';

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
                <Text styles={styles.footerText}>ads</Text>
            </View>
        );
    }

};