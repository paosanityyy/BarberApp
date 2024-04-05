import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const CreateBarber = () => {
    const [barberUsername, setBarberUsername] = useState('');
    const [barberPassword, setBarberPassword] = useState('');
    const [barberFirstName, setBarberFirstName] = useState('');
    const [barberLastName, setBarberLastName] = useState('');
    const [barberEmail, setBarberEmail] = useState('');
    const [barberPhone, setBarberPhone] = useState('');
    const [barbersAdded, setBarbersAdded] = useState(null);

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
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (!phonePattern.test(trimmedPhone)) {
            alert('Please enter a phone number in the format XXX-XXX-XXXX');
            return;
        }

        try {
            const signUpResponse = await axios.post(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/users/create-barber`, {
                username: barberUsername,
                password: barberPassword,
                firstName: barberFirstName,
                lastName: barberLastName,
                email: trimmedEmail,
                phone: trimmedPhone,
            });
            console.log(signUpResponse.data); // assuming you want to log the response
            setBarbersAdded(true);
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

        setTimeout(() => {
            setBarbersAdded(false);
        }, 3000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.createTitle}>Create New Barber Profile</Text>
            {barbersAdded && <Text style={styles.successMessage}>Barber Profile Created</Text>}
            <TextInput
                placeholder="Username"
                value={barberUsername}
                onChangeText={setBarberUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={barberPassword}
                secureTextEntry={true}
                onChangeText={setBarberPassword}
                style={styles.input}
            />
            <TextInput
                placeholder="First Name"
                value={barberFirstName}
                onChangeText={setBarberFirstName}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                value={barberLastName}
                onChangeText={setBarberLastName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={barberEmail}
                onChangeText={setBarberEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Phone Number"
                value={barberPhone}
                onChangeText={setBarberPhone}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={addBarber}>
                <Text style={styles.buttonTxt}>Add Barber</Text>
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
