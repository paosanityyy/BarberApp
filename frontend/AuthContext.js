import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context object
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [barber, setBarber] = useState(null);

    useEffect(() => {
        // On app startup, try to fetch user from storage
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const storedBarber = await AsyncStorage.getItem('barber');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            if (storedBarber) {
                setBarber(JSON.parse(storedBarber));
            }
        };
        loadUser();
    }, []);


    const login = async (userData, barberData) => {
        // Assuming userData includes username, email, and phone
        setUser(userData);
        // Also save user data to AsyncStorage for persistence
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('barber', JSON.stringify(barberData));
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('barber');
    };

    // Assuming your backend's update user endpoint is something like /api/users/:id
    const updateUserDetails = async (updatedDetails) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization token if your API requires it
                },
                body: JSON.stringify(updatedDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to update user details');
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            // Update AsyncStorage to ensure persistence
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };
    const updateBarberDetails = async (updatedDetails) => {
        try {
            const response = await fetch(`http://localhost:3000/api/barbers/${barber.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization token if your API requires it
                },
                body: JSON.stringify(updatedDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to update barber details');
            }

            const updatedBarber = await response.json();
            setBarber(updatedBarber);
            // Update AsyncStorage to ensure persistence
            await AsyncStorage.setItem('barber', JSON.stringify(updatedBarber));
        } catch (error) {
            console.error('Error updating barber details:', error);
        }
    };

    return (
        <AuthContext.Provider value={{user, barber, login, logout, updateUserDetails, updateBarberDetails}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
