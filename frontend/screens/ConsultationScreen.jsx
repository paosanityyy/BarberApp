import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, Image, Button, Form} from 'react-native';

const ConsultationScreen = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = event => {
    event.preventDefault();

    console.log('We will fill this up shortly.');
    // code to trigger Sending email
  };

  const onInputChange = event => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Inquiry Form</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
          name="fullName"
          placeholder="Full Name"
          placeholderTextColor="#c0c0c0"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          autoCapitalize="none">
      </TextInput>
      <Text style={styles.label}>Email:</Text>
      <TextInput
          name="email"
          placeholder="Email"
          placeholderTextColor="#c0c0c0"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none">
      </TextInput>
      <Text style={styles.label}>Subject:</Text>
      <TextInput
          name="subject"
          placeholder="Subject"
          placeholderTextColor="#c0c0c0"
          value={subject}
          onChangeText={setSubject}
          style={styles.input}
          autoCapitalize="none">
      </TextInput>
      <Text style={styles.label}>Message:</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder="Type your message here..."
        placeholderTextColor="#c0c0c0"
        value={message}
        onChangeText={setMessage}
        style={styles.messageBox}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonTxt}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 20,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
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
  messageBox: {
    width: '90%',
    height: 150, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
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
    fontFamily: 'Roboto',
},
});

export default ConsultationScreen