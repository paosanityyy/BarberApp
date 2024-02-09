import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import createBarber from './createBarber'; //

const AdminScreen = () => {
    const [showCreateBarber, setShowCreateBarber] = useState(false);

    const handleCreateBarberClick = () => {
        setShowCreateBarber(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Page</Text>
            <TouchableOpacity style={styles.button} onPress={handleCreateBarberClick}>
                <Text style={styles.buttonText}>Create Barber Profile</Text>
            </TouchableOpacity>
            {showCreateBarber && <createBarber />}
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
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
};

export default AdminScreen;

