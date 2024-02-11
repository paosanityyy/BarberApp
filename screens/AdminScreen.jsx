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
                <Text style={styles.buttonText}>Create Barber Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 50,
    },
    button: {
        backgroundColor: '#3e3e3e',
        padding: 12,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default AdminScreen;