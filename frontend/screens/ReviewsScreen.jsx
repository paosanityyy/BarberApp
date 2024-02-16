import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const ReviewsScreen = ({ navigation }) => {
    // Example list of reviews
    const [reviews, setReviews] = useState([
        { id: 1, barber: 'JR', user: 'John Doe', comment: 'Great experience!', rating: 5 },
        { id: 2, barber: 'Kurt', user: 'Jane Smith', comment: 'Could be better.', rating: 3 },
        { id: 3, barber: 'Qyle', user: 'Alice Johnson', comment: 'Not bad.', rating: 4 },
        { id: 4, barber: 'Renz', user: 'Robert Brown', comment: 'Fantastic service!', rating: 5 },
        { id: 5, barber: 'Henok', user: 'Sarah Thompson', comment: 'Amazing job!', rating: 5 },
    ]);

    const renderReviewItem = ({ item }) => (
        <View style={styles.reviewItem}>
            <Text style={styles.barberName}>Barber:{item.barber}</Text>
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.jumpTo("WriteReview")}>
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
    barberName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userName: {
        fontSize: 16,
        marginBottom: 5,
    },
    comment: {
        fontSize: 14,
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
