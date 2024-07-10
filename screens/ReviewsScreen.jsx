import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const ReviewsScreen = ({ navigation }) => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        // Here you would fetch reviews from your backend
        const fetchReviews = async () => {
        try {
            const response = await axios.get(`/api/reviews`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
        };

        fetchReviews();
    }, []);

    // Function to render stars
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome 
                    key={i} 
                    name={i <= rating ? 'star' : 'star-o'} 
                    size={16} 
                    color="#FFD700" 
                />
            );
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>;
    };


    return (
        <View style={styles.container}>
        <FlatList
            data={reviews}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
                <Text style={styles.clientName}>{item.clientId ? `${item.clientId.firstName}` : 'Anonymous'} </Text>
                <Text style={styles.reviewText}>Barber: {item.barberId ? `${item.barberId.firstName}` : 'Anonymous'} </Text>
                <View style={styles.reviewRating}>
                            {renderStars(item.rating)}
                </View>
                <Text style={styles.reviewText}>{item.comment}</Text>
            </View>
            )}
        />
        <TouchableOpacity
            style={styles.writeReviewButton}
            onPress={() => navigation.navigate('WriteReview')}
        >
            <Text style={styles.writeReviewButtonText}>Write a Review</Text>
        </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    reviewContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reviewText: {
        fontSize: 16,
        marginBottom: 10,
    },
    writeReviewButton: {
        backgroundColor: '#3e3e3e',
        padding: 15,
        margin: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    writeReviewButtonText: {
        color: 'white',
        fontSize: 18,
    },
    reviewRating: {
        flexDirection: 'row',
        marginBottom: 10,
    },
});

export default ReviewsScreen;
