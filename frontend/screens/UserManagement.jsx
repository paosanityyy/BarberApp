import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const UserManagement = ({ navigation }) => { // Destructuring navigation from props
    const handleCreateBarberClick = () => {
        navigation.navigate('CreateBarber');
    };
    const handleViewBarberClick = () => {
        navigation.navigate('BarberList');
    };
    const handleViewClientClick = () => {
        navigation.navigate('ClientList');
    };
    const handleBack = () => {
        navigation.navigate('Admin');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Management</Text>
            <TouchableOpacity style={styles.button} onPress={handleCreateBarberClick}>
                <Text style={styles.buttonText}>Add Barber</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleViewBarberClick}>
                <Text style={styles.buttonText}>View Barbers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleViewClientClick}>
                <Text style={styles.buttonText}>View Clients</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
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

export default UserManagement;
