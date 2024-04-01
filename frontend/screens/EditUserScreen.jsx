import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useAuth } from '../AuthContext';

const EditUserScreen = ({ route, navigation }) => {
  const { user, updateUserDetails } = useAuth();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = async () => {
    // Send a request to your backend to update the user details
    // On success, update the global state/context with the new details
    updateUserDetails({ firstName, lastName, email, phone });
    navigation.goBack(); // Navigate back to the MyAccount screen
  };

  return (
    <View style={styles.container}>
    <Text style={styles.bodyLabel}>First name</Text>
      <TextInput
       style={styles.editInput}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
      />
      <Text style={styles.bodyLabel}>Last name</Text>
      <TextInput
       style={styles.editInput}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
      />
       <Text style={styles.bodyLabel}>Email address</Text>
      <TextInput
       style={styles.editInput}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
       <Text style={styles.bodyLabel}>Phone number</Text>
      <TextInput
       style={styles.editInput}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
      />
    {/* <Button title="Save" onPress={handleSubmit} /> */}
    <TouchableOpacity style={styles.editButton} onPress={handleSubmit}>
        <Text style={styles.editButtonText}>Save</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
              © 2023 Central Studios. All Rights Reserved.
            </Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    height: '100%',
    backgroundColor: 'white',
  },
    bodyLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 50,
      },
    editInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 0,
    },  
    editButton: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 175,
        marginTop: 50,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'center',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    editButtonText: {   
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    footerText: {
        textAlign: 'center',
        padding: 15,
        marginBottom: 30,
        marginTop: 170,
        fontWeight: '100',
      },
});

export default EditUserScreen;
