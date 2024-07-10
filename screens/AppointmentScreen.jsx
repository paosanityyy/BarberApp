import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faChevronDown, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const AppointmentScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [selectedTime, setSelectedTime] = useState(null);
    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState({ id: '', name: 'Select Barber' });
    const [selectedService, setSelectedService] = useState('Haircut');
    const [isBarberModalVisible, setBarberModalVisible] = useState(false);
    const [isServiceModalVisible, setServiceModalVisible] = useState(false);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [isTimeSlotsVisible, setTimeSlotsVisible] = useState(false);

    const services = ['Haircut', 'Haircut + Beard', 'Braids'];
    const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const response = await axios.get(`/api/users/barbers`);
                setBarbers(response.data);
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
    
        const endDate = new Date(new Date().setMonth(today.getMonth() + 12));
    
        for (let date = new Date(today); date <= endDate; date.setDate(date.getDate() + 1)) {
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
            clientId: user._id,
            barberId: selectedBarber.id,
            service: selectedService,
            date: appointmentDate.toISOString(), // Send the adjusted date
        };

        console.log('Creating appointment:', appointmentDetails);

        try {
            const response = await axios.post(`/api/appointments`, appointmentDetails);

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
                                setValue({ id: barber._id, name: barber.firstName });
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{ color: selectedValue.id === barber._id ? '#000' : '#666' }}>
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

    const renderCalendarModal = () => (
        <Modal
            transparent={true}
            visible={true}
            onRequestClose={() => setCalendarVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setCalendarVisible(false)}
            >
                <View style={styles.modalContent}>
                    <Calendar
                        markingType={'custom'}
                        markedDates={{
                            ...markedDates,
                            [selectedDate]: { ...markedDates[selectedDate], selected: true, selectedColor: '#333333' },
                        }}
                        onDayPress={(day) => {
                            if (!markedDates[day.dateString]?.disabled) {
                                setSelectedDate(day.dateString);
                                setCalendarVisible(false);
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
                </View>
            </TouchableOpacity>
        </Modal>
    );

    const renderTimeSlotsModal = () => (
        <Modal
            transparent={true}
            visible={true}
            onRequestClose={() => setTimeSlotsVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setTimeSlotsVisible(false)}
            >
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: 'column', justifyContent:'center',  gap:10 }}>
                        {timeSlots.map((time, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity
                                        style={{
                                            padding: 10,
                                            backgroundColor: selectedTime === time ? '#3e3e3e' : 'lightgrey',
                                            borderRadius: 5,
                                            alignItems: 'center',
                                        }}
                                        onPress={() => {
                                            setSelectedTime(time);
                                            setTimeSlotsVisible(false);
                                        }}
                                    >
                                        <Text style={{ color: selectedTime === time ? 'white' : 'black' }}>
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    // Early return for non-logged in users should be here to avoid hook issues
    if (!user) {
        return (
            <View style={styles.container}>
                <View style={styles.noUser}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.goToLogin}>Log in to book an appointment</Text>
                    </TouchableOpacity>
                    <Text style={styles.NoUserFooterText}>© 2023 Central Studios. All Rights Reserved.</Text>
                </View>
            </View>
        );
    }

    return (
        <View>
            <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
                <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20, fontWeight: 'bold' }}>Book an Appointment</Text>
                <View style={styles.container}>
                    {/* Select Barber */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.headerTxt}>Select Barber: </Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setBarberModalVisible(true)}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.selectedField}>{selectedService}</Text>
                                <FontAwesomeIcon icon={faChevronDown} size={12} color="#000" />
                            </View>
                        </TouchableOpacity>
                        {isServiceModalVisible && renderServicesDropDown(services, selectedService, setSelectedService, setServiceModalVisible)}
                    </View>

                    {/* Select Date */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.headerTxt}>Select Date:</Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setCalendarVisible(true)}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.selectedField}>{selectedDate || 'YYYY-MM-dd'}</Text>
                                <FontAwesomeIcon icon={faCalendar} size={12} color="#000" />
                            </View>
                        </TouchableOpacity>
                        {isCalendarVisible && renderCalendarModal()}
                    </View>

                    {/* Select Time */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.headerTxt}>Select Time:</Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setTimeSlotsVisible(true)}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.selectedField}>{selectedTime || 'Select Time'}</Text>
                                <FontAwesomeIcon icon={faChevronDown} size={12} color="#000" />
                            </View>
                        </TouchableOpacity>
                        {isTimeSlotsVisible && renderTimeSlotsModal()}
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={createAppointment}>
                    <Text style={styles.buttonTxt}>Book Appointment</Text>
                </TouchableOpacity>

            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.jumpTo("Consultation")}
            >
                <FontAwesomeIcon icon={faComment} color='#ffffff' size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 50
    },
    dropdownContainer: {
        padding: 10,
        flexDirection: 'row',
        alignSelf: 'center',
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
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    headerTxt: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 0,
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
        color: '#000',
        fontSize: 18,
    },
    selectedDate: {
        alignSelf: 'center',
    },
    noUser: {
        padding: 20,
        marginTop: 110,
    },
    goToLogin: {
        color: 'white',
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
        alignSelf: 'center',
    },
    NoUserFooterText: {
        textAlign: 'center',
        padding: 0,
        marginTop: 380,
        fontWeight: '100',
    }
});

export default AppointmentScreen;
