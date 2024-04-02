import React, { useRef } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Animated, TouchableOpacity, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


// Slideshow component
const Slideshow = () => {
  const images = [
    require('../assets/jc1.png'),
    require('../assets/jc2.png'),
    require('../assets/jc1.png'),
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <View style={styles.slideshowContainer}>
      <TouchableOpacity style={styles.prevButton} onPress={goToPrevSlide}>
        <FontAwesomeIcon icon={faChevronLeft} size={20} color="#000" />
      </TouchableOpacity>
      <Image
        style={styles.slideImage}
        source={images[currentIndex]}
      />
      <TouchableOpacity style={styles.nextButton} onPress={goToNextSlide}>
        <FontAwesomeIcon icon={faChevronRight} size={20} color="#000" />
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
            onPress={() => {
              Linking.openURL('https://www.instagram.com/esq_cutz/');}}
          >
            <Image
              source={require('../assets/jr.png')}
              style={styles.barberImage}
            />
            <View style={styles.barberInfo}>
              <Text style={styles.barbersButtonTxt}>JR</Text>
              <Text style={styles.socialLink}>Instagram: @esq_cutz</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.sectionText}>
          Meet JR, our skilled barber at Central Studios. With a flair for modern styles and meticulous attention to detail, JR creates personalized and trendy haircuts tailored to your unique taste. </Text>

          {/* Include the Slideshow component */}
          <Slideshow />
          <TouchableOpacity style={styles.button} onPress={() => navigation.jumpTo("Appointment")}>
          <Text style={styles.buttonTxt}>Book now</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>

      <Text style={styles.footer}>© 2023 Central Studios. All Rights Reserved.</Text>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        // on press navigate to consultation screen
        onPress={() => navigation.jumpTo("Consultation")}
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
    paddingHorizontal: 0,
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
    margin: 0,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barberInfo: {
    marginLeft: 10,
  },
  barbersButtonTxt: {
    fontSize: 40,
    color: 'black',
    marginTop: 0,
    fontFamily: 'SourceCodePro',
  },
  socialIcon: {
    marginRight: 5,
  },
  sectionText: {
    fontWeight: '300',
    textAlign: 'justify',
    fontSize: 18,
    lineHeight: 26,
    padding: 30,
  },
  socialLink: {
    fontSize: 14,
    color: '#3e3e3e',
    fontWeight: '300',
    fontFamily: 'SourceCodePro',
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
    width: 240,
    height: 240,
    borderRadius: 5,
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    width: 130,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 40,
    alignSelf: 'center',
    // fontFamily: 'Roboto',
  },
  buttonTxt:{
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    // fontWeight: '250',
  },
});


export default BarberJr;
