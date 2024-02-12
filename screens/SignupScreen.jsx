import React, { useRef } from 'react';
import { ScrollView, View, Text, Image, Button, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from 'react-native-gesture-handler';

const SignupScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.createTitle}>Create Account</Text>
            <TextInput 
                placeholder="First Name"
                // change placeholder color
                placeholderTextColor="grey"
                style={styles.input}
            />
            <TextInput 
                placeholder="Last Name"
                // change placeholder color
                placeholderTextColor="grey"
                style={styles.input}
            />
            <TextInput 
                placeholder="Email"
                // change placeholder color
                placeholderTextColor="grey"
                style={styles.input}
            />
            <TextInput 
                placeholder="Phone"
                // change placeholder color
                placeholderTextColor="grey"
                style={styles.input}
            />
            <TextInput 
                placeholder="Username"
                // change placeholder color
                placeholderTextColor="grey"
                style={styles.input}
            />
            <TextInput 
                placeholder="Password"
                // change placeholder color
                placeholderTextColor="grey"
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.jumpTo("Home")}>
                <Text style={styles.buttonTxt}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.jumpTo("Login")}>
                <Text style={styles.goToLogin}>Already have an account? Login</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
          © 2023 Central Studios. All Rights Reserved.
        </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    createTitle: {
        padding: 20,
        fontSize: 26,
        fontFamily: 'SourceCodePro',
    },
    goToLogin: {
        color: '#3e3e3e',
        marginTop: 20,
        fontSize: 18,
        fontFamily: 'Roboto',
    },
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 50,
    },
    logo: {
        width: 300,
        height: 75,
        marginBottom: 20,
    },
    input: {
        color: 'black',
        height: 45,
        margin: 8,
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
    footerText: {
        textAlign: 'center',
        padding: 15,
        marginBottom: 30,
        marginTop: 80,
        fontWeight: '100',
        fontSize: 16
      },
    buttonTxt:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
      
})

export default SignupScreen;