import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUserFromStorage = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setReady(true);
      } else {
        fetchProfile();
      }
    };

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile');
        setUser(data);
        await AsyncStorage.setItem('user', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setReady(true);
      }
    };

    fetchUserFromStorage();
  }, []);

  const updateUser = async (newUser) => {
    setUser(newUser);
    if (newUser) {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, ready }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
