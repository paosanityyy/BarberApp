import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import axios from "axios";

const EditBarberScreen = ({route, navigation}) => {

    const {userDetails} = route.params;

    const [username, setUsername] = useState(userDetails.username);
    const [firstName, setFirstName] = useState(userDetails.firstName);
    const [lastName, setLastName] = useState(userDetails.lastName);
    const [email, setEmail] = useState(userDetails.email);
    const [phone, setPhone] = useState(userDetails.phone);

    useEffect(() => {
        // Update state when userDetails change
        setUsername(userDetails.username);
        setFirstName(userDetails.firstName);
        setLastName(userDetails.lastName);
        setEmail(userDetails.email);
        setPhone(userDetails.phone);
    }, [userDetails]);

    const handleSubmit = async () => {
        try {
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            };
            // Attempt to update user details
            await axios.put( `/api/users/${userDetails._id}`, userData);
            // On success, show an alert and navigate back
            Alert.alert(
                "Success",
                "User details updated successfully",
                [{text: "OK", onPress: () => navigation.navigate('BarberList')}]

            );
        } catch (error) {
            console.error('Error updating user details:', error);
            Alert.alert("Error",
                "Failed to update user details.");
        }
    };

    const handleBack = () => {
        navigation.navigate('BarberList');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Account Details</Text>
            <Text style={styles.bodyLabel}>First name</Text>
            <TextInput
                style={styles.editInput}
                value={firstName}
                onChangeText= {setFirstName}
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
            <TouchableOpacity style={styles.editButton} onPress={handleSubmit}>
                <Text style={styles.editButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back</Text>
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
        marginBottom: 25,
    },
    bodyLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 15,
    },
    editInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 0,
    },
    backButton: {
        backgroundColor: 'gray',
        padding: 10,
        width: 175,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    backButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    editButton: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 175,
        marginTop: 45,
        marginBottom: 30,
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
        fontWeight: '100',
    },
});

export default EditBarberScreen;
