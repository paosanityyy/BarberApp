import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Text } from 'react-native'
import Home from './screens/Home';
import AppointmentScreen from './screens/AppointmentScreen';

const Drawer = createDrawerNavigator();

export default function App(){
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerTitle:' '
                }}
            >
                <Drawer.Screen name='Home' component={Home} />
                <Drawer.Screen name='Appointment' component={AppointmentScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}