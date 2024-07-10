import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faComment, faHistory, faSave, faSync } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../AuthContext';

const MyAccount = ({ navigation }) => {
    const { user,ready } = useContext(AuthContext);

    if (!ready) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>User not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Account Details</Text>
                    <View style={styles.headerActionContainer}>
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('EditClientAccountScreen')} style={styles.actionButton}>
                                <FontAwesomeIcon icon={faEdit} size={24} color="black" />
                            </TouchableOpacity>
                        </>   
                    </View>
                </View>

                <View>
                    <Text style={styles.bodyLabel}>First name</Text>
                    <Text style={styles.editInput}>{user.firstName}</Text>
                    <Text style={styles.bodyLabel}>Last name</Text>
                    <Text style={styles.editInput}>{user.lastName}</Text>
                    <Text style={styles.bodyLabel}>Username</Text>
                    <Text style={styles.editInput}>{user.username}</Text>
                    <Text style={styles.bodyLabel}>E-mail</Text>
                    <Text style={styles.editInput}>{user.email}</Text>
                    <Text style={styles.bodyLabel}>Phone</Text>
                    <Text style={styles.editInput}>{user.phone}</Text>
                    
                </View>

                <TouchableOpacity
                    style={styles.bookingHistoryButton}
                    onPress={() => navigation.navigate('BookingHistory')}
                >
                    <FontAwesomeIcon icon={faHistory} size={18} color="#FFF" />
                    <Text style={styles.bookingHistoryButtonText}>Booking History</Text>
                </TouchableOpacity>
            </ScrollView>

            <Text style={styles.footerText}>
                © 2023 Central Studios. All Rights Reserved.
            </Text>

            <TouchableOpacity style={styles.fab} onPress={() => navigation.jumpTo("Consultation")}>
                <FontAwesomeIcon icon={faComment} color='#ffffff' size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 40,
    },
    scrollView: {
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    editButtonIcon: {
        marginTop: 0,
        color: 'black',
    },
    saveButton: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        margin: 20,
        alignItems: 'center',
        borderRadius: 5,
        width: 200,
        alignSelf: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
    },
    editableFieldContainer: {
        marginBottom: 15,
    },
    bodyLabel: {
        fontSize: 17,
        marginBottom: 5,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#c0c0c0',
    },
    editInput: {
        paddingTop: 15,
        paddingBottom: 5,
        fontSize: 16,
    },
    editInputEditable: {
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    editInputNonEditable: {
        borderBottomWidth: 0,
    },
    fab: {
        position: 'absolute',
        backgroundColor: '#3e3e3e',
        right: 16,
        bottom: 16,
        padding: 20,
        borderRadius: 100,
    },
    bookingHistoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3e3e3e',
        padding: 10,
        margin: 40,
        alignSelf: 'center',
        borderRadius: 5,
        width: 180,
    },
    bookingHistoryButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    actionButton: {
        padding: 10,
        borderRadius: 50,
    },
    footerText: {
        textAlign: 'center',
        padding: 15,
        marginBottom: 30,
        fontWeight: '100',
    },
    headerActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default MyAccount;
