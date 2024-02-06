import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faClose } from '@fortawesome/free-solid-svg-icons';

const AppointmentConfirmation = ({ onClose }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.confirmHeader}>Appointment Confirmed!</Text>
            <View style={styles.confirmContainer}>
                <Text style={styles.confirmTxt}>Your appointment with JR on</Text>
                <Text style={styles.confirmTxt}>June 10, 2023 at 2:00 PM</Text>
                <Text style={styles.confirmTxt}>for a Haircut has been confirmed.</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <FontAwesomeIcon icon={faClose} color='#000' size={24} />
            </TouchableOpacity>

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
        padding: 20,
        justifyContent: 'center', // Centers children vertically in the container
        alignItems: 'center', // Centers children horizontally in the container
    },
    confirmHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        // Removed marginBottom to ensure vertical centering
    },
    confirmContainer: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 50,
        alignItems: 'center', 
    },
    confirmTxt: {
        fontSize: 18,
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
        position: 'absolute',
        right: 16,
        top: 50,
        padding: 20,
    },
    // ... other styles
});


export default AppointmentConfirmation;
