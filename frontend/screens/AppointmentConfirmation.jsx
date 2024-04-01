import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faClose } from '@fortawesome/free-solid-svg-icons';

const AppointmentConfirmation = ({ route, navigation }) => {
    const { appointmentDetails } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.confirmContainer}>
                <Text style={styles.confirmHeader}>Appointment Confirmed!</Text>
                <Text style={styles.confirmTxt}>Client: {appointmentDetails.name}</Text>
                <Text style={styles.confirmTxt}>Barber: {appointmentDetails.barberName}</Text>
                <Text style={styles.confirmTxt}>Service: {appointmentDetails.service}</Text>
                <Text style={styles.confirmTxt}>Date: {appointmentDetails.date}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={{ color: 'white' }}>Back to Home</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => {}}
            >
                <FontAwesomeIcon icon={faComment} color='#ffffff' size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center', // Centers children vertically in the container
        alignItems: 'center', // Centers children horizontally in the container
    },
    confirmHeader: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Roboto',
        // Removed marginBottom to ensure vertical centering
    },
    confirmContainer: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 60,
        alignItems: 'center', 
    },
    confirmTxt: {
        fontSize: 24,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        backgroundColor: '#3e3e3e',
        right: 16,
        bottom: 16,
        padding: 20,
        borderRadius: 100,
    },
    closeButton: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    // ... other styles
});


export default AppointmentConfirmation;
