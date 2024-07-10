import React, { useState } from 'react';
import {TouchableOpacity, View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import axios from 'axios';


const CreateBarber = ({navigation}) => {
    const [barberUsername, setBarberUsername] = useState('');
    const [barberPassword, setBarberPassword] = useState('');
    const [barberFirstName, setBarberFirstName] = useState('');
    const [barberLastName, setBarberLastName] = useState('');
    const [barberEmail, setBarberEmail] = useState('');
    const [barberPhone, setBarberPhone] = useState('');

    const addBarber = async () => {
        const trimmedEmail = barberEmail.trim();
        const trimmedPhone = barberPhone.trim();

        if (!barberUsername || !barberPassword || !barberFirstName || !barberLastName || !barberEmail || !barberPhone) {
            alert('Please fill in all fields');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(trimmedEmail)) {
            alert('Please enter a valid email address');
            return;
        }
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(trimmedPhone)) {
            alert('Please enter 10 digit phone number');
            return;
        }

        try {
            const signUpResponse = await axios.post(`/api/users/create-barber`, {
                username: barberUsername,
                password: barberPassword,
                firstName: barberFirstName,
                lastName: barberLastName,
                email: trimmedEmail,
                phone: trimmedPhone,
            });
            console.log(signUpResponse.data); // assuming you want to log the response
            Alert.alert(
                "Success",
                "Barber Profile Created Successfully",
                [{text: "OK", onPress: () => navigation.navigate('Admin')}]
            );

        } catch (error) {
            console.error('Error creating barber profile:', error);
            // Handle error gracefully, show an alert or log to console
        }

        setBarberUsername('');
        setBarberPassword('');
        setBarberFirstName('');
        setBarberLastName('');
        setBarberEmail('');
        setBarberPhone('');

    };
    const handleBack = () => {
        navigation.navigate('UserManagement');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.createTitle}>Create New Barber Profile</Text>
            <TextInput
                placeholder="Username"
                placeholderTextColor="grey"
                value={barberUsername}
                onChangeText={setBarberUsername}
                style={styles.input}
                autoCapitalize='none'
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="grey"
                value={barberPassword}
                secureTextEntry={true}
                onChangeText={setBarberPassword}
                style={styles.input}
                autoCapitalize='none'
            />
            <TextInput
                placeholder="First Name"
                placeholderTextColor="grey"
                value={barberFirstName}
                onChangeText={setBarberFirstName}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                placeholderTextColor="grey"
                value={barberLastName}
                onChangeText={setBarberLastName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                placeholderTextColor="grey"
                value={barberEmail}
                onChangeText={setBarberEmail}
                style={styles.input}
                autoCapitalize='none'
            />
            <TextInput
                placeholder="Phone Number"
                placeholderTextColor="grey"
                value={barberPhone}
                onChangeText={setBarberPhone}
                style={styles.input}
                keyboardType='numeric'
            />
            <TouchableOpacity style={styles.button} onPress={addBarber}>
                <Text style={styles.buttonTxt}>Add Barber</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
                <Text style={styles.buttonTxt}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateBarber;

const styles = StyleSheet.create({
    createTitle: {
        padding: 20,
        fontSize: 20,
        // fontFamily: 'Roboto',
    },
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20,
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
    button: {
        marginTop: 20,
        backgroundColor: '#3e3e3e',
        padding: 12,
        width: 200,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonTxt: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    successMessage: {
        color: 'green',
        fontSize: 18,
        // fontFamily: 'Roboto',
    },
});
