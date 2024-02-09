import React, { useState } from 'react';
import {FlatList, TouchableOpacity, View} from "react-native";
import {TextInput} from "react-native-gesture-handler";

const createBarber = () => {
    const [barberFirstName, setBarberFirstName] = useState('');
    const [barberLastName, setBarberLastName] = useState('');
    const [barberEmail, setBarberEmail] = useState('');
    const [barberPhone, setBarberPhone] = useState('');
    const [barbers, setBarbers] = useState([]);

    const addBarber = () => {
        setBarbers([...barbers, { firstName: barberFirstName, lastName: barberLastName, email: barberEmail, phone: barberPhone }]);
        setBarberFirstName('');
        setBarberLastName('');
        setBarberEmail('');
        setBarberPhone('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.createTitle}>Create New Barber Profile</Text>
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
            <FlatList
                data={barbers}
                renderItem={({ item }) => (
                    <View style={styles.barberCard}>
                        <Text>{item.firstName} {item.lastName}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.phone}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default createBarber;

const styles = {
    createTitle: {
        padding: 20,
        fontSize: 20,
        fontFamily: 'Roboto',
    },
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 150,
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
        fontSize: 16,
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
};