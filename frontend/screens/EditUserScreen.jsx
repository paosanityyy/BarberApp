import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../AuthContext'; 

const EditUserScreen = ({ route, navigation }) => {
  const { user, updateUserDetails } = useAuth();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

    const handleSubmit = async () => {
      try {
          // Attempt to update user details
          await updateUserDetails({ firstName, lastName, email, phone });
          
          // On success, show an alert and navigate back
          Alert.alert(
              "Success", 
              "User details updated successfully",
              [{ text: "OK", onPress: () => navigation.navigate('My Account') }]
          );
      } catch (error) {
          console.error('Error updating user details:', error);
          Alert.alert("Error", 
          "Failed to update user details.");
      }
  };


  return (
    <View style={styles.container}>
       <Text style={styles.header}>Edit Account Details</Text>
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
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 0,
  },
    bodyLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 50,
        color: '#c0c0c0'
      },
    editInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0, // Set borderWidth to 0 to remove all borders
        borderBottomWidth: 0.5, // Apply border only to the bottom
        padding: 0,
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
