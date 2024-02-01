import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars'; // Import Calendar from react-native-calendars
import { ScrollView } from 'react-native-gesture-handler';

const AppointmentScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState('JR');
    const [selectedService, setSelectedService] = useState('Haircut');

    const handleAppointmentSubmit = () => {
        // Logic to submit the appointment
    };

    const timeSlots = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

    return (
        <ScrollView style={{ padding: 30 }}>
            <Text style={{fontSize:'32', textAlign:'center'}}>Barber Appointment</Text>
            <Text style={styles.headerTxt}>Select Barber:</Text>
            <Picker
                style={styles.dropdown}
                selectedValue={selectedBarber}
                onValueChange={(itemValue, itemIndex) => setSelectedBarber(itemValue)}
                itemStyle={styles.pickerItem} // Add an itemStyle to style each option
            >
                <Picker.Item label="JR" value="JR" />
                <Picker.Item label="Kurt" value="Kurt" />
                <Picker.Item label="Renz" value="Renz" />
            </Picker>
            <Text style={styles.headerTxt}>Select Service:</Text>
            
            <Picker
                style={styles.dropdown}
                selectedValue={selectedService}
                onValueChange={(itemValue, itemIndex) => setSelectedService(itemValue)}
                itemStyle={styles.pickerItem} // Add an itemStyle to style each option
            >
                <Picker.Item label="Haircut" value="Haircut" />
                <Picker.Item label="Haircut + Beard" value="Haircut + Beard" />
                <Picker.Item label="Braids" value="Braids" />
            </Picker>

            <Text style={styles.headerTxt}>Select Date:</Text>
            <Calendar
                // change color of the calendar
                
                style={styles.calendar}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{ [selectedDate]: { selected: true } }}
                minDate={new Date().toISOString().split('T')[0]}
            />

            <Text style={styles.headerTxt}>Select Time:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {timeSlots.map((time, index) => (
                    // Touchable opacity to select the time 4 rows 2 columns
                    <TouchableOpacity
                        key={index}
                        style={{
                            padding: 10,
                            backgroundColor: selectedTime === time ? '#3e3e3e' : 'lightgrey',
                            borderRadius: 5,
                            margin: 5,
                            width: '45%',
                            alignItems: 'center',
                        }}
                        onPress={() => setSelectedTime(time)}>
                        <Text style={{ color: selectedTime === time ? 'white' : 'black' }}>{time}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.jumpTo("Appointment")}>
                <Text style={styles.buttonTxt}>Book Appointment</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = {
    button: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 175,
        marginTop: 30,
        marginBottom: 100,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonTxt: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    headerTxt: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 0,
    },
    dropdown: {
        width: 250,
        alignSelf: 'center',
        margin:0
    },

    pickerItem: {
        fontSize: 16,
        marginTop: 0
        
    },
}

export default AppointmentScreen;
