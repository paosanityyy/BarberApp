import React, { useRef } from 'react';
import { ScrollView, View, Text, Image, Button, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons';

const MyAccount = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 100], // Adjust the range based on when you want the button to start moving
    outputRange: [0, 100], // Adjust the distance the button should move
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container} >
    <ScrollView
    onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}>
      <View style={{padding: 20}}>
        <Text style={styles.header}>Account</Text>
        <Text style={styles.bodyLabel}>Username</Text>
        <Text style={styles.bodyText}>johndoe</Text>
        <Text style={styles.bodyLabel}>Email</Text>
        <Text style={styles.bodyText}>johndoe@example.com</Text>
        <Text style={styles.bodyLabel}>Phone</Text>
        <Text style={styles.bodyText}>6471234567</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          © 2023 Central Studios. All Rights Reserved.
        </Text>
      </View>

      
    </ScrollView>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {}}
      >
        <FontAwesomeIcon icon={faComment} color='#ffffff' size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 150,
        marginBottom: 20,
    },
    bodyLabel: {
        fontSize: 16,
        marginBottom: 20,
    },
    bodyText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#c0c0c0'
    },
    button: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 175,
        marginTop: 20,
        marginBottom:10,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonTxt:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    footerText: {
        textAlign: 'center',
        padding: 15,
        marginBottom: 30,
        marginTop: 175,
        fontWeight: '100',
    },
    
    fab: {
        position: 'absolute',
        backgroundColor: '#3e3e3e',
        right: 16,
        bottom: 16,
        padding: 20,
        borderRadius: 100,
    },
    };

export default MyAccount;
