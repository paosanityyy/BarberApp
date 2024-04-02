import React, { useRef } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';

const BarberProfile = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();

  const translateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        {!user ? (
            <View style={styles.noBarber}>
              <TouchableOpacity onPress={() => navigation.jumpTo('Login')}>
                <Text style={styles.goToLogin}>Log in to view your account</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}>
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
              <View style={styles.profileContainer}>
                <Text style={styles.header}>Account</Text>
                <ProfileDetail label="Username" value={user.username} />
                <ProfileDetail label="First name" value={user.firstName} />
                <ProfileDetail label="Last name" value={user.lastName} />
                <ProfileDetail label="Email" value={user.email} />
                <ProfileDetail label="Phone" value={user.phone} />
                <TouchableOpacity onPress={() => navigation.jumpTo('EditBarberScreen')}>
                  <Text style={styles.button}>Edit</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>
                  © 2023 Central Studios. All Rights Reserved.
                </Text>
              </View>
            </ScrollView>
        )}
        <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.jumpTo("Consultation")}
        >
          <FontAwesomeIcon icon={faComment} color='#ffffff' size={24} />
        </TouchableOpacity>
      </View>
  );
};

const ProfileDetail = ({ label, value }) => (
    <View style={styles.detailContainer}>
      <Text style={styles.bodyLabel}>{label}</Text>
      <Text style={styles.bodyText}>{value}</Text>
    </View>
);

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  profileContainer: {
    padding: 20,
  },
  detailContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  bodyLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c0c0c0',
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
  footerText: {
    textAlign: 'center',
    padding: 15,
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
  noBarber: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goToLogin: {
    fontSize: 18,
    backgroundColor: 'black',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 80,
  },
  logo: {
    marginTop: 0,
    width: 310,
    height: 85,
    alignSelf: 'center',
  },
};

export default BarberProfile;

