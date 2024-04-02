import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useAuth } from '../AuthContext';

const EditBarberScreen = ({ navigation }) => {
    const {barber, updateBarberDetails } = useAuth();
    const [barberFirstName, setBarberFirstName] = useState(barber.firstName);
    const [barberLastName, setBarberLastName] = useState(barber.lastName);
    const [barberEmail, setBarberEmail] = useState(barber.email);
    const [barberPhone, setBarberPhone] = useState(barber.phone);

    const handleSubmit = async () => {
        try {
            await updateBarberDetails({ barberFirstName, barberLastName, barberEmail, barberPhone });
            navigation.goBack(); // Navigate back to the MyAccount screen
        } catch (error) {
            console.error("Error updating barber details:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.bodyLabel}>First name</Text>
            <TextInput
                style={styles.editInput}
                value={barberFirstName}
                onChangeText={setBarberFirstName}
                placeholder="First Name"
            />
            <Text style={styles.bodyLabel}>Last name</Text>
            <TextInput
                style={styles.editInput}
                value={barberLastName}
                onChangeText={setBarberLastName}
                placeholder="Last Name"
            />
            <Text style={styles.bodyLabel}>Email address</Text>
            <TextInput
                style={styles.editInput}
                value={barberEmail}
                onChangeText={setBarberEmail}
                placeholder="Email"
            />
            <Text style={styles.bodyLabel}>Phone number</Text>
            <TextInput
                style={styles.editInput}
                value={barberPhone}
                onChangeText={setBarberPhone}
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

export default EditBarberScreen;
