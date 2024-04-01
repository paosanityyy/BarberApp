import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, Image} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { io } from "socket.io-client";

const ConsultationScreen = () => {

  // const socket = io('http://localhost:5000');

  const socket = io();
  socket.on('connect', () => {
    console.log('Connected to socket.io');
  });
  socket.on('message', (message) => { 
    console.log(message);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from socket.io');
  });

  const [selectedBarber, setSelectedBarber] = useState('JR');
  const [isBarberModalVisible, setBarberModalVisible] = useState(false);

  const barbers = ['JR', 'Kurt', 'Renz', 'Henok'];

  const renderModalContent = (options, selectedValue, setValue, setModalVisible) => (
    <Modal
        transparent={true}
        visible={true}
        onRequestClose={() => setModalVisible(false)}
    >
        <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
        >
            <View style={styles.modalContent}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.modalItem}
                        onPress={() => {
                            setValue(option);
                            setModalVisible(false);
                        }}
                    >
                        <Text style={{color: selectedValue === option ? '#000' : '#666'}}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </TouchableOpacity>
    </Modal>
);

  return (

    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
  >

    <Text style={styles.title}>Live Consultation</Text>

    <View style={styles.dropdownContainer}>
        <Text style={styles.headerTxt}>Select Barber: </Text>
        <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setBarberModalVisible(true)}
        >
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                <Text style={styles.selectedField}>{selectedBarber}</Text>
                <FontAwesomeIcon icon={faChevronDown} size={12} color="#000" />
            </View>
        </TouchableOpacity>
        {isBarberModalVisible && renderModalContent(barbers, selectedBarber, setSelectedBarber, setBarberModalVisible)}
    </View>

    <TouchableOpacity style={styles.button}> 
          <Text style={styles.buttonTxt}>Chat</Text>
        </TouchableOpacity>

    <View style={styles.bottomContent}>
        <TextInput 
            placeholder="Message..."
            placeholderTextColor="#c0c0c0"
            style={styles.input}
        />
        <TouchableOpacity>
        <Image
          source={require('../assets/send.png')}
          style={styles.buttonSend}
        />
        </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    
  },
  input: {
    color: 'black',
    height: 40,
    margin: 10,
    borderBottomWidth: 1,
    padding: 0,
    width: 350,
    fontFamily: 'Roboto',
  },
  dropdownButton: {
    width: 200,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  headerTxt: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 0,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  dropdownContainer:{
    flexDirection: 'row',
  },
  selectedField: {
    fontFamily: 'Roboto',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
  },
  modalItem: {
      padding: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#eee',
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 90,
  },
  button: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    width: 100,
    marginBottom:10,
    borderRadius: 5,
    fontfamily: 'Roboto',
  },
  buttonTxt:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  buttonSend:{
    width: 40,
    height: 40,
  },
});

export default ConsultationScreen