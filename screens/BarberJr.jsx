import React, { useRef } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

// Slideshow component
const Slideshow = () => {
  return (
    <View style={styles.slideshowContainer}>
      <TouchableOpacity style={styles.prevButton}>
        {/* Add your previous button icon or text */}
        <Text>Prev</Text>
      </TouchableOpacity>
      <Image
        style={styles.slideImage}
        source={require('../assets/jc2.png')} // Replace with the actual path to your image
      />
      <TouchableOpacity style={styles.nextButton}>
        {/* Add your next button icon or text */}
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const BarberJr = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.barbers}>
          <TouchableOpacity
            style={styles.barbersButton}
            onPress={() => {}}
          >
            <Image
              source={require('../assets/jr.png')}
              style={styles.barberImage}
            />
            <View style={styles.barberInfo}>
              <Text style={styles.barbersButtonTxt}>JR</Text>
              <Text style={styles.socialLink}>Instagram: @esq-cutz</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.sectionText}>
            Lorem Ipsum has been the industry's ever since At vero eos et accusamus et iusto  odio dignissimos ducimus qui
            blanditiis praesentium voluptatum
          </Text>

          {/* Include the Slideshow component */}
          <Slideshow />
          <TouchableOpacity style={styles.button} onPress={() => navigation.jumpTo("Appointment")}>
          <Text style={styles.buttonTxt}>Book now</Text>
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
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  barberImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginTop: 0,
  },
  barbersButton: {
    backgroundColor: 'white',
    paddingLeft: 30,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barberInfo: {
    marginLeft: 10,
  },
  barbersButtonTxt: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  socialIcon: {
    marginRight: 5,
  },
  sectionText: {
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    padding: 30,
  },
  socialLink: {
    fontSize: 14,
    color: '#3e3e3e',
    fontWeight: '200',
  },
  barbers: {
    paddingTop: 50,
  },
  barberInfo: {
    paddingLeft: 20,
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 100,
  },

  // Styles for the Slideshow component
  slideshowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  prevButton: {
    width: 50,
    height: 30,
    marginTop: 15,
    marginRight: 5,
    backgroundColor: 'transparent',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    width: 50,
    height: 30,
    marginTop: 15,
    marginLeft: 5,
    backgroundColor: 'transparent',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    width: 130,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonTxt:{
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '250',
  },
});

export default BarberJr;
