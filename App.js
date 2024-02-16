import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer'
import {View, Image, Text, ScrollView, StyleSheet, ImageBackground} from 'react-native';
import Home from './frontend/screens/Home';
import AboutScreen from './frontend/screens/AboutScreen';
import AppointmentScreen from './frontend/screens/AppointmentScreen';
import SignupScreen from './frontend/screens/SignupScreen';
import LoginScreen from './frontend/screens/LoginScreen';
import ConsultationScreen from './frontend/screens/ConsultationScreen';
import BarbersScreen from './frontend/screens/BarbersScreen';
import {useFonts} from 'expo-font';
import React from 'react';
import BarberJr from './frontend/screens/BarberJr';
import BarberRenz from './frontend/screens/BarberRenz';
import BarberKurt from './frontend/screens/BarberKurt';
import BarberHenok from './frontend/screens/BarberHenok';
import BarberQyle from './frontend/screens/BarberQyle';
import CreateBarber from "./frontend/screens/CreateBarber";
import AdminScreen from "./frontend/screens/AdminScreen";
import MyAccount from "./frontend/screens/MyAccount";
import ReviewsScreen from './frontend/screens/ReviewsScreen';

function CustomDrawerContent(props) {
    return (
        <ScrollView style={{flex: 1}}>
            <ImageBackground
                source={require('./frontend/assets/nav.png')}
                style={{width: undefined, padding: 16, paddingTop: 150, marginTop: 60}}
            >
                <View style={styles.drawerHeader}>
                    <Text style={styles.userName}>John Doe</Text>
                    <Text style={styles.userEmail}>johndoe@example.com</Text>
                </View>
            </ImageBackground>
            <DrawerItemList {...props} />
        </ScrollView>
    );
}


const Drawer = createDrawerNavigator();

const LogoTitle = () => (
    <Image
        style={{width: 120, height: 50, marginTop: 15}} // Adjust the size according to your logo's dimensions
        source={require('./frontend/assets/logo.png')}
        resizeMode="contain" // Ensures that the logo is scaled properly within the header
    />
);


export default function App() {
    let [fontsLoaded] = useFonts({
      'Roboto': require('./frontend/assets/fonts/Roboto-Light.ttf'),
      'Mono': require('./frontend/assets/fonts/SpaceMono-Regular.ttf'),
      'Roboto-Mono': require('./frontend/assets/fonts/RobotoMono-Regular.ttf'),
      'SourceCodePro': require('./frontend/assets/fonts/SourceCodePro-Light.ttf'),
    })

    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={({route}) => ({
                    headerTitle: () => <LogoTitle/>,
                    drawerActiveBackgroundColor: '#c0c0c0',
                    drawerActiveTintColor: '#ffffff',
                    headerTintColor: '#3e3e3e',
                    headerStyle: {
                        shadowColor: 'transparent',
                        elevation: 0,
                    },
                    drawerItemStyle: [
                      route.name === 'Signup' ? { display: 'none' } : {},
                      route.name === 'BarberJr' ? { display: 'none' } : {},
                      route.name === 'BarberRenz' ? { display: 'none' } : {},
                      route.name === 'BarberKurt' ? { display: 'none' } : {},
                      route.name === 'BarberHenok' ? { display: 'none' } : {},
                      route.name === 'BarberQyle' ? { display: 'none' } : {},
                      route.name === 'Admin' ? { display: 'none' } : {},
                      route.name === 'CreateBarber' ? { display: 'none' } : {},
                    ]
                })}
            >

                <Drawer.Screen name='Home' component={Home}/>
                <Drawer.Screen name='Barbers' component={BarbersScreen}/>
                <Drawer.Screen name='About Us' component={AboutScreen}/>
                <Drawer.Screen name='BarberJr' component={BarberJr}/>
                <Drawer.Screen name='BarberRenz' component={BarberRenz}/>
                <Drawer.Screen name='BarberKurt' component={BarberKurt}/>
                <Drawer.Screen name='BarberHenok' component={BarberHenok}/>
                <Drawer.Screen name='BarberQyle' component={BarberQyle} />
                <Drawer.Screen name='Login' component={LoginScreen}/>
                <Drawer.Screen name='Signup' component={SignupScreen}/>
                <Drawer.Screen name='MyAccount' component={MyAccount}/>
                <Drawer.Screen name='Consultation' component={ConsultationScreen}/>
                <Drawer.Screen name='Appointment' component={AppointmentScreen}/>
                <Drawer.Screen name='Admin' component={AdminScreen}/>
                <Drawer.Screen name='CreateBarber' component={CreateBarber}/>
                <Drawer.Screen name='ReviewScreen' component={ReviewsScreen}/>
                {/* <Drawer.Screen name='AppointmentConfirmation' component={AppointmentConfirmation} /> */}
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    color: 'white',
    fontSize: 16,
  },
  drawerItem: {
    fontFamily: 'Roboto',
    fontSize: 90, // Change the font size to your desired value
    fontWeight: 'bold',
  },
});
