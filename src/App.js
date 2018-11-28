import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import RootSwitch from './routes'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <RootSwitch />
        );
    }
}

export default App;
