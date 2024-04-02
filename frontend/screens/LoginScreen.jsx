import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from '../AuthContext'; // Import the useAuth hook from your authentication context

const LoginScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const { login } = useAuth(); // Destructure the login function from the authentication context

    const loginUser = async () => {
        if (!userName || !userPassword) {
            alert('Please fill in all fields');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userName, password: userPassword }),
            });
    
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const data = await response.json();
    
            // Assuming the response data includes user details such as email and phone
            login(data.user); // Pass the user object to your login function

            setUserName('');
            setUserPassword('');

            // Navigate based on user role
            if (data.user.role === 'admin') {
                navigation.navigate('Admin'); // Navigate to Admin screen if user is an admin
            } else if (data.user.role === 'barber') {
                navigation.navigate('Home'); // Navigate to Barber screen if user is a barber
            } else {
                navigation.navigate('Home'); // Navigate to Home screen for other roles
            }
        } catch (error) {
            console.error('Login error:', error.message);
            alert('Invalid username or password');
        }
    };
    
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.createTitle}>Login</Text>
            <TextInput 
                placeholder="Username"
                placeholderTextColor="#c0c0c0"
                value={userName}
                onChangeText={setUserName}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput 
                placeholder="Password"
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
        // fontFamily: 'Roboto',
        fontSize: 18,
    },
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20,
    },
    logo: {
        marginTop: 100,
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
        // fontFamily: 'Roboto',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 175,
        marginBottom: 10,
        borderRadius: 5
    },
    buttonTxt: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        // fontFamily: 'Roboto',
        fontFamily: 'SourceCodePro',
    },
    footerText: {
        textAlign: 'center',
        padding: 15,
        marginBottom: 30,
        marginTop: 180,
        fontWeight: '100',
        fontSize: 16
    },
});

export default LoginScreen;
