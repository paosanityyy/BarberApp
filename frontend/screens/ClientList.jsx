import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients().then(r => console.log('Clients fetched'));
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${id}`);
            // Update your state or data source to reflect the deletion
            console.log(`User with id ${id} has been deleted`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/clients', {
                params: { role: 'client' }
            });
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clients</Text>
            <FlatList
                data={clients}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.barberItem}>
                        <View style={{ flex: 1 }}>
                            <Text>{item.username}</Text>
                            {/* Add more details to display */}
                            <Text>{item.firstName} {item.lastName}</Text>
                            <Text>{item.email}</Text>
                            <Text>{item.phone}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.jumpTo('EditUserScreen')}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item._id)}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    clientItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
});

export default ClientList;