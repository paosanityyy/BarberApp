import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const BarberList = () => {
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        fetchBarbers().then(r => console.log('Barbers fetched'));
    }, []);

    const fetchBarbers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/barbers/', {
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
                        <Text>{item.username}</Text>
                        {/* Add more details to display */}
                        <Text>{item.firstName} {item.lastName}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.phone}</Text>
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
