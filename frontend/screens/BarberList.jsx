import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

const BarberList = ({navigation}) => {
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        fetchBarbers().then(r => console.log('Barbers fetched'));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/barbers/${id}`);
            // Update your state or data source to reflect the deletion
            console.log(`Barber with id ${id} has been deleted`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchBarbers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/barbers/', {
                params: { role: 'barber' }
            });
            setBarbers(response.data);
        } catch (error) {
            console.error('Error fetching barbers:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Barbers</Text>
            <FlatList
                data={barbers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.barberItem}>
                        <View style={{ flex: 1 }}>
                            <Text>{item.username}</Text>
                            <Text>{item.firstName} {item.lastName}</Text>
                            <Text>{item.email}</Text>
                            <Text>{item.phone}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.jumpTo('EditBarberScreen')}>
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
    barberItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
});

export default BarberList;
