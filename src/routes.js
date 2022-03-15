import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home';
import Game from './pages/Game';
import Scoreboard from './pages/Scoreboard';
import LevelSelect from './pages/LevelSelect';
import Rules from './pages/Rules';
import About from './pages/About';

const AppStack = createStackNavigator();

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Game" component={Game} />
                <AppStack.Screen name="Scoreboard" component={Scoreboard} />
                <AppStack.Screen name="LevelSelect" component={LevelSelect} />
                <AppStack.Screen name="Rules" component={Rules} />
                <AppStack.Screen name="About" component={About} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}