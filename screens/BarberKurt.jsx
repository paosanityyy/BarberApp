import React, { useRef } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


// Slideshow component
const Slideshow = () => {
  const images = [
    require('../assets/k1.jpg'),
    require('../assets/k2.jpg'),
    require('../assets/k3.jpg'),
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


const BarberKurt = ({ navigation }) => {
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
              source={require('../assets/renz.png')}
              style={styles.barberImage}
            />
            <View style={styles.barberInfo}>
              <Text style={styles.barbersButtonTxt}>Kurt</Text>
              <Text style={styles.socialLink}>Instagram: @kurtioo</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.sectionText}>
          Meet Kurt, our talented barber at Central Studios. With a keen eye for detail and a flair for creativity, Kurt specializes in crafting unique and stylish haircuts. Whether you're seeking a classic look or a modern trend, Kurt's expertise and passion for barbering ensure a personalized and top-notch experience.</Text>

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
    margin: 0,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barberInfo: {
    marginLeft: 10,
    paddingLeft: 20,
  },
  barbersButtonTxt: {
    fontSize: 20,
    color: 'black',
    marginTop: 0,
  },
  socialIcon: {
    marginRight: 5,
  },
  sectionText: {
    fontWeight: '300',
    textAlign: 'justify',
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
    marginTop: 0,
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
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: 'Roboto',
  },
  buttonTxt:{
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '250',
  },
});

export default BarberKurt;
