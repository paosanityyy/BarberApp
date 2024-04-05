import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';

const AppointmentScreen = ({navigation}) => {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState({id: '', name: 'Select Barber'}); // Initialize the selected barber with an empty object
    const [selectedService, setSelectedService] = useState('Haircut');
    const [isBarberModalVisible, setBarberModalVisible] = useState(false);
    const [isServiceModalVisible, setServiceModalVisible] = useState(false);

    const services = ['Haircut', 'Haircut + Beard', 'Braids'];
    const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];


    if (!user) {
        // Display login message if no user is logged in
        return (
            <View style={styles.container}>
            <View style={styles.noUser}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.goToLogin}>Log in to book an appointment</Text>
                </TouchableOpacity>
                <Text style={styles.NoUserfooterText}>© 2023 Central Studios. All Rights Reserved.</Text>
            </View>
            </View>
        );
    }


    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const response = await fetch(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/users/barbers`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch barbers');
                const data = await response.json();
                setBarbers(data);
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

    useEffect(() => {
        const fetchBookedSlots = async () => {
            if (selectedDate && selectedBarber.id) {
                const formattedDate = selectedDate; // Ensure this is in the format your backend expects
                try {
                    const response = await fetch(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/appointments/bookedSlots?date=${formattedDate}&barberId=${selectedBarber.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) throw new Error('Failed to fetch booked slots');
                    const bookedSlotsData = await response.json();
                    setBookedSlots(bookedSlotsData); // Update your state with the fetched data
                } catch (error) {
                    console.error('Error fetching booked slots:', error);
                    Alert.alert('Error', 'Failed to fetch booked slots');
                }
            }
        };
    
        fetchBookedSlots();
    }, [selectedDate, selectedBarber.id]);
    

    const createAppointment = async () => {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000; // in milliseconds
    const localDate = new Date(selectedDate);
    const adjustedDate = new Date(localDate.getTime() + timeZoneOffset);
    
    const appointmentDate = new Date(adjustedDate);
    const [selectedHour, modifier] = selectedTime.split(' ');
    let [hours, minutes] = selectedHour.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (modifier === 'PM' && hours < 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    appointmentDate.setHours(hours, minutes);

    const appointmentDetails = {
        clientId: user.id,
        barberId: selectedBarber.id,
        service: selectedService,
        date: appointmentDate.toISOString(), // Send the adjusted date
    };

        console.log('Creating appointment:', appointmentDetails);

        try {
            const response = await fetch(`https://centralstudios-ca-a198e1dad7a2.herokuapp.com/api/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentDetails),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Appointment creation failed:', errorData);
                Alert.alert('Error', 'Failed to create appointment');
                return;
            }

            const appointmentDetailsForScreen = {
                name: user.firstName,
                barberName: selectedBarber.name,
                service: selectedService,
                date: appointmentDate.toLocaleString(),
            };

            navigation.navigate('AppointmentConfirmation', { appointmentDetails: appointmentDetailsForScreen });
        } catch (error) {
            console.error('Appointment creation error:', error);
            Alert.alert('Error', 'An error occurred while booking the appointment.');
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
                                setValue({id: barber._id, name: barber.firstName}); // Update this line
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
                <Text style={{fontSize: 24, textAlign: 'center', marginTop: 20, fontWeight: 'bold'}}>Book an Appointment</Text>
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
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {timeSlots.map((time, index) => {
                            const isBooked = bookedSlots.includes(time); // Check if the current slot is booked
                            return (
                                <TouchableOpacity
                                    key={index}
                                    disabled={isBooked}
                                    style={{
                                        padding: 10,
                                        backgroundColor: isBooked ? 'grey' : selectedTime === time ? '#3e3e3e' : 'lightgrey',
                                        borderRadius: 5,
                                        margin: 5,
                                        width: '45%',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => setSelectedTime(time)}
                                >
                                    <Text style={{ color: isBooked ? 'darkgrey' : selectedTime === time ? 'white' : 'black' }}>
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
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
        // fontFamily: 'Roboto',
    },
    headerTxt: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 0,
        // fontFamily: 'Roboto',
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
        // fontFamily: 'Roboto',
    },
    noUser: {
        padding: 20,
        marginTop: 110,
      },
      goToLogin: {
        color: 'white',
        // fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 80,
      },
      logo: {
        marginTop: 0,
        width: 310,
        height: 85,
        alignSelf: 'center', // Adjust the alignment of the logo
      },
      NoUserfooterText: {
        textAlign: 'center',
        padding: 0,
        marginTop: 380,
        fontWeight: '100',
      }
    // Extend your existing styles
});

export default AppointmentScreen;
