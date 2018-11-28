import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 0.5, width: '100%', backgroundColor: '#3173FA', justifyContent: 'center', }}>
                    <View style={{ width: '90%', alignSelf: "center", justifyContent: "space-between", flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                            <Ionicons name="arrow-left" size={16} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff" }}>Home</Text>
                        <Text style={{ color: "#fff" }}>Logout</Text>
                    </View>
                </View>
                <View style={{ flex: 3.5, justifyContent: 'center', alignItems: "center" }}>
                    <Text>Home Page</Text>
                    <Text>Move To Friend Tab for Chat</Text>
                </View>
            </View>
        );
    }
}

export default HomeScreen;
