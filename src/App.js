import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Routes from './routes'

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
            <Routes />
        );
    }
}

export default App;
