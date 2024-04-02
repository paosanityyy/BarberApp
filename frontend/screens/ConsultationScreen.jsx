import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Picker, TextInput, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Platform} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ConsultationScreen = () => {
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

    <Text style={styles.title}>Consultation Screen</Text>

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

    <View style={styles.bottomContent}>
    <TextInput 
            placeholder="Message..."
            placeholderTextColor="#c0c0c0"
            style={styles.input}
        />
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
    // fontFamily: 'Roboto',
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
    // fontFamily: 'Roboto',
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
    // fontFamily: 'Roboto',
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
});

export default ConsultationScreen