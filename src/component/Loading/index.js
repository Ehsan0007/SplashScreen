import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from "react-native-firebase";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            // console.warn("user", user)
            this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <Text> Loading </Text>
            </View>
        );
    }
}

export default Loading;
