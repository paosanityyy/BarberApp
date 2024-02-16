import React, { useRef } from 'react';
import { ScrollView, View, Text, Image, Button, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons';

const Home = ({ navigation }) => {
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
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.jumpTo("Appointment")}>
          <Text style={styles.buttonTxt}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.jumpTo("Barbers")} style={styles.button}>
          <Text style={styles.buttonTxt}>Barbers</Text>
        </TouchableOpacity>


        

        <Text style={styles.sectionTitle}><View style={styles.separator} />About Central Studios</Text>
        <Image
          source={require('../assets/shop.png')}
          style={styles.image}
        />
        <Text style={styles.sectionSubtitle}>We are...</Text>
        <Text style={styles.sectionText}>
        Welcome to Central Studios, where grooming meets excellence. With a passion for style and a commitment to quality, our barbers provide top-tier grooming services in a modern and welcoming atmosphere. Step into Central Studios and experience the perfect blend of tradition, innovation, and impeccable service, ensuring every visit leaves you looking and feeling your best.</Text>

        {/* ... Other content ... */}

        <Text style={styles.footerText}>
          © 2023 Central Studios. All Rights Reserved.
        </Text>
      </View>

      
    </ScrollView>
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

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo: {
    marginTop: 50,
    width: 375,
    height: 100,
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#3e3e3e',
    padding: 12,
    width: 200,
    marginBottom:10,
    borderRadius: 5,
    fontSize: 16,
    fontfamily: 'Roboto',
  },
  buttonTxt:{
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    marginTop: 80,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    // fontfamily: 'Roboto',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 18,
    // fontfamily : 'Roboto',
  },
  sectionText: {
    marginHorizontal: 30,
    textAlign:'justify',
    marginTop: 10,
    fontSize: 18,
    lineHeight: 28,
    padding: 10,
    fontWeight: '300',
  },
  footerText: {
    textAlign: 'center',
    padding: 15,
    marginBottom: 30,
    marginTop: 30,
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

export default Home;
