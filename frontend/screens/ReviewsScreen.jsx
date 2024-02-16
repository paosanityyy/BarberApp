// ReviewsScreen.jsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const ReviewsScreen = ({ navigation }) => {
    // Example list of reviews
    const [reviews, setReviews] = useState([
        { id: 1, user: 'John Doe', comment: 'Great experience!', rating: 5 },
        { id: 2, user: 'Jane Smith', comment: 'Could be better.', rating: 3 },
        { id: 3, user: 'Alice Johnson', comment: 'Not bad.', rating: 4 },
        { id: 4, user: 'Robert Brown', comment: 'Fantastic service!', rating: 5 },
        { id: 5, user: 'Sarah Thompson', comment: 'Amazing job!', rating: 5 },
    ]);

    const handleSaveReview = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    const renderReviewItem = ({ item }) => (
        <View style={styles.reviewItem}>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.comment}>{item.comment}</Text>
            <Text style={styles.rating}>Rating: {item.rating}/5</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reviews</Text>
            <FlatList
                data={reviews}
                renderItem={renderReviewItem}
                keyExtractor={item => item.id.toString()}
                style={styles.reviewList}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WriteReview", { onSaveReview: handleSaveReview })}>
                <Text style={styles.buttonText}>Write a Review</Text>
                <FontAwesomeIcon icon={faComment} size={20} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
        fontFamily: 'SourceCodePro',
    },
    reviewList: {
        width: '100%',
    },
    reviewItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comment: {
        fontSize: 16,
        marginBottom: 5,
    },
    rating: {
        fontSize: 14,
        color: '#888',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3e3e3e',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        marginBottom:20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        marginRight: 10,
        fontFamily: 'Roboto',
    },
    icon: {
        color: 'white',
    },
});

export default ReviewsScreen;
