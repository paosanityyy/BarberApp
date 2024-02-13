import React, { useRef } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import BarberJr from './BarberJr';


const BarbersScreen = ({ navigation }) => {
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
        <View style={styles.barbers}>
          <View style={styles.gridContainer}>
            <TouchableOpacity
              style={styles.barbersButton}
              onPress={() => navigation.jumpTo("BarberJr")}
            >
              <Image
                source={require('../assets/jr.png')}
                style={styles.barberImage}
              />
              <Text style={styles.barbersButtonTxt}>JR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.barbersButton}
              onPress={() => navigation.jumpTo("BarberRenz")}
            >
              <Image
                source={require('../assets/kurt.png')}
                style={styles.barberImage}
              />
              <Text style={styles.barbersButtonTxt}>Renz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.barbersButton}
              onPress={() => navigation.jumpTo("BarberKurt")}
            >
              <Image
                source={require('../assets/renz.png')}
                style={styles.barberImage}
              />
              <Text style={styles.barbersButtonTxt}>Kurt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.barbersButton}
              onPress={() => navigation.jumpTo("BarberHenok")}
            >
              <Image
                source={require('../assets/henok.png')}
                style={styles.barberImage}
              />
              <Text style={styles.barbersButtonTxt}>Henok</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 24,
    margin: 30,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  barberImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 15,
  },
  barbersButton: {
    backgroundColor: '#e1e1e1',
    padding: 0,
    width: 160,
    height: 190,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  barbersButtonTxt: {
    fontSize: 16,
    color: 'black',
    marginTop: 15,
    fontFamily: 'Roboto',
  },
  barbers: {
    paddingTop: 0,
  },
  footer: {
    textAlign: 'center',
    marginBottom: 30,
    padding: 15,
    fontWeight: '200',
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 0,
    margin: 5,
  },
});

export default BarbersScreen;
