import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const AppointmentScreen = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [selectedTime, setSelectedTime] = useState(null);
    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState({id: null, name: 'Select Barber'});
    const [selectedService, setSelectedService] = useState('Select Service');
    const [isBarberModalVisible, setBarberModalVisible] = useState(false);
    const [isServiceModalVisible, setServiceModalVisible] = useState(false);
    

    const services = ['Haircut', 'Haircut + Beard', 'Braids'];
    const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];


    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                // Assuming your backend endpoint for fetching barbers is something like this
                const response = await fetch('http://localhost:3000/api/users/barbers', {
                    headers: {
                        'Content-Type': 'application/json',
                    
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch barbers');
                const data = await response.json();
                setBarbers(data); // Assuming the response is an array of barbers
            } catch (error) {
                console.error('Error fetching barbers:', error);
                Alert.alert('Error', 'Failed to fetch barbers');
            }
        };

        fetchBarbers();
    }, []);

    useEffect(() => {
        markMondays();
    }, []);

    const markMondays = () => {
        let newMarkedDates = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date
    
        // Calculate the end date for marking Mondays (e.g., 12 months from today)
        const endDate = new Date(new Date().setMonth(today.getMonth() + 12));
    
        for (let date = new Date(today); date <= endDate; date.setDate(date.getDate() + 1)) {
            // Check if the day is Monday
            if (date.getDay() === 1) {
                const dateString = date.toISOString().split('T')[0];
    
                newMarkedDates[dateString] = {
                    disabled: true,
                    disableTouchEvent: true,
                    customStyles: {
                        text: {
                            color: 'lightgrey',
                        },
                    },
                };
            }
        }
    
        setMarkedDates(newMarkedDates);
    };
    

    const createAppointment = async () => {
        // Step 1: Convert the selected date to a Date object
        const appointmentDate = new Date(selectedDate);
    
        // Step 2: Extract the hour and minutes from the selected time
        const [selectedHour, modifier] = selectedTime.split(' ');
        let [hours, minutes] = selectedHour.split(':');
        hours = parseInt(hours);
        minutes = parseInt(minutes);
    
        // Convert to 24-hour format if necessary
        if (modifier === 'PM' && hours < 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0; // Midnight is 00 in 24-hour time
        }
    
        // Set the hours and minutes on the appointment date
        appointmentDate.setHours(hours, minutes);
    
        // Step 3: Prepare the appointment details with the combined date and time
        const appointmentDetails = {
            clientId: '123', // Assuming you have a client ID
            barberId: selectedBarber.id,
            service: selectedService,
            dateTime: appointmentDate.toISOString(), // Using ISO string format for the combined date and time
        };
    
        try {
            const response = await fetch('http://localhost:3000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentDetails),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error('Appointment creation failed:', data);
                Alert.alert('Failed to create appointment');
                return;
            }
    
            // Construct a message string with appointment details
            const appointmentDetailsMessage = `
            Appointment created successfully!
            Barber: ${selectedBarber}
            Service: ${selectedService}
            Date and Time: ${appointmentDate.toLocaleString()}
            `;
            Alert.alert('Success', appointmentDetailsMessage);
            // Optional: Reset form or navigate
            navigation.navigate('Home');
        } catch (error) {
            console.error('Appointment creation failed:', error);
            Alert.alert('Failed to create appointment');
        }
    };
    

    

    const renderBarberDropDown = (options, selectedValue, setValue, setModalVisible) => (
        <Modal
            transparent={true}
            visible={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setModalVisible(false)}
            >
                <View style={styles.modalContent}>
                    {options.map((barber) => (
                        <TouchableOpacity
                            key={barber._id}
                            style={styles.modalItem}
                            onPress={() => {
                                setValue({id: barber._id, name: barber.firstName}); // Store both the barber's ID and name
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{color: selectedValue.id === barber._id ? '#000' : '#666'}}>
                                {barber.firstName}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
    
    const renderServicesDropDown = (options, selectedValue, setValue, setModalVisible) => (
        <Modal
            transparent={true}
            visible={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setModalVisible(false)}
            >
                <View style={styles.modalContent}>
                    {options.map((service, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.modalItem}
                            onPress={() => {
                                setValue(service); // Store the selected service
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{ color: selectedValue === service ? '#000' : '#666' }}>
                                {service}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );


    return (
        <View style={{backgroundColor: 'white'}}>
            <ScrollView>
                <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20, fontFamily: 'Roboto', fontWeight: 'bold'}}>Book an Appointment</Text>
                <View style={styles.container}>
                    {/* Select Barber */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.headerTxt}>Select Barber: </Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setBarberModalVisible(true)}
                        >
                            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                <Text style={styles.selectedField}>{selectedBarber.name}</Text>
                                <FontAwesomeIcon icon={faChevronDown} size={12} color="#000" />
                            </View>
                        </TouchableOpacity>
                        {isBarberModalVisible && renderBarberDropDown(barbers, selectedBarber, setSelectedBarber, setBarberModalVisible)}

                    </View>
                    
                    {/* Select Service */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.headerTxt}>Select Service:</Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setServiceModalVisible(true)}
                        >
                            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                <Text style={styles.selectedField}>{selectedService}</Text>
                                <FontAwesomeIcon icon={faChevronDown} size={12} color="#000" />
                            </View>
                        </TouchableOpacity>
                        {isServiceModalVisible && renderServicesDropDown(services, selectedService, setSelectedService, setServiceModalVisible)}
                    </View>

                    <Text style={styles.headerTxt}>Select Date:</Text>
                    <Calendar
                        markingType={'custom'}
                        markedDates={{
                            ...markedDates, // This includes the marking of Mondays as non-selectable
                            [selectedDate]: { ...markedDates[selectedDate], selected: true, selectedColor: '#333333' }, // Merge any existing marks with the selection
                        }}
                        onDayPress={(day) => {
                            if (!markedDates[day.dateString]?.disabled) { // Check if the day is not disabled (not a Monday in this context)
                                setSelectedDate(day.dateString);
                            }
                        }}
                        style={styles.calendar}
                        minDate={new Date().toISOString().split('T')[0]}
                        theme={{
                            selectedDayBackgroundColor: '#c0c0c0',
                            todayTextColor: 'red',
                            arrowColor: '#c0c0c0',
                            dotColor: 'red',
                            textDayFontWeight: '500',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '500',
                            textDayFontSize: 14,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 14,
                        }}
                    />

                    
                    <Text style={styles.headerTxt}>Select Time:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
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
                                <Text style={{ color: selectedTime === time ? 'white' : 'black', fontFamily:'Roboto' }}>{time}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                

                <TouchableOpacity style={styles.button} onPress={createAppointment}>
                    <Text style={styles.buttonTxt}>Book Appointment</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                // on press navigate to consultation screen
                onPress={() => navigation.jumpTo("Consultation")}
            >
                <FontAwesomeIcon icon={faComment} color='#ffffff' size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    // Add your existing styles here
    container:{
        backgroundColor:'white',
        padding: 40,
    },
    dropdownContainer:{
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#3e3e3e',
        padding: 10,
        width: 175,
        marginTop: 30,
        marginBottom: 50,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonTxt: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    headerTxt: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 0,
        fontFamily: 'Roboto',
    },
    calendar: {
        marginTop: 10,
        marginBottom: 20,
    },
    
    fab: {
        position: 'absolute',
        backgroundColor: '#3e3e3e',
        right: 16,
        bottom: 16,
        padding: 20,
        borderRadius: 100,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    dropdownButton: {
        width: 200,
        alignSelf: 'center',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedField: {
        fontFamily: 'Roboto',
    },
    // Extend your existing styles
});

export default AppointmentScreen;
