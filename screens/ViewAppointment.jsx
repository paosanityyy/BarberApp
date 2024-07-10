import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const ViewBarberAppointment = ({navigation}) => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchAppointments().then(r => console.log('Appointments fetched'));
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`/api/appointments/`);
            setAppointments(response.data);
        } catch (error) {
            console.log('Error fetching appointments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleComplete = async (appointmentId) => {
        try {
            await axios.put(`/api/appointments/complete/${appointmentId}`);
            Alert.alert("Success", "Appointment marked as completed.");
            handleRefresh(); // Refresh the appointments list
        } catch (error) {
            console.error('Error completing appointment:', error);
            Alert.alert("Error", "Failed to complete the appointment.");
        }
    };    

    const handleRefresh = () => {
        fetchAppointments().then(r => console.log('Appointments fetched'));
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Appointments</Text>
                <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                    <FontAwesomeIcon icon={faArrowsRotate} color='#3e3e3e' size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.controlButtons}>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : appointments.length > 0 ? (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item._id} // Ensure your appointment objects have a unique identifier
                    renderItem={({item}) => (
                        <View style={styles.appointmentCard}>
                            <Text style={styles.appointmentText}>
                                <Text style={styles.boldText}>Client:</Text> {item.clientId ? item.clientId.firstName : 'Unknown'}
                            </Text>

                            <Text style={styles.appointmentText}>
                                <Text style={styles.boldText}>Barber:</Text> {item.barberId ? item.barberId.firstName : 'Unknown'}
                            </Text>

                            <Text style={styles.appointmentText}>
                                <Text style={styles.boldText}>Date:</Text>  {new Date(item.date).toLocaleDateString()}
                            </Text>

                            <Text style={styles.appointmentText}>
                                <Text style={styles.boldText}>Time:</Text>  {new Date(item.date).toLocaleTimeString()}</Text>
                            <Text style={styles.appointmentText}>
                                <Text style={styles.boldText}>Service:</Text>  {item.service}
                            </Text>
                            <Text style={styles.appointmentText}>
                                <Text style={styles.boldText}>Status:</Text> {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </Text>

                            <TouchableOpacity style={styles.completeButton} onPress={() => handleComplete(item._id)}>
                                <Text style={styles.completeButtonText}>Mark as Completed</Text> 
                            </TouchableOpacity>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30
    },
    boldText: {
        fontWeight: 'bold',
    },
    controlButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        padding: 15
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButton: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 100,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    backButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    refreshButton: {
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
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
    completeButton: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    completeButtonText: {
        color: 'white',
        textAlign: 'center',
    }
    
    // Add any additional styles you need here
});

export default ViewBarberAppointment;
