import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowsRotate, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const BarberList = ({ navigation }) => {
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        fetchBarbers().then(r => console.log('Barbers fetched'));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            // Update your state or data source to reflect the deletion
            console.log(`Barber with id ${id} has been deleted`);
            Alert.alert(
                'Success',
                'Barber Deleted Successfully',
                [{ text: 'OK', onPress: () => fetchBarbers() }]
            )
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchBarbers = async () => {
        try {
            const response = await axios.get(`/api/users/barbers/`, {
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

    const handleBack = () => {
        navigation.navigate('UserManagement');
    }


    return (
        <View style={styles.container}>
            
            <View style={styles.controlButtons}>
                <Text style={styles.title}>Barbers</Text>
                <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                    <FontAwesomeIcon icon={faArrowsRotate} color='#3e3e3e' size={24} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={barbers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.barberBox}>
                        <View style={styles.barberInfo}>
                            <Text style={styles.barberText}><Text style={{fontWeight:'bold'}}>Username: </Text> {item.username}</Text>
                            <Text style={styles.barberText}><Text style={{fontWeight:'bold'}}>Name: </Text>{item.firstName} {item.lastName}</Text>
                            <Text style={styles.barberText}><Text style={{fontWeight:'bold'}}>Email: </Text>{item.email}</Text>
                            <Text style={styles.barberText}><Text style={{fontWeight:'bold'}}>Phone: </Text>{item.phone}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.editButton} onPress={() => navigateToEditBarber(item)}>
                                <FontAwesomeIcon icon={faEdit} color='#3e3e3e' size={20}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleDelete(item._id)}>
                                <FontAwesomeIcon icon={faTrash} color='#3e3e3e' size={20}/>
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
        fontSize: 24,
        fontWeight: '500',
    },
    controlButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    refreshButton: {
        padding: 10,
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
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
    },
    barberInfo: {
        flex: 1,
    },
    barberText: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        padding: 5,
        borderRadius: 5,
        margin: 5,
    },
});

export default BarberList;
