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
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonTxt}>Barbers</Text>
        </TouchableOpacity>

        

        <Text style={styles.sectionTitle}><View style={styles.separator} />About Central Studios</Text>
        <Image
          source={require('../assets/shop.png')}
          style={styles.image}
        />
        <Text style={styles.sectionSubtitle}>We are...</Text>
        <Text style={styles.sectionText}>
          Lorem Ipsum has been the industry's ever since At vero eos et accusamus et iusto  odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
          occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum
          soluta nobis est eligendi optio cumque nihil impedit quo minus id
        </Text>

        {/* ... Other content ... */}

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
        <FontAwesomeIcon icon={faComment} color='#ffffff' />
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
    marginTop: 200,
    width: 300,
    height: 75,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    width: 175,
    marginBottom:10,
    borderRadius: 5
  },
  buttonTxt:{
    fontSize: 16,
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
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 18,
  },
  sectionText: {
    marginHorizontal: 30,
    textAlign:'center',
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  footerText: {
    textAlign: 'center',
    padding: 15,
    marginBottom: 30,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#3e3e3e',
    right: 16,
    bottom: 16,
    padding: 16,
    borderRadius: 30,
  },
  
};

export default Home;
