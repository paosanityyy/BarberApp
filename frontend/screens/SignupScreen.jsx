import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpMsg, setSignUpMsg] = useState('');

  const handleSignup = async () => {
    try {
      const signUpResponse = await axios.post('http://localhost:3000/api/users/signup', {
        firstName,
        lastName,
        email,
        phone,
        username,
        password,
      });

      // Check if the response status is 201
      if (signUpResponse.status === 201) {
        // If successful, display the success message
        setSignUpMsg('Account created successfully');
      } else {
        // If not successful, display a generic error message
        setSignUpMsg('Account creation failed');
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // If there's a response from the server, log the details
        console.error('Server responded with an error status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // If there's no response from the server, log the request details
        console.error('No response received from the server');
        console.error('Request data:', error.request);
      } else {
        // If there's an error setting up the request, log the error message
        console.error('Error setting up the request:', error.message);
      }
      // Display a generic error message to the user
      setSignUpMsg('Error signing up. Please try again.');
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
        autoCapitalize='none'
      />
      <TextInput
        placeholder="Phone"
        placeholderTextColor="grey"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="grey"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize='none'
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="grey"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonTxt}>Sign Up</Text>
      </TouchableOpacity>
      {/* display message when sign up fails */}
      <Text style={{ color: 'red' }}>{signUpMsg}</Text>
      
      <TouchableOpacity onPress={() => navigation.jumpTo('Login')}>
        <Text style={styles.goToLogin}>Already have an account? Login</Text>
      </TouchableOpacity>
      {signUpMsg ? <Text>{signUpMsg}</Text> : null}
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
    // fontFamily: 'Roboto',
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
    // fontFamily: 'Roboto',
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
    // fontFamily: 'Roboto',
  },
});

export default SignupScreen;
