import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const CustomDrawerContent = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { ready, user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await axios.post('/api/users/logout');
    setRedirect(true);
    setUser(null); // Clear user state
  };

  useEffect(() => {
    if (redirect) {
      props.navigation.navigate('Login');
      setRedirect(false); // Reset redirect state
    }
  }, [redirect]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground
        source={require('./assets/nav.png')}
        style={{ width: undefined, padding: 16, paddingTop: 150, paddingBottom: 10 }}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.userName}>{user ? user.username : 'Welcome, Guest'}</Text>
          <Text style={styles.userEmail}>{user ? user.email : ''}</Text>
        </View>
      </ImageBackground>
      <DrawerItemList {...props} />
      {user ? (
        <>
          {user.role === 'admin' ? (
            <>
              <TouchableOpacity onPress={() => props.navigation.navigate('Admin')} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Admin Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('UserManagement')} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>User Management</Text>
              </TouchableOpacity>
            </>
          ) : user.role === 'barber' ? (
            <>
              <TouchableOpacity onPress={() => props.navigation.navigate('BarberProfile')} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>My Profile</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => props.navigation.navigate('My Account')} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>My Account</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('Appointment')} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('Consultation')} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Consultation</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate('Reviews')} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Reviews</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Login</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    // Add your styles here
  },
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
  },
  userEmail: {
    color: 'white',
    fontSize: 16,
  },
  logoutButton: {
    // Add your styles here
  },
  logoutButtonText: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: '300',
  },
});

export default CustomDrawerContent;
