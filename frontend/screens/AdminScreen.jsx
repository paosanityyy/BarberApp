import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminScreen = ({ navigation }) => { // Destructuring navigation from props
    const handleUserManagementClick = () => {
        navigation.navigate('UserManagement');
    };
    const handleViewAppointmentsClick = () => {
        navigation.navigate('Appointment');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Page</Text>
            <TouchableOpacity style={styles.button} onPress={handleUserManagementClick}>
                <Text style={styles.buttonText}>User Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleViewAppointmentsClick}>
                <Text style={styles.buttonText}>Manage Appointments</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#3e3e3e',
        padding: 12,
        borderRadius: 5,
        marginTop: 25,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default AdminScreen;
