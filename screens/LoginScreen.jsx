import React, { useState } from 'react';
import {  View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';


const LoginScreen = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [users] = useState([
        {username: 'admin', password: 'admin'},
        {username: 'user', password: 'user'},
    ]);

    const loginUser = () => {
        if (!userName || !userPassword) {
            alert('Please fill in all fields');
            return;
        }
        // Check if the user is the admin
        if (userName === 'admin' && userPassword === 'admin') {
            // Navigate to the AdminScreen
            navigation.navigate('Admin');
            // Clear the input fields
            setUserName('');
            setUserPassword('');
            return;
        }
        const matchedUser = users.find(user => user.username === userName && user.password === userPassword);

        if (matchedUser) {
            // Credentials match, navigate to the Home screen
            navigation.navigate('Home');
        } else {
            // Credentials do not match, display an alert
            alert('Invalid username or password');
        }

        // Clear the input fields
        setUserName('');
        setUserPassword('');
    };


    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.createTitle}>Login</Text>
            <TextInput 
                placeholder="Username"
                // change placeholder color
                placeholderTextColor="#c0c0c0"
                value={userName}
                onChangeText={setUserName}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput 
                placeholder="Password"
                // change placeholder color
                placeholderTextColor="#c0c0c0"
                value={userPassword}
                onChangeText={setUserPassword}
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={loginUser}>
                <Text style={styles.buttonTxt}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.jumpTo("Signup")}>
                <Text style={styles.goToLogin}>Don't have an account yet? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    createTitle: {
        padding: 20,
        fontSize: 20,
        fontFamily: 'Roboto',
    },
    goToLogin
    : {
        color: '#3e3e3e',
        marginTop: 20,
        fontFamily: 'Roboto',
    },
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20,
    },
    logo: {
        width: 300,
        height: 75,
        marginBottom: 20,
    },
    input: {
        color: 'black',
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 0,
        width: 350,
        fontFamily: 'Roboto',
      },
    button: {
        marginTop: 20,
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 175,
        marginBottom:10,
        borderRadius: 5
    },
    buttonTxt:{
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
      
})

export default LoginScreen;