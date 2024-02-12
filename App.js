import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { View, Image, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Home from './screens/Home';
import AppointmentScreen from './screens/AppointmentScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import ConsultationScreen from './screens/ConsultationScreen';
import BarbersScreen from './screens/BarbersScreen';
import AppointmentConfirmation from './screens/AppointmentConfirmation';
import ReviewsScreen from './screens/ReviewsScreen';
import AboutScreen from './screens/AboutScreen';
import { useFonts } from 'expo-font';
import React from 'react';
import BarberJr from './screens/BarberJr';
import BarberRenz from './screens/BarberRenz';
import BarberKurt from './screens/BarberKurt';
import BarberHenok from './screens/BarberHenok';
import BarberQyle from './screens/BarberQyle';

function CustomDrawerContent(props) {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          source={require('./assets/nav.png')}
          style={{ width: undefined, padding:16, paddingTop: 150, marginTop: 60}}
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
      style={{ width: 120, height: 50, marginTop: 15 }} // Adjust the size according to your logo's dimensions
      source={require('./assets/logo.png')}
      resizeMode="contain" // Ensures that the logo is scaled properly within the header
    />
);


export default function App(){
    let [fontsLoaded] = useFonts({
      'Roboto': require('./assets/fonts/Roboto-Light.ttf'),
      'Mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'Roboto-Mono': require('./assets/fonts/RobotoMono-Regular.ttf'),
      'SourceCodePro': require('./assets/fonts/SourceCodePro-Light.ttf'),
    })
   
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={({ route }) => ({
                    headerTitle: () => <LogoTitle />,
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
                    ]
                })}
            >
                
                <Drawer.Screen style={styles.drawerItem} name='Home' component={Home} />
                <Drawer.Screen style={styles.drawerItem} name='Barbers' component={BarbersScreen} />
                <Drawer.Screen style={styles.drawerItem} name='BarberJr' component={BarberJr} />
                <Drawer.Screen style={styles.drawerItem} name='BarberRenz' component={BarberRenz} />
                <Drawer.Screen style={styles.drawerItem} name='BarberKurt' component={BarberKurt} />
                <Drawer.Screen style={styles.drawerItem} name='BarberHenok' component={BarberHenok} />
                <Drawer.Screen style={styles.drawerItem} name='BarberQyle' component={BarberQyle} />
                <Drawer.Screen style={styles.drawerItem} name='Login' component={LoginScreen} />  
                <Drawer.Screen style={styles.drawerItem} name='Signup' component={SignupScreen} />
                <Drawer.Screen style={styles.drawerItem} name='Appointment' component={AppointmentScreen} />
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