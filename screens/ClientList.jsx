import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';

const ClientList = ({navigation}) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients().then(r => console.log('Clients fetched'));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            console.log(`User with id ${id} has been deleted`);
            // Update your state or data source to reflect the deletion
            Alert.alert(
                "Success",
                "User Deleted Successfully",
                [{text: "OK", onPress: () => fetchClients()}]
            )
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get(`/api/users/clients`, {
                params: {role: 'client'}
            });
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const navigateToEditUser = (userDetails) => {
        navigation.navigate('EditUserScreen', { userDetails });
    };

    const handleRefresh = () => {
        fetchClients().then(r => console.log('Clients fetched'));
    };

    const handleBack = () => {
        navigation.navigate('UserManagement');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clients</Text>
            <View style={styles.controlButtons}>
                <TouchableOpacity style={styles.refreshButton} onPress={handleBack}>
                    <Text style={styles.refreshButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                    <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={clients}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View style={styles.clientBox}>
                        <View style={styles.clientInfo}>
                            <Text style={styles.clientText}>Username: {item.username}</Text>
                            <Text style={styles.clientText}>Name: {item.firstName} {item.lastName}</Text>
                            <Text style={styles.clientText}>Email: {item.email}</Text>
                            <Text style={styles.clientText}>Phone: {item.phone}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigateToEditUser(item)}>
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
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    controlButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        padding: 15
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
    clientBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    clientInfo: {
        flex: 1,
    },
    clientText: {
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

export default ClientList;

