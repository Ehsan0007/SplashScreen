import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, StyleSheet, Image,FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from "react-native-firebase";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';

var name, uid, email;

class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            uid: null,
            email: "",
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loading: true
        };
        this.friendsRef = this.getRef().child("friends");
    }
    listenForItems(friendsRef) {
        var user = firebase.auth().currentUser;

        friendsRef.on("value", snap => {
            // get children as an array
            var items = [];
            snap.forEach(child => {
                // console.warn("child value", child)
                if (child.val().email != user.email)
                    items.push({
                        name: child.val().name,
                        uid: child.val().uid,
                        email: child.val().email,
                        image : child.val().image
                    });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                loading: false
            });
        });
    }
    getRef() {
        return firebase.database().ref();
    }
    componentDidMount() {
        this.listenForItems(this.friendsRef);
    }
    renderRow = rowData => {
        return (
            <TouchableOpacity
                onPress={() => {
                    name = rowData.name;
                    email = rowData.email;
                    uid = rowData.uid;
                    this.props.navigation.navigate("Chat", {
                        name: name,
                        email: email,
                        uid: uid,
                    });
                }}
            >
                <View style={{ width: '100%', height: 70, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderBottomColor: "#ccc", borderTopColor: "transparent", borderRightColor: "transparent", borderLeftColor: "transparent" }}>
                    <View style={{ width: '90%', alignSelf: "center", flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={{ width: '25%', justifyContent: 'center' }}>
                            <Thumbnail source={{ uri: rowData.image }} style={styles.profileImage} />
                        </View>
                        <View style={{ width: '50%', justifyContent: 'center' }}>
                            <Text>{rowData.name}</Text>
                        </View>
                        <View style={{ width: '25%', alignItems: "flex-end", justifyContent: 'center' }}>
                            <Icon name="ios-arrow-forward" size={20} />
                        </View>
                        {/* <Text>dfsddf</Text> */}
                        {/* <Text>dfsddf</Text> */}
                    </View>
                </View>
            </TouchableOpacity>

            // <TouchableOpacity
            //     onPress={() => {
            //         name = rowData.name;
            //         email = rowData.email;
            //         uid = rowData.uid;
            //         this.props.navigation.navigate("Chat", {
            //             name: name,
            //             email: email,
            //             uid: uid
            //         });
            //     }}
            // >
            //     <View style={styles.profileContainer}>
            //         <Image
            //             source={{ uri: rowData.image }}
            //             style={styles.profileImage}
            //         />
            //         <Text style={styles.profileName}>{rowData.name}</Text>
            //     </View>
            // </TouchableOpacity>
        );
    };
    handleSignout() {
        firebase.auth().signOut()
            .then(() => { this.props.navigation.navigate("Login") }, )
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 0.5, width: '100%', backgroundColor: '#3173FA', justifyContent: 'center', }}>
                    <View style={{ width: '90%', alignSelf: "center", justifyContent: "space-between", flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                            <Ionicons name="arrow-left" size={16} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff" }}>Friend List</Text>
                        <TouchableOpacity onPress={() => this.handleSignout()}>
                            <Text style={{ color: "#fff" }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />
                    {/* <Spinner visible={this.state.loading} /> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3.5,
        width: '100%',
        // alignItems: "stretch",
        marginRight: 10,
        // marginLeft: 10,
    },
    rightButton: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 10,
        padding: 0
    },
    topGroup: {
        flexDirection: "row",
        margin: 10
    },
    myFriends: {
        flex: 1,
        color: "#3A5BB1",
        //tintColor: "#fff",
        //secondaryColor: '#E9E9E9',
        //grayColor: '#A5A5A5',
        fontSize: 16,
        padding: 5
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginLeft: 6,
        marginBottom: 8
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 6
    },
    profileName: {
        marginLeft: 10,
        fontSize: 16
    }
});

export default SettingsScreen;
