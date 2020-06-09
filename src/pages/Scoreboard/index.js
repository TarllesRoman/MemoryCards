import React, {Component} from 'react';
import { View, Text, FlatList } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import styles from './styles';
import Footer from '../../components/Footer';
import { getWinners } from '../../../resources/tools';
import { t } from "../../../resources/locales";

const trophy_colors = ['#FFD700', '#C0C0C0', '#B8860B', '#A0522D', '#8B4513'];
const suite_colors = ['#000', '#DC143C'];

export default class Scoreboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
        }

        this.params = props.route.params;
        this.level = "";
        this.icon = "cards-outline";
        this.iconColor = "black";
        this.winners = [];

        switch(this.params.complexity){
            case "easy":
                this.icon = "cards-diamond";
                this.iconColor = suite_colors[1];
                this.level = t('easy');
                break;
            case "medium":
                this.icon = "cards-spade";
                this.iconColor = suite_colors[0];
                this.level = t('medium');
                break;
            case "hard":
                this.icon = "cards-heart";
                this.iconColor = suite_colors[1];
                this.level = t('hard');
                break;
            case "unfair":
                this.icon = "cards-club";
                this.iconColor = suite_colors[0];
                this.level = t('unfair');
                break;
        }
        this.loadWinners();
    }

    loadWinners = async () => {
        this.winners = await getWinners(this.params.complexity);
        this.setState({loaded: true});
    }

    render_players = () => {
        const wins = this.winners.map( (winner, index) => 
            <View style={styles.player} key={index.toString()}>
                <View style={styles.playerInfos}>
                    <Text style={[styles.playerProperty, {fontSize: 20, color: trophy_colors[index] }]}>
                        {index + 1}º
                        <MaterialCommunityIcons name="trophy" size={16}  />
                    </Text>
                    <Text style={styles.playerProperty}>{winner.name}</Text>
                    <Text style={styles.playerProperty}>{winner.score}</Text>
                </View>
            </View>
        );
        return (wins);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header} >
                    <Text style={styles.title}>{ t('scoreb') }</Text>
                    <MaterialCommunityIcons name={this.icon} size={50} color={this.iconColor} />
                    <Text style={styles.headerText}>{ t('difficulty') }: {this.level}</Text>
                </View>


                <View style={styles.listHeader}>
                    <Text style={styles.headerText}>{ t('position') }</Text>
                    <Text style={styles.headerText}>{ t('attempts') }</Text>
                </View>

                <View style={styles.playerList}>
                    <this.render_players />
                </View>

                <Footer />
            </View>
        );
    }
};