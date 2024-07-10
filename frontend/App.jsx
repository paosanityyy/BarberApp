// App.jsx
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { AuthProvider } from './AuthContext';
import AppNavigator from './AppNavigator';

axios.defaults.baseURL = 'https://barber-backend-3yq3.onrender.com';
axios.defaults.withCredentials = true;

export default function App() {
    let [fontsLoaded] = useFonts({
        'Mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'SourceCodePro': require('./assets/fonts/SourceCodePro-Light.ttf'),
    });

    if (!fontsLoaded) {
        return null; // You can add a loading spinner here if needed
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar barStyle='dark-content' />
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}
