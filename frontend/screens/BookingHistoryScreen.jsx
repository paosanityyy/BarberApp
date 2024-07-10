import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faSync } from '@fortawesome/free-solid-svg-icons'; 

const BookingHistoryScreen = ({ navigation }) => {
    const {user} = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    // Refactor fetching logic into its own function
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/api/appointments/client/${user._id}`);
            setBookings(response.data);
        } catch (error) {
            console.log(error);
        } 
    };

    // Call fetchBookings on component mount and user changes
    useEffect(() => {
        fetchBookings();
    }, [user]);

    if (!user) {
        return (
            <View style={styles.centered}>
                <Text>Please log in to view your booking history.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <>
                <TouchableOpacity style={styles.refreshButton} onPress={fetchBookings}>
                    <FontAwesomeIcon icon={faSync} size={24} color="#3e3e3e" />
                </TouchableOpacity>
                <Text style={styles.title}>Booking History</Text>
                <ScrollView>
                    {bookings.map((booking) => (
                        <View key={booking._id} style={styles.bookingCard}>
                            <Text style={styles.bookingText}><Text
                                style={styles.boldText}>Date:</Text> {new Date(booking.date).toLocaleDateString()}
                            </Text>
                            <Text style={styles.bookingText}><Text
                                style={styles.boldText}>Time:</Text> {new Date(booking.date).toLocaleTimeString()}
                            </Text>
                            <Text style={styles.bookingText}><Text
                                style={styles.boldText}>Barber:</Text> {booking.barberId ? booking.barberId.firstName : 'Unknown'}
                            </Text>
                            <Text style={styles.bookingText}><Text
                                style={styles.boldText}>Service:</Text> {booking.service}</Text>
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={() => navigation.jumpTo("Appointment")}>
                    <Text style={styles.buttonTxt}>Rebook</Text>
                </TouchableOpacity>
            </>
            <TouchableOpacity style={styles.fab} onPress={() => navigation.jumpTo("Consultation")}>
                <FontAwesomeIcon icon={faComment} color='#ffffff' size={24}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 22,
        marginLeft: 30,
        marginTop: 30,
        marginBottom: 30,
        fontWeight: '500',
    },
    noTitle: {
        fontSize: 18,
        textAlign: 'center',
        color: 'gray',
        marginBottom: 20,
    },
    bookingCard: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    bookingText: {
        fontSize: 16,
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3e3e3e',
        padding: 15,
        borderRadius: 10,
        // margin: 30,
        marginBottom: 50,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: 200,
    },
    buttonTxt: {
        color: 'white',
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        backgroundColor: '#3e3e3e',
        right: 16,
        bottom: 16,
        padding: 20,
        borderRadius: 100,
    },
    refreshButton: {
        position: 'absolute',
        right: 16,
        top: 16,
        padding: 15,
        borderRadius: 50,
        zIndex: 1, // Make sure the button is above other elements
    }
});

export default BookingHistoryScreen;
