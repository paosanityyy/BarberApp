import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-native';

const EditClientAccountScreen = ({ navigation }) => {
    const { id } = useParams();
    const { user, setUser } = useContext(AuthContext);
    const [editedUser, setEditedUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (user) {
            setEditedUser({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleInputChange = (key, value) => {
        setEditedUser({ ...editedUser, [key]: value });
    };

    const handleSave = async () => {
        try {
            const { data } = await axios.put(`/api/users/${id}`, editedUser);
            setUser(data);
            Alert.alert('User data updated successfully');
            navigation.goBack();
        } catch (err) {
            console.error(err);
            Alert.alert('Error updating user data');
        }
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>User not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Account Details</Text>
            <Text style={styles.bodyLabel}>First name</Text>
            <TextInput
                style={styles.editInput}
                value={editedUser.firstName}
                onChangeText={(text) => handleInputChange('firstName', text)}
            />
            <Text style={styles.bodyLabel}>Last name</Text>
            <TextInput
                style={styles.editInput}
                value={editedUser.lastName}
                onChangeText={(text) => handleInputChange('lastName', text)}
            />
            <Text style={styles.bodyLabel}>Username</Text>
            <TextInput
                style={styles.editInput}
                value={editedUser.username}
                onChangeText={(text) => handleInputChange('username', text)}
            />
            <Text style={styles.bodyLabel}>E-mail</Text>
            <TextInput
                style={styles.editInput}
                value={editedUser.email}
                onChangeText={(text) => handleInputChange('email', text)}
            />
            <Text style={styles.bodyLabel}>Phone</Text>
            <TextInput
                style={styles.editInput}
                value={editedUser.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
            />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <FontAwesomeIcon icon={faSave} size={24} color="white" />
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 60,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    bodyLabel: {
        fontSize: 17,
        marginBottom: 5,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#c0c0c0',
    },
    editInput: {
        paddingTop: 15,
        paddingBottom: 5,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3e3e3e',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
});

export default EditClientAccountScreen;
