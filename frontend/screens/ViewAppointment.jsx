import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

const ViewAppointment = () => {
    const [appointment, setAppointment] = useState(null);
    const [status, setStatus] = useState('');

    // Function to fetch appointment data from the database or API
    const fetchAppointmentData = async () => {
        // Fetch appointment data based on appointmentId
        // Example fetch code:
        try {
            const response = await fetch(`http://localhost:3000/appointments/`);
            const data = await response.json();
            setAppointment(data);
            setStatus(data.status); // Set initial status
        } catch (error) {
            console.error('Error fetching appointment data:', error);
        }
    };

    // Save appointment status to the database
    const saveStatus = async () => {
        // Update appointment status in the database
        // Example update code:
        try {
            await fetch(`http://localhost:3000/appointments/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status}),
            });
            console.log('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        fetchAppointmentData().then(r => console.log('Appointment data fetched'));
    }, []); // Fetch appointment data when the component mounts

    return (
        <View style={styles.container}>
            {appointment && (
            <FlatList
                data={[appointment]}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <>
                                <Text style={styles.title}>Appointment Details</Text>
                                <Text>Client: {item.clientId}</Text>
                                <Text>Barber: {item.barberId}</Text>
                                <Text>Appointment Date: {item.date}</Text>
                                <Text>Service: {item.service}</Text>
                                <Text>Status: {status}</Text>
                                <TouchableOpacity
                                    style={[styles.button, {backgroundColor: status === 'pending' ? '#3e3e3e' : 'green'}]}
                                    onPress={() => setStatus(status === 'pending' ? 'completed' : 'pending')}>
                                    <Text style={styles.buttonText}>
                                        {status === 'pending' ? 'Mark as Completed' : 'Mark as Pending'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={saveStatus}>
                                    <Text style={styles.buttonText}>Update and Save</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    />
                )}
        </View>
    );
};
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3e3e3e',
        padding: 12,
        borderRadius: 5,
        marginTop: 25,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ViewAppointment;
