import React, {useRef} from 'react';
import { View, ScrollView, Image, Text, Button, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const BarbersScreen = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const translateY = scrollY.interpolate({
        inputRange: [0, 100], // Adjust the range based on when you want the button to start moving
        outputRange: [0, 100], // Adjust the distance the button should move
        extrapolate: 'clamp',
    });
    return (
        <View>
            <ScrollView
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}>
                <View style={styles.container}>
                    <Text style={styles.title}>Barbers</Text>
                    <Image
                    source={require('../assets/jr.png')} // Adjust the path to your image
                    style={styles.barberImage}
                    />
                    <Text style={styles.barberName}>Logan</Text>
                    <Text style={styles.description}>
                    For the past six years, I have proudly worn the title of a barber, and it's not just a profession for me; it's a lifelong passion. This journey has been marked by an unwavering commitment to honing my craft, always striving to offer the people I serve the pinnacle of modern-class haircuts.
                    </Text>

                    {/* Sample works and price list omitted for brevity, follow the same pattern to add them */}

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {}}
                    >
                        <Text style={styles.buttonTxt}>Book now</Text>
                    </TouchableOpacity>

                    <Text style={styles.footer}>
                    © 2023 Central Studios. All Rights Reserved.
                    </Text>
                </View>
            </ScrollView>
        <TouchableOpacity
            style={styles.fab}
            onPress={() => {}}
        >
            <FontAwesomeIcon icon={faComment} color='#ffffff' size={24} />
        </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 50,
    },
    logo: {
        width: 300,
        height: 100,
        marginTop: 30,
    },
    title: {
        fontFamily: 'monospace',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
    },
    barberImage: {
        width: 300, // Adjust based on your needs
        height: 250,
        marginTop: 30,
        borderRadius: 10,
    },
    barberName: {
        fontFamily: 'monospace',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    description: {
        fontFamily: 'Roboto', // Make sure to link custom fonts in React Native
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center',
        marginHorizontal: 30,
        width: 300,
        // line spacing
        lineHeight: 25,
    },
    button: {
        backgroundColor: '#3e3e3e',
        padding: 15,
        width: 200,
        marginTop: 30,
        marginBottom: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonTxt: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    footer: {
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 30,
        padding: 15,
    },
    fabContainer: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: 'black', // Customize the FAB color
        padding: 10,
        borderRadius: 30, // Adjust for a round shape
    },
    });

    export default BarbersScreen;
