import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

const WriteReview = ({ navigation, route }) => {
    const [userName, setUserName] = useState('');
    const [selectedBarber, setSelectedBarber] = useState('');
    const [comment, setComment] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [barberModalVisible, setBarberModalVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);

    const handleSaveReview = () => {
        if (!userName.trim() || !comment.trim() || !selectedRating || !selectedBarber.trim()) {
            alert('Please fill out all fields.');
            return;
        }

        const newReview = {
            user: userName,
            barber: selectedBarber,
            comment: comment,
            rating: parseInt(selectedRating),
        };

        route.params.onSaveReview(newReview);
        navigation.goBack();
    };

    const renderBarberItem = ({ item }) => (
        <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
                setSelectedBarber(item);
                setBarberModalVisible(false);
            }}
        >
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    const renderRatingItem = ({ item }) => (
        <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
                setSelectedRating(item);
                setRatingModalVisible(false);
            }}
        >
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Write a Review</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setBarberModalVisible(true)}
            >
                <Text>{selectedBarber || 'Select Barber'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setRatingModalVisible(true)}
            >
                <Text>{selectedRating || 'Select Rating'}</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={userName}
                onChangeText={setUserName}
            />
            <TextInput
                style={[styles.input, {height: 100}]}
                placeholder="Your Comment"
                value={comment}
                onChangeText={setComment}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.jumpTo("Reviews")}>
                <Text style={styles.buttonText}>Save Review</Text>
            </TouchableOpacity>

            {/* Barber Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={barberModalVisible}
                onRequestClose={() => setBarberModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={['JR', 'Kurt', 'Qyle', 'Renz', 'Henok']}
                            renderItem={renderBarberItem}
                            keyExtractor={(item) => item}
                        />
                    </View>
                </View>
            </Modal>

            {/* Rating Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={ratingModalVisible}
                onRequestClose={() => setRatingModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={['1', '2', '3', '4', '5']}
                            renderItem={renderRatingItem}
                            keyExtractor={(item) => item}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
        fontFamily: 'SourceCodePro',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#3e3e3e',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        // fontFamily: 'Roboto',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        maxHeight: 300,
        width: '80%',
    },
    modalItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default WriteReview;
