import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import axios from 'axios';


const ViewAppointment = ({navigation}) => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchAppointments().then(r => console.log('Appointments fetched'));
    }, []);

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

    const handleRefresh = () => {
        fetchAppointments().then(r => console.log('Appointments fetched'));
    };
    const handleBack = () => {
        navigation.navigate('Admin');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appointments</Text>
            <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.refreshButton} onPress={handleBack}>
                <Text style={styles.refreshButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : appointments.length > 0 ? (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item._id} // Ensure your appointment objects have a unique identifier
                    renderItem={({item}) => (
                        <View style={styles.appointmentCard}>
                            <Text style={styles.appointmentText}><Text
                                style={styles.boldText}>Client:</Text> {item.clientId ? item.clientId.firstName : 'Unknown'}
                            </Text>
                            <Text style={styles.appointmentText}><Text
                                style={styles.boldText}>Barber:</Text> {item.barberId ? item.barberId.firstName : 'Unknown'}
                            </Text>
                            <Text style={styles.appointmentText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
                            <Text style={styles.appointmentText}>Time: {new Date(item.date).toLocaleTimeString()}</Text>
                            <Text style={styles.appointmentText}>Service: {item.service}</Text>
                            <Text style={styles.appointmentText}>Status: {item.status}</Text>
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
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    refreshButton: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 100,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    refreshButtonText: {
        color: 'white',
        textAlign: 'center',
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
