import React, { useState } from 'react';
import {TouchableOpacity, View, Text, StyleSheet, FlatList} from "react-native";
import {TextInput} from "react-native-gesture-handler";

const CreateBarber = () => {
    const [barberUsername, setBarberUsername] = useState('');
    const [barberPassword, setBarberPassword] = useState('');
    const [barberFirstName, setBarberFirstName] = useState('');
    const [barberLastName, setBarberLastName] = useState('');
    const [barberEmail, setBarberEmail] = useState('');
    const [barberPhone, setBarberPhone] = useState('');
    const [barberAddress, setBarberAddress] = useState('');
    const [barbers, setBarbers] = useState([]);
    const [barbersAdded, setBarbersAdded] = useState(null);

    const addBarber = () => {

        const trimmedEmail = barberEmail.trim();
        const trimmedPhone = barberPhone.trim();

        if (!barberUsername || !barberPassword || !barberFirstName || !barberLastName || !barberAddress || !barberEmail || !barberPhone) {
            alert('Please fill in all fields');
            return; // Exit the function early if any field is empty
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

        setBarbers([...barbers, {username: barberUsername,password: barberPassword, firstName: barberFirstName, lastName: barberLastName, address: barberAddress, email: trimmedEmail, phone: trimmedPhone }]);
        setBarbersAdded(true);
        setBarberUsername('');
        setBarberPassword('');
        setBarberFirstName('');
        setBarberLastName('');
        setBarberAddress('')
        setBarberEmail('');
        setBarberPhone('');

        setTimeout(() => {
            setBarbersAdded(false);
        }, 3000);

    };

    // const deleteBarber = (index) => {
    //     const updatedBarbers = [...barbers];
    //     updatedBarbers.splice(index, 1); // Remove the barber at the specified index
    //     setBarbers(updatedBarbers);
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.createTitle}>Create New Barber Profile</Text>
            {/* Conditional rendering of success message */}
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
                placeholder="Address"
                value={barberAddress}
                onChangeText={setBarberAddress}
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
            <FlatList
               data={barbers}
               renderItem={({ item }) => (
                   <View style={styles.barberCard}>
                          <Text>Username: {item.username}</Text>
                       <Text>Name: {item.firstName} {item.lastName}</Text>
                       <Text>Email: {item.email}</Text>
                          <Text>Address: {item.address}</Text>
                       <Text>Phone Number: {item.phone}</Text>
                    </View>
               )}
            />
        </View>
    );
}

export default CreateBarber;

const styles = StyleSheet.create({
    createTitle: {
        padding: 20,
        fontSize: 20,
        fontFamily: 'Roboto',
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
        fontFamily: 'Roboto',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#3e3e3e',
        padding: 12,
        width: 200,
        marginBottom:10,
        borderRadius: 5,
    },
    buttonTxt:{
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    barberCard: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 20,
        width: 350,
        marginBottom: 10,
    },
    successMessage: {
        color: 'green',
        fontSize: 18,
        fontFamily: 'Roboto',
    },
});