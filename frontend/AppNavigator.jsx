import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from './AuthContext';
import CustomDrawerContent from './CustomDrawerContent';
import Home from './screens/Home';
import AboutScreen from './screens/AboutScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import AppointmentConfirmation from './screens/AppointmentConfirmation';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ConsultationScreen from './screens/ConsultationScreen';
import BarbersScreen from './screens/BarbersScreen';
import BarberJr from './screens/BarberJr';
import BarberRenz from './screens/BarberRenz';
import BarberKurt from './screens/BarberKurt';
import BarberHenok from './screens/BarberHenok';
import BarberQyle from './screens/BarberQyle';
import CreateBarber from "./screens/CreateBarber";
import UserManagement from "./screens/UserManagement";
import AdminScreen from "./screens/AdminScreen";
import MyAccount from "./screens/MyAccount";
import EditClientAccountScreen from "./screens/EditClientAccountScreen";
import EditUserScreen from "./screens/EditUserScreen";
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import WriteReview from './screens/WriteReview';
import BarberList from "./screens/BarberList";
import ClientList from "./screens/ClientList";
import EditBarberScreen from "./screens/EditBarberScreen";
import BarberProfile from "./screens/BarberProfile";
import ViewBarberAppointment from "./screens/ViewBarberAppointment";

const Drawer = createDrawerNavigator();

const LogoTitle = () => (
    <Image
        style={{ width: 120, height: 50, marginTop: 15 }} // Adjust the size according to your logo's dimensions
        source={require('./assets/logo.png')}
        resizeMode="contain" // Ensures that the logo is scaled properly within the header
    />
);

const AppNavigator = () => {
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
            screenOptions={({ route }) => ({
                headerTitle: () => <LogoTitle />,
                drawerActiveBackgroundColor: '#c0c0c0',
                drawerActiveTintColor: '#ffffff',
                headerTintColor: '#3e3e3e',
                headerStyle: {
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                drawerLabelStyle: {
                    fontSize: 16, // Match the font size with TouchableOpacity
                    color: 'black',
                    fontWeight: '300', // Match the font weight with TouchableOpacity
                },
                drawerItemStyle: [
                    route.name === 'Register' ? { display: 'none' } : {},
                    route.name === 'BarberJr' ? { display: 'none' } : {},
                    route.name === 'BarberRenz' ? { display: 'none' } : {},
                    route.name === 'BarberKurt' ? { display: 'none' } : {},
                    route.name === 'BarberHenok' ? { display: 'none' } : {},
                    route.name === 'BarberQyle' ? { display: 'none' } : {},
                    route.name === 'Admin' ? { display: 'none' } : {},
                    route.name === 'CreateBarber' ? { display: 'none' } : {},
                    route.name === 'UserManagement' ? { display: 'none' } : {},
                    route.name === 'BarberList' ? { display: 'none' } : {},
                    route.name === 'ClientList' ? { display: 'none' } : {},
                    route.name === 'WriteReview' ? { display: 'none' } : {},
                    route.name === 'Login' ? { display: 'none' } : {},
                    route.name === 'Appointment' ? { display: 'none' } : {},
                    route.name === 'Consultation' ? { display: 'none' } : {},
                    route.name === 'Reviews' ? { display: 'none' } : {},
                    route.name === 'My Account' ? { display: 'none' } : {},
                    route.name === 'EditClientAccountScreen' ? { display: 'none' } : {},
                    route.name === 'EditUserScreen' ? { display: 'none' } : {},
                    route.name === 'EditBarberScreen' ? { display: 'none' } : {},
                    route.name === 'AppointmentConfirmation' ? { display: 'none' } : {},
                    route.name === 'BarberProfile' ? { display: 'none' } : {},
                    route.name === 'ViewAppointment' ? { display: 'none' } : {},
                    route.name === 'BookingHistory' ? { display: 'none' } : {},
                ]
            })}
        >
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='Login' component={LoginScreen} />
            <Drawer.Screen name='Register' component={RegisterScreen} />
            <Drawer.Screen name='Barbers' component={BarbersScreen} />
            <Drawer.Screen name='About Us' component={AboutScreen} />
            <Drawer.Screen name='BarberJr' component={BarberJr} />
            <Drawer.Screen name='BarberRenz' component={BarberRenz} />
            <Drawer.Screen name='BarberKurt' component={BarberKurt} />
            <Drawer.Screen name='BarberHenok' component={BarberHenok} />
            <Drawer.Screen name='BarberQyle' component={BarberQyle} />
            <Drawer.Screen name='My Account' component={MyAccount} />
            <Drawer.Screen name='EditClientAccountScreen' component={EditClientAccountScreen} />
            {user && user.role === 'admin' ? (
                <>
                    <Drawer.Screen name='Admin' component={AdminScreen} />
                    <Drawer.Screen name='CreateBarber' component={CreateBarber} />
                    <Drawer.Screen name='BarberList' component={BarberList} />
                    <Drawer.Screen name='ClientList' component={ClientList} />
                    <Drawer.Screen name='UserManagement' component={UserManagement} />
                    <Drawer.Screen name="BarberProfile" component={BarberProfile} />
                    <Drawer.Screen name='ViewAppointment' component={ViewBarberAppointment} />
                    <Drawer.Screen name='EditUserScreen' component={EditUserScreen} />
                    <Drawer.Screen name='Appointment' component={AppointmentScreen} />
                </>
            ) : user && user.role === 'barber' ? (
                <>
                    <Drawer.Screen name='BarberProfile' component={BarberProfile} />
                    <Drawer.Screen name='ViewAppointment' component={ViewBarberAppointment} />
                    <Drawer.Screen name='Appointment' component={AppointmentScreen} />
                </>
            ) : (
                <>
                    <Drawer.Screen name='Consultation' component={ConsultationScreen} />
                    <Drawer.Screen name='Appointment' component={AppointmentScreen} />
                    <Drawer.Screen name='Reviews' component={ReviewsScreen} />
                    <Drawer.Screen name='WriteReview' component={WriteReview} />
                    <Drawer.Screen name='EditUserScreen' component={EditUserScreen} />
                    <Drawer.Screen name='AppointmentConfirmation' component={AppointmentConfirmation} />
                    <Drawer.Screen name='BookingHistory' component={BookingHistoryScreen} />
                </>
            )}
        </Drawer.Navigator>
    )
}

export default AppNavigator;
