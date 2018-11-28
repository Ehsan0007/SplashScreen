// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, AsyncStorage } from 'react-native'
import firebase from "react-native-firebase";

var Token;

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            name: '',
            loading: false
        }
        firebase
            .messaging()
            .getToken()
            .then(token => {
                // console.warn("Device firebase Token: ", token);
                Token = token;
            });
    }

    getRef() {
        return firebase.database().ref();
    }
    async handleSignUp() {
        const { email, password, name } = this.state;
        this.setState({ errorMessage: null, loading: true });
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ loading: false });
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({ errorMessage, loading: false });
            });

        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("password", password);

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.warn(user.uid, user.email);
                this.getRef()
                    .child("friends")
                    .push({
                        email: email,
                        uid: user.uid,
                        name: this.state.name,
                        token: Token
                    });
                this.props.navigation.navigate('Main')
                this.setState({
                    loading: false
                });
            }
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Name"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <View style={{ marginBottom: 10 }}></View>
                {this.props.loading ? <ActivityIndicator color="blue" /> : <Button title="Sign Up" onPress={this.handleSignUp.bind(this)} />}
                <View style={{ marginBottom: 20 }}></View>
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: '#dbdbdb',
        borderWidth: 1,
        marginTop: 8,
        padding: 10,
    }
})