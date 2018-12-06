// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, AsyncStorage, KeyboardAvoidingView, Image, PixelRatio, TouchableOpacity } from 'react-native'
import firebase from "react-native-firebase";
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'react-native-fetch-blob'

var Token;

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            name: '',
            loading: false,
            avatarSource: null,
            imageUrl: "",
            imageloading: true,
            imagePathSource: ""
        }
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
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
    handleSignUp = () => {
        this.setState({ loading: true });
        const { email, password, name, imageloading } = this.state;
        // this.setState({ imageloading: true });
        if (!email == "" && !password == "") {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    if (user) {
                        let uuid = user.user._user.uid
                        this.getRef()
                            .child("friends")
                            .push({
                                email: email,
                                uid: uuid,
                                name: this.state.name,
                                image: this.state.imageUrl,
                                token: Token
                            });
                        this.props.navigation.navigate('Main')
                        this.setState({ loading: false })
                     
                    }   // firebase.auth().onAuthStateChanged((data) => {
                        //     if (data) {

                        //     }
                        // })

                })
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    this.setState({ errorMessage, loading: false });
                });

        } else {
            this.setState({ errorMessage: "please add empty field" })
        }
        // firebase.auth().onAuthStateChanged(user => {
        //     if (user) {

        //     }
        // });
    }

    selectPhotoTapped() {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            includeBase64: true,
            includeExif: true,
        }).then(image => {
            this.setState({
                avatarSource: { uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height },

            });
            const imagePath = image.path
            this.setState({ imagePathSource: imagePath })
            let uploadBlob = null
            const Blob = RNFetchBlob.polyfill.Blob
            const fs = RNFetchBlob.fs
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
            window.Blob = Blob
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            // let uniqueId = user.user._user.uid
            const imageRef = firebase.storage().ref('images').child(`${text}_dp.jpg`)
            let mime = 'image/jpg'
            fs.readFile(imagePath, 'base64')
                .then((data) => {
                    //console.log(data);
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(imagePath, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    console.log("imagelink", url)
                    this.setState({ imageUrl: url, imageloading: false })
                })
                .catch((error) => {
                    console.log(error)
                })
        })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
        // console.log("state", this.state.imageUrl)
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
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View
                            style={[
                                styles.avatar,
                                styles.avatarContainer,
                                { marginBottom: 20 },
                            ]}
                        >
                            {this.state.avatarSource === null ? (
                                <Text>Select a Photo</Text>
                            ) : (
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                )}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 10 }}></View>
                {this.state.imageloading ?
                    // <ActivityIndicator color="#3173FA" /> 

                    // <TouchableOpacity>
                    <View style={{ padding: 10, backgroundColor: 'gray', }}>
                        <Text style={{ color: 'white' }}>SIGNUP</Text>
                    </View>
                    // </TouchableOpacity>
                    :

                    <TouchableOpacity onPress={this.handleSignUp.bind(this)}>
                        <View style={{ padding: 10, backgroundColor: '#3173FA', }}>
                            <Text style={{ color: 'white' }}>SIGNUP</Text>
                        </View>
                    </TouchableOpacity>
                }
                {/* {this.props.loading ? <ActivityIndicator color="blue" /> : <Button title="Sign Up" onPress={this.handleSignUp.bind(this)} />} */}
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
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
})