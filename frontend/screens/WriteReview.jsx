import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';

const WriteReview = ({ navigation, route }) => {
    const { user } = useAuth();
    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState({id: '', name: 'Select Barber'});
    const [comment, setComment] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [isBarberModalVisible, setBarberModalVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);


    const reviewDetails = {
        clientId: user.id,
        barberId: selectedBarber.id,
        rating: selectedRating,
        comment: comment,
    }
    const saveReview = async () => {
        try {
            console.log(reviewDetails);
            const response = await fetch(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewDetails), // Pass reviewDetails directly
            });
            if (!response.ok) throw new Error('Failed to save review');
            Alert.alert('Success', 'Review saved successfully');
            setComment('');
            setSelectedBarber({id: '', name: 'Select Barber'});
            setSelectedRating('');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error saving review:', error);
            Alert.alert('Error', 'Failed to save review');
        }
    };
    

    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const response = await fetch(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/users/barbers`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch barbers');
                const data = await response.json();
                setBarbers(data);
            } catch (error) {
                console.error('Error fetching barbers:', error);
                Alert.alert('Error', 'Failed to fetch barbers');
            }
        };

        fetchBarbers();
    }, []);

    const renderBarberDropDown = (options, selectedValue, setValue, setModalVisible) => (
        <Modal
            transparent={true}
            visible={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setModalVisible(false)}
            >
                <View style={styles.modalContent}>
                    {options.map((barber) => (
                        <TouchableOpacity
                            key={barber._id}
                            style={styles.modalItem}
                            onPress={() => {
                                setValue({id: barber._id, name: barber.firstName}); // Update this line
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{color: selectedValue.id === barber._id ? '#000' : '#666'}}>
                                {barber.firstName}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
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
            {/* Select Barber */}
            <View style={styles.dropdownContainer}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setBarberModalVisible(true)}
                >
                    <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                        <Text style={styles.selectedField}>{selectedBarber.name}</Text>
                        <FontAwesomeIcon icon={faChevronDown} size={12} color="#000" />
                    </View>
                </TouchableOpacity>
                {isBarberModalVisible && renderBarberDropDown(barbers, selectedBarber, setSelectedBarber, setBarberModalVisible)}
            </View>
            {/* Select Rating */}
            <View style={styles.dropdownContainer}>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setRatingModalVisible(true)}
                >
                    <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                        <Text style={styles.selectedField}>{selectedRating || 'Select Rating'}</Text>
                        <FontAwesomeIcon icon={faChevronDown} size={12} color="#000" />
                    </View>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={ratingModalVisible}
                    onRequestClose={() => setRatingModalVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setRatingModalVisible(false)}
                    >
                        <View style={styles.modalContent}>
                            <FlatList
                                data={['1', '2', '3', '4', '5']}
                                renderItem={renderRatingItem}
                                keyExtractor={(item) => item}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
            {/* Comment */}
            <TextInput
                style={styles.commentBox}
                placeholder="Comment"
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.button} onPress={saveReview}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dropdownContainer: {
        width: 350,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    dropdownButton: {
    },
    selectedField: {
        color: '#000',
    },
    button: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    commentBox: {
        width: 350,
        height: 100,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});

export default WriteReview;
