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
        Where grooming meets excellence. With a passion for style and a commitment to quality, our barbers provide top-tier grooming services in a modern and welcoming atmosphere. Step into Central Studios and experience the perfect blend of tradition, innovation, and impeccable service, ensuring every visit leaves you looking and feeling your best.</Text>

        <View style={styles.separatorLine} />
        <Text style={styles.sectionOffer}>What we offer</Text>

        <Text style={styles.servicesText}>Haircuts</Text>
        <Text style={styles.servicesDesc}>Transform your look with our expert haircuts. Our skilled stylists are here to create the perfect hairstyle that suits your personality and enhances your features.</Text>

        <Text style={styles.servicesText}>Haircut + Beard</Text>
        <Text style={styles.servicesDesc}>Elevate your style with our combined haircut and beard grooming service. Our experienced barbers will craft a seamless look that complements your facial features and showcases your unique charm.</Text>

        <Text style={styles.servicesText}>Braids</Text>
        <Text style={styles.servicesDesc}>Unleash your individuality with our professional braiding service. Whether you're looking for a classic or trendy braid style, our skilled stylists will bring creativity to your hair, adding a touch of sophistication to your overall appearance.</Text>


      

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
    separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#d3d3d3',
    marginTop: 20,
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
    fontfamily: 'SourceCodePro',
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
  sectionOffer: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionText: {
    marginHorizontal: 30,
    textAlign:'justify',
    marginTop: 10,
    lineHeight: 0,
    padding: 10,
    fontWeight: '300',
    fontSize: 16,
  },
  servicesDesc: {
    marginHorizontal: 30,
    textAlign:'justify',
    marginTop: 5,
    lineHeight: 20,
    padding: 10,
    fontWeight: '300',
    fontSize: 15,
  },
  servicesText: {
    marginHorizontal: 30,
    textAlign:'justify',
    marginTop: 5,
    padding: 10,
    fontWeight: '400',
    fontSize: 16,
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
