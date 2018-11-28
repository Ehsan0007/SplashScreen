import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "react-native-firebase";

var name, uid, email;

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.user = firebase.auth().currentUser;
        const { params } = this.props.navigation.state;
        uid = params.uid;
        name = params.name;
        email = params.email;

        this.chatRef = this.getRef().child("chat/" + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild("order");
        this.onSend = this.onSend.bind(this);
    }

    componentDidMount() {
        this.listenForItems(this.chatRefData);
    }
    componentWillUnmount() {
        this.chatRefData.off();
    }

    listenForItems(chatRef) {
        chatRef.on("value", snap => {
            // get children as an array
            var items = [];
            snap.forEach(child => {
                //var name = child.val().uid == this.user.uid ? this.user.name : name1;
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        _id: child.val().uid
                        //avatar: avatar
                    }
                });
            });

            this.setState({
                loading: false,
                messages: items
            });
        });
    }
    onSend(messages = []) {
        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            //var message = message[0];
            var now = new Date().getTime();
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.user.uid,
                fuid: uid,
                order: -1 * now
            });
        });
    }

    generateChatId() {
        if (this.user.uid > uid) return `${this.user.uid}-${uid}`;
        else return `${uid}-${this.user.uid}`;
    }

    getRef() {
        return firebase.database().ref();
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 0.5, width: '100%', backgroundColor: '#3173FA', justifyContent: 'center', }}>
                    <View style={{ width: '90%', alignSelf: "center", justifyContent: "space-between", flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                            <Ionicons name="arrow-left" size={16} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff" }}>{name ? name : "Abc"}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                            <Text style={{ color: "#fff" }}></Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={this.onSend.bind(this)}
                        user={{
                            _id: this.user.uid
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3.5,
        alignItems: "stretch",
        marginRight: 10,
        marginLeft: 10
    }
});

export default ChatScreen;
