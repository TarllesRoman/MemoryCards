import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import { getWinners } from '../../../resources/tools';
import { t } from "../../../resources/locales";
import { TouchableOpacity } from 'react-native-gesture-handler';

const trophy_colors = ['#FFD700', '#C0C0C0', '#B8860B', '#A0522D', '#8B4513'];
const suite_colors = ['#000', '#DC143C'];
const complexities = ['easy', 'medium', 'hard', 'unfair'];

export default class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }

        this.index_complexity = 0;
        this.params = props.route.params;
        this.level = "";
        this.icon = "cards-outline";
        this.iconColor = "black";
        this.winners = [];

        this.init(this.params.complexity);
    }

    init(complexity) {
        if (this.index_complexity < 0) {
            this.index_complexity = 0;
            return;
        }
        if (this.index_complexity > 3) {
            this.index_complexity = 3;
            return;
        }
        switch (complexity) {
            case "easy":
                this.icon = "cards-diamond";
                this.iconColor = suite_colors[1];
                this.level = t('easy');
                this.index_complexity = 0;
                break;
            case "medium":
                this.icon = "cards-spade";
                this.iconColor = suite_colors[0];
                this.level = t('medium');
                this.index_complexity = 1;
                break;
            case "hard":
                this.icon = "cards-heart";
                this.iconColor = suite_colors[1];
                this.level = t('hard');
                this.index_complexity = 2;
                break;
            case "unfair":
                this.icon = "cards-club";
                this.iconColor = suite_colors[0];
                this.level = t('unfair');
                this.index_complexity = 3;
                break;
            default:
                this.icon = "cards-spade";
                this.iconColor = suite_colors[0];
                this.level = t('medium');
                this.index_complexity = 1;
                break;
        }
        this.loadWinners(complexity);
    }

    loadWinners = async (complexity) => {
        this.winners = await getWinners(complexity);
        if (!this.winners) this.winners = [];
        this.setState({ loaded: true });
    }

    render_players = () => {
        const wins = this.winners.map((winner, index) =>
            <View style={styles.player} key={index.toString()}>
                <View style={styles.playerInfos}>
                    <Text style={[styles.playerProperty, { fontSize: 20, color: trophy_colors[index] }]}>
                        {index + 1}º
                        <MaterialCommunityIcons name="trophy" size={16} />
                    </Text>
                    <Text style={styles.playerProperty}>{winner.name}</Text>
                    <Text style={[styles.playerProperty, { paddingLeft: 25 }]}>{winner.score}</Text>
                </View>
            </View>
        );
        return (wins);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header} >
                    <Text style={styles.title}>{t('scoreb')}</Text>

                    <View style={styles.level}>
                        <MaterialCommunityIcons name="chevron-left" size={42} color={this.iconColor}
                            style={{ opacity: (this.index_complexity > 0)? 1 : 0.45 }}
                            onPress={() => this.init(complexities[--this.index_complexity])}
                        />
                        <MaterialCommunityIcons name={this.icon} size={50} color={this.iconColor} />
                        <MaterialCommunityIcons name="chevron-right" size={42} color={this.iconColor}
                            style={{ opacity: (this.index_complexity < 3)? 1 : 0.45 }}
                            onPress={() => this.init(complexities[++this.index_complexity])}
                        />
                    </View>
                    <Text style={styles.headerText}>{t('difficulty')}: {this.level}</Text>
                </View>


                <View style={styles.listHeader}>
                    <Text style={styles.headerText}>{t('position')}</Text>
                    <Text style={styles.headerText}>{t('attempts')}</Text>
                </View>

                <View style={styles.playerList}>
                    <this.render_players />
                </View>

                <TouchableOpacity style={styles.button} onPress={this.props.navigation.goBack}>
                    <MaterialCommunityIcons name="arrow-left" size={20} style={styles.icon} />
                    <Text style={styles.buttonText}>{t('back')}</Text>
                </TouchableOpacity>
            </View>
        );
    }
};