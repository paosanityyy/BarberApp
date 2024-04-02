import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('barber');
    };

  const updateUserDetails = async (updatedDetails) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) throw new Error('Failed to update user details');

      const updatedUser = await response.json();

      setUser(updatedUser); // Update user in context
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser)); // Update AsyncStorage
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
