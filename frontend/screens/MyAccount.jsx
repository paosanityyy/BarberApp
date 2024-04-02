import React, { useRef } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext'; // Import the useAuth hook from your authentication context

const MyAccount = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = useAuth(); // Destructure the user from the authentication context

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      
      {/* Place the logo outside the conditional rendering block */}
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}
      
      {/* Conditional rendering based on user authentication */}
      {!user ? (
        <View style={styles.noUser}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <TouchableOpacity onPress={() => navigation.jumpTo('Login')}>
            <Text style={styles.goToLogin}>Log in to view your account</Text>
          </TouchableOpacity>
          <Text style={styles.NoUserfooterText}>
              © 2023 Central Studios. All Rights Reserved.
            </Text>
        </View>
      ) : (
        <ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={{ padding: 20 }}>
            <Text style={styles.header}>Account</Text>
            <Text style={styles.bodyLabel}>Username</Text>
            <Text style={styles.bodyText}>{user.username}</Text>
            {/* <Text style={styles.bodyLabel}>User ID</Text>
            <Text style={styles.bodyText}>{user.id}</Text> */}
            <Text style={styles.bodyLabel}>First name</Text>
            <Text style={styles.bodyText}>{user.firstName}</Text>
            <Text style={styles.bodyLabel}>Last name</Text>
            <Text style={styles.bodyText}>{user.lastName}</Text>
            <Text style={styles.bodyLabel}>Email</Text>
            <Text style={styles.bodyText}>{user.email}</Text>
            <Text style={styles.bodyLabel}>Phone</Text>
            <Text style={styles.bodyText}>{user.phone}</Text>
            <TouchableOpacity onPress={() => navigation.jumpTo('EditUserScreen')}>
            <Text style={styles.button}>Edit</Text>
          </TouchableOpacity>
            <Text style={styles.footerText}>
              © 2023 Central Studios. All Rights Reserved.
            </Text>
          </View>
        </ScrollView>
      )}
      
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.jumpTo("Consultation")}
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
    padding: 40,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  bodyLabel: {
    fontSize: 16,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#c0c0c0'
  },
  button: {
    backgroundColor: '#3e3e3e',
    padding: 10,
    width: 175,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  buttonTxt: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
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
  noUser: {
    padding: 20,
    marginTop: 110,
  },
  goToLogin: {
    color: 'white',
    // fontFamily: 'Roboto',
    fontSize: 18,

    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 80,
  },
  logo: {
    marginTop: 0,
    width: 310,
    height: 85,
    alignSelf: 'center', // Adjust the alignment of the logo
  },
  NoUserfooterText: {
    textAlign: 'center',
    padding: 0,
    marginTop: 380,
    fontWeight: '100',
  }
};

export default MyAccount;
