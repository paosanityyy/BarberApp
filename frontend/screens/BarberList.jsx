import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const BarberList = ({ navigation }) => {
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        fetchBarbers().then(r => console.log('Barbers fetched'));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/users/${id}`);
            // Update your state or data source to reflect the deletion
            console.log(`Barber with id ${id} has been deleted`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchBarbers = async () => {
        try {
            const response = await axios.get(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/users/barbers/`, {
                params: { role: 'barber' }
            });
            setBarbers(response.data);
        } catch (error) {
            console.error('Error fetching barbers:', error);
        }
    };

    const navigateToEditBarber = (userDetails) => {
        navigation.navigate('EditBarberScreen', { userDetails });
    };

    const handleRefresh = () => {
        fetchBarbers().then(r => console.log('Barbers fetched'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Barbers</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
            <FlatList
                data={barbers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.barberBox}>
                        <View style={styles.barberInfo}>
                            <Text style={styles.barberText}>Username: {item.username}</Text>
                            <Text style={styles.barberText}>Name: {item.firstName} {item.lastName}</Text>
                            <Text style={styles.barberText}>Email: {item.email}</Text>
                            <Text style={styles.barberText}>Phone: {item.phone}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigateToEditBarber(item)}>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleDelete(item._id)}>
                                <Text>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
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
    barberBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    barberInfo: {
        flex: 1,
    },
    barberText: {
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
    },
});

export default BarberList;
