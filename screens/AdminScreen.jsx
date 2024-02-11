import React, { } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminScreen = ({ navigation }) => {
    const handleCreateBarberClick = () => {
        navigation.navigate('CreateBarber');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Page</Text>
            <TouchableOpacity style={styles.button} onPress={handleCreateBarberClick}>
                <Text style={styles.buttonText}>User Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreateBarberClick}>
                <Text style={styles.buttonText}>Communication and Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreateBarberClick}>
                <Text style={styles.buttonText}>Payroll Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreateBarberClick}>
                <Text style={styles.buttonText}>Time Tracking and Attendance</Text>
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