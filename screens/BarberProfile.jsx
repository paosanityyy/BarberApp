import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faComment, faHistory, faSave } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';

const BarberProfile = ({ navigation }) => {
  const { user, updateUserDetails } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });

  if (!user) {
    // Display login message if no user is logged in
    return (
        <View style={styles.container}>
          <View style={styles.noUser}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.goToLogin}>Log in to book an appointment</Text>
            </TouchableOpacity>
            <Text style={styles.NoUserfooterText}>© 2023 Central Studios. All Rights Reserved.</Text>
          </View>
        </View>
    );
  }

  const handleSave = async () => {
    try {
      await updateUserDetails(editedUser);
      setEditMode(false);
      Alert.alert("Success", "User details updated successfully");
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert("Error", "Failed to update user details.");
    }
  };

  const renderEditableField = (label, value, onChangeText) => (
      <View style={styles.editableFieldContainer}>
        <Text style={styles.bodyLabel}>{label}</Text>
        <TextInput
            style={[styles.editInput, editMode ? styles.editInputEditable : styles.editInputNonEditable]}
            value={value}
            onChangeText={(text) => onChangeText(text)}
            editable={editMode}
        />
      </View>
  );

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Account Details</Text>
            {editMode ? (
                <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
                  <FontAwesomeIcon icon={faSave} size={24} color="black" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => setEditMode(true)} style={styles.actionButton}>
                  <FontAwesomeIcon icon={faEdit} size={24} color="black" />
                </TouchableOpacity>
            )}
          </View>

          {renderEditableField('First name', editedUser.firstName, (text) => setEditedUser({ ...editedUser, firstName: text }))}
          {renderEditableField('Last name', editedUser.lastName, (text) => setEditedUser({ ...editedUser, lastName: text }))}
          {renderEditableField('Email', editedUser.email, (text) => setEditedUser({ ...editedUser, email: text }))}
          {renderEditableField('Phone', editedUser.phone, (text) => setEditedUser({ ...editedUser, phone: text }))}

          <TouchableOpacity
              style={styles.bookingHistoryButton}
              onPress={() => navigation.navigate('ViewAppointment')}
          >
            <FontAwesomeIcon icon={faHistory} size={18} color="#FFF" />
            <Text style={styles.bookingHistoryButtonText}>View Bookings</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.footerText}>
          © 2023 Central Studios. All Rights Reserved.
        </Text>

        <TouchableOpacity style={styles.fab} onPress={() => navigation.jumpTo("Consultation")}>
          <FontAwesomeIcon icon={faComment} color='#ffffff' size={24} />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
  scrollView: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,

  },
  editButtonIcon: {
    marginTop: 0,
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    margin: 20,
    alignItems: 'center',
    borderRadius: 5,
    width: 200,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
  editableFieldContainer: {
    marginBottom: 15,
  },
  bodyLabel: {
    fontSize: 17,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#282727'
  },
  editInput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 16,

  },
  fab: {
    position: 'absolute',
    backgroundColor: '#8d8d8d',
    right: 16,
    bottom: 16,
    padding: 20,
    borderRadius: 100,
  },
  bookingHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3e3e3e',
    padding: 10,
    margin: 40,
    alignSelf: 'center',
    borderRadius: 5,
    width: 170,
  },
  bookingHistoryButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 50,
  },
  editInputEditable: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  editInputNonEditable: {
    borderBottomWidth: 0,
  },
  footerText: {
    textAlign: 'center',
    padding: 15,
    marginBottom: 30,
    fontWeight: '100',
  },
});

export default BarberProfile;
