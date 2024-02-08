import React, { useRef } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';


const BarberJr = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Meet our barbers</Text>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View  style={styles.barbers}>
            <TouchableOpacity
              style={styles.barbersButton}
              onPress={() => {}}
            >
              <Image
                source={require('../assets/jr.png')}
                style={styles.barberImage}
              />
              <Text style={styles.barbersButtonTxt}>JR</Text>
            </TouchableOpacity>
        
          </View>
      </ScrollView>

      <Text style={styles.footer}>© 2023 Central Studios. All Rights Reserved.</Text>

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
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    justifyContent: 'space-between', // Aligns children at the beginning and end of the container
  },
  title: {
    fontSize: 25,
    margin: 30,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  barberImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 15,
  },
  barbersButton: {
    backgroundColor: '#e1e1e1',
    padding: 0,
    width: 160,
    height: 160,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  barbersButtonTxt: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  barbers: {
    paddingTop: 50,
  },
  footer: {
    textAlign: 'center',
    marginBottom: 30,
    padding: 15,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#3e3e3e',
    right: 16,
    bottom: 16,
    paddingVertical: 20, // Adjust the padding based on your preference
    paddingHorizontal: 20, // Add padding on the sides
    borderRadius: 100,
  },

});

export default BarberJr;
