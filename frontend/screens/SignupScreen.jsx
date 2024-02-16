import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';


const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpMsg, setSignUpMsg] = useState('');


  const handleSignup = async () => {
    try {
      const signUpResponse = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          username,
          password,
        }),
      });

      if (signUpResponse.status === 201) {
        setSignUpMsg('Account created successfully');
      } else {
        setSignUpMsg('Account creation failed');
      }
    } catch (error) {
      console.error('Error signing up', error);
    }   
};

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.createTitle}>Create Account</Text>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="grey"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="grey"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="grey"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Phone"
        placeholderTextColor="grey"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="grey"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="grey"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonTxt}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.jumpTo('Login')}>
        <Text style={styles.goToLogin}>Already have an account? Login</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>© 2023 Central Studios. All Rights Reserved.</Text>
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
    marginBottom: 10,
    borderRadius: 5,
  },
  footerText: {
    textAlign: 'center',
    padding: 15,
    marginBottom: 30,
    marginTop: 80,
    fontWeight: '100',
    fontSize: 16,
  },
  buttonTxt: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});

export default SignupScreen;
