import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const ViewAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = Config.API_URL;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/appointments/`);
                setAppointments(response.data);
            } catch (error) {
                console.log('Error fetching appointments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : appointments.length > 0 ? (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item._id} // Ensure your appointment objects have a unique identifier
                    renderItem={({ item }) => (
                        <View style={styles.appointmentCard}>
                            <Text style={styles.appointmentText}><Text style={styles.boldText}>Client:</Text> {item.clientId ? item.clientId.firstName : 'Unknown'}</Text>
                            <Text style={styles.appointmentText}><Text style={styles.boldText}>Barber:</Text> {item.barberId ? item.barberId.firstName : 'Unknown'}</Text>
                            <Text style={styles.appointmentText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                            <Text style={styles.appointmentText}>Time: {new Date(item.date).toLocaleTimeString()}</Text>
                            <Text style={styles.appointmentText}>Service: {item.service}</Text>
                            {/* Add more appointment details here */}
                        </View>
                    )}
                />
            ) : (
                <View style={styles.centered}>
                    <Text>No appointments found.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    appointmentCard: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    appointmentText: {
        fontSize: 16,
        marginBottom: 5,
    },
    // Add any additional styles you need here
});

export default ViewAppointment;
