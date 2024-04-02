import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer'
import {View, Image, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import Home from './screens/Home';
import AboutScreen from './screens/AboutScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import AppointmentConfirmation from './screens/AppointmentConfirmation';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import ConsultationScreen from './screens/ConsultationScreen';
import BarbersScreen from './screens/BarbersScreen';
import { useFonts } from 'expo-font';
import React from 'react';
import BarberJr from './screens/BarberJr';
import BarberRenz from './screens/BarberRenz';
import BarberKurt from './screens/BarberKurt';
import BarberHenok from './screens/BarberHenok';
import BarberQyle from './screens/BarberQyle';
import CreateBarber from "./screens/CreateBarber";
import UserManagement from "./screens/UserManagement";
import AdminScreen from "./screens/AdminScreen";
import MyAccount from "./screens/MyAccount";
import EditUserScreen from "./screens/EditUserScreen";
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import WriteReview from './screens/WriteReview';
import {AuthProvider, useAuth} from './AuthContext';
import BarberList  from "./screens/BarberList";
import ClientList from "./screens/ClientList";
import EditBarberScreen from "./screens/EditBarberScreen";
import BarberProfile from "./screens/BarberProfile";
import ViewAppointment from "./screens/ViewAppointment";


function CustomDrawerContent(props) {
    const {user, logout} = useAuth(); // Destructure logout from useAuth

    const handleLogout = async () => {
        await logout();
        props.navigation.closeDrawer(); // Close drawer after logout
    };


    return (
        <ScrollView style={{flex: 1}}>
            <ImageBackground
                source={require('./assets/nav.png')}
                style={{width: undefined, padding: 16, paddingTop: 150, paddingBottom: 10}}
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
                     // Admin specific buttons
                        <>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Admin')} style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>Admin Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('UserManagement')} style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>User Management</Text>
                            </TouchableOpacity>
                        </> 
                        
                    ) : user.role === 'barber' ? (
                        // Barber specific buttons
                        <>
                            <TouchableOpacity onPress={() => props.navigation.navigate('BarberProfile')} style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>My Profile</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        // User specific buttons
                        <>
                            <TouchableOpacity onPress={() => props.navigation.navigate('My Account')}
                                        style={styles.logoutButton}>
                            <Text style={styles.logoutButtonText}>My Account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Appointment')}
                                            style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>Appointment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Consultation')}
                                            style={styles.logoutButton}>
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
}


const Drawer = createDrawerNavigator();

const LogoTitle = () => (
    <Image
        style={{width: 120, height: 50, marginTop: 15}} // Adjust the size according to your logo's dimensions
        source={require('./assets/logo.png')}
        resizeMode="contain" // Ensures that the logo is scaled properly within the header
    />
);

function AppNavigator() {
    const { user } = useAuth();

    // Determine the initial route name based on the user's role
    let initialRouteName = 'Home'; // Default route
    if (user && user.role === 'admin') {
        initialRouteName = 'Admin'; // Redirect to Admin screen if user is an admin
    }

    return (
        <Drawer.Navigator
                    initialRouteName={initialRouteName}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    screenOptions={({route}) => ({
                        headerTitle: () => <LogoTitle/>,
                        drawerActiveBackgroundColor: '#c0c0c0',
                        drawerActiveTintColor: '#ffffff',
                        headerTintColor: '#3e3e3e',
                        headerStyle: {
                            shadowColor: 'transparent',
                            elevation: 0,
                        }, drawerLabelStyle: {
                            fontFamily: 'Roboto', // Apply the font family here
                            fontSize: 16, // Match the font size with TouchableOpacity
                            // fontWeight: 'bold', // Match the font weight
                            color: 'black'
                        },
                        drawerItemStyle: [
                            route.name === 'Signup' ? {display: 'none'} : {},
                            route.name === 'BarberJr' ? {display: 'none'} : {},
                            route.name === 'BarberRenz' ? {display: 'none'} : {},
                            route.name === 'BarberKurt' ? {display: 'none'} : {},
                            route.name === 'BarberHenok' ? {display: 'none'} : {},
                            route.name === 'BarberQyle' ? {display: 'none'} : {},
                            route.name === 'Admin' ? { display: 'none' } : {},
                            route.name === 'CreateBarber' ? {display: 'none'} : {},
                            route.name === 'UserManagement' ? {display: 'none'} : {},
                            route.name === 'BarberList' ? {display: 'none'} : {},
                            route.name === 'ClientList' ? {display: 'none'} : {},
                            route.name === 'WriteReview' ? {display: 'none'} : {},
                            route.name === 'Login' ? {display: 'none'} : {},
                            route.name === 'Appointment' ? {display: 'none'} : {},
                            route.name === 'Consultation' ? {display: 'none'} : {},
                            route.name === 'Reviews' ? {display: 'none'} : {},
                            route.name === 'My Account' ? {display: 'none'} : {},
                            route.name === 'EditUserScreen' ? {display: 'none'} : {},
                            route.name === 'EditBarberScreen' ? {display: 'none'} : {},
                            route.name === 'AppointmentConfirmation' ? { display: 'none' } : {},
                            route.name === 'BarberProfile' ? {display: 'none'} : {},
                            route.name === 'ViewAppointment' ? {display: 'none'} : {},
                            route.name === 'BookingHistory' ? {display: 'none'} : {},
                        ]
                    })}
                >
                    <Drawer.Screen name='Home' component={Home}/>
                    <Drawer.Screen name='Login' component={LoginScreen}/>
                    <Drawer.Screen name='Signup' component={SignupScreen}/>
                    <Drawer.Screen name='Barbers' component={BarbersScreen}/>
                    <Drawer.Screen name='About Us' component={AboutScreen}/>
                    <Drawer.Screen name='BarberJr' component={BarberJr}/>
                    <Drawer.Screen name='BarberRenz' component={BarberRenz}/>
                    <Drawer.Screen name='BarberKurt' component={BarberKurt}/>
                    <Drawer.Screen name='BarberHenok' component={BarberHenok}/>
                    <Drawer.Screen name='BarberQyle' component={BarberQyle}/>
                    { user && user.role === 'admin' ? (
                        <>
                            <Drawer.Screen name='Admin' component={AdminScreen}/>
                            <Drawer.Screen name='CreateBarber' component={CreateBarber}/>
                            <Drawer.Screen name='BarberList' component={BarberList}/>
                            <Drawer.Screen name='ClientList' component={ClientList}/>
                            <Drawer.Screen name='EditBarberScreen' component={EditBarberScreen}/>
                            <Drawer.Screen name='UserManagement' component={UserManagement}/>
                            <Drawer.Screen name="BarberProfile" component={BarberProfile} />
                            <Drawer.Screen name='ViewAppointment' component={ViewAppointment} />
                        </>
                    ) : user && user.role === 'barber' ? (
                        <>
                            <Drawer.Screen name='BarberProfile' component={BarberProfile}/>
                            <Drawer.Screen name='EditBarberScreen' component={EditBarberScreen}/>
                        </>
                    ) : (
                        <>
                            <Drawer.Screen name='My Account' component={MyAccount}/>
                            <Drawer.Screen name='Consultation' component={ConsultationScreen}/>
                            <Drawer.Screen name='Appointment' component={AppointmentScreen}/>
                            <Drawer.Screen name='Reviews' component={ReviewsScreen}/>
                            <Drawer.Screen name='WriteReview' component={WriteReview}/>
                            <Drawer.Screen name='EditUserScreen' component={EditUserScreen}/>
                            <Drawer.Screen name='AppointmentConfirmation' component={AppointmentConfirmation} />
                            <Drawer.Screen name='BookingHistory' component={BookingHistoryScreen}/> 
                        </> 

                    )}             
        </Drawer.Navigator>
    )


}

export default function App() {
    let [fontsLoaded] = useFonts({
      'Roboto': require('./assets/fonts/Roboto-Light.ttf'),
      'Mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'SourceCodePro': require('./assets/fonts/SourceCodePro-Light.ttf'),
    })

    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        </AuthProvider>
    )
}

const styles = StyleSheet.create({
    userName: {
        color: 'white',
        fontSize: 24,
        fontWeight: '300',
    },
    userEmail: {
        color: 'white',
        fontSize: 16,
    },
    drawerItem: {
        // fontFamily: 'Roboto',
        fontSize: 90, // Change the font size to your desired value
        fontWeight: 'bold',
    },
    logoutButtonText: {
        // color: 'black',
        // fontFamily: 'Roboto',
        fontSize: 16,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: '300',
    },
});
