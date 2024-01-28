import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
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
        <ScrollView style={{ padding: 20 }}>
            <Text>Barber Appointment</Text>

            <Text>Select Barber:</Text>
            <Picker
                selectedValue={selectedBarber}
                onValueChange={(itemValue, itemIndex) => setSelectedBarber(itemValue)}>
                <Picker.Item label="JR" value="JR" />
                <Picker.Item label="Kurt" value="Kurt" />
                <Picker.Item label="Renz" value="Renz" />
            </Picker>

            <Text>Select Service:</Text>
            <Picker
                selectedValue={selectedService}
                onValueChange={(itemValue, itemIndex) => setSelectedService(itemValue)}>
                <Picker.Item label="Haircut" value="Haircut" />
                <Picker.Item label="Haircut + Beard" value="Haircut + Beard" />
                <Picker.Item label="Braids" value="Braids" />
            </Picker>

            <Text>Select Date:</Text>
            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{ [selectedDate]: { selected: true } }}
                minDate={new Date().toISOString().split('T')[0]}
            />

            <Text>Select Time:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {timeSlots.map((time, index) => (
                    <Button
                        key={index}
                        title={time}
                        onPress={() => setSelectedTime(time)}
                        style={{ marginBottom: 10 }}
                    />
                ))}
            </View>

            <Button title="Book Appointment" onPress={handleAppointmentSubmit} />
        </ScrollView>
    );
};

export default AppointmentScreen;
