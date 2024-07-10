import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(AuthContext);

    const loginUser = async () => {
        try {
            const {data} = await axios.post('/api/users/login', { username, password });
            setUser(data);
            setRedirect(true);
        } catch (err) {
            alert(`Invalid credentials: ${err}`);
        }
    };

    useEffect(() => {
        if (redirect) {
            navigation.navigate('Home');
            setRedirect(false); // Reset redirect state
        }
    }, [redirect]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.createTitle}>Login</Text>
            <TextInput 
                placeholder="Username"
                placeholderTextColor="#c0c0c0"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput 
                placeholder="Password"
                placeholderTextColor="#c0c0c0"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                autoCapitalize="none"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={loginUser}>
                <Text style={styles.buttonTxt}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.jumpTo("Register")}>
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
    },
    goToLogin: {
        color: '#3e3e3e',
        marginTop: 20,
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
