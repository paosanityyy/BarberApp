import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import AppointmentConfirmation from './AppointmentConfirmation';

const AppointmentScreen = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState('JR');
    const [selectedService, setSelectedService] = useState('Haircut');
    const [isBarberModalVisible, setBarberModalVisible] = useState(false);
    const [isServiceModalVisible, setServiceModalVisible] = useState(false);

    const barbers = ['JR', 'Kurt', 'Renz', 'Henok', 'Qyle'];
    const services = ['Haircut', 'Haircut + Beard', 'Braids'];

    const handleAppointmentSubmit = () => {
        // Logic to submit the appointment
    };

    const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

    const renderModalContent = (options, selectedValue, setValue, setModalVisible) => (
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
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.modalItem}
                            onPress={() => {
                                setValue(option);
                                setModalVisible(false);
                            }}
                        >
                            <Text style={{color: selectedValue === option ? '#000' : '#666'}}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );

     // Step 1: Add state variable for modal visibility
     const [isConfirmationVisible, setConfirmationVisible] = useState(false);

     // Step 2: Function to open the confirmation modal
     const handleOpenConfirmation = () => {
         // Submit the appointment details here if needed
         setConfirmationVisible(true);
     };
 
     // Step 3: Function to close the confirmation modal and navigate back to Home
     const handleCloseConfirmation = () => {
         setConfirmationVisible(false);
         navigation.navigate('Home'); // Replace 'Home' with the actual name of your home route
     };

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
                                <Text style={styles.selectedField}>{selectedBarber}</Text>
                                <FontAwesomeIcon icon={faChevronDown} size={12} color="#000" />
                            </View>
                        </TouchableOpacity>
                        {isBarberModalVisible && renderModalContent(barbers, selectedBarber, setSelectedBarber, setBarberModalVisible)}

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
                        {isServiceModalVisible && renderModalContent(services, selectedService, setSelectedService, setServiceModalVisible)}
                    </View>

                    <Text style={styles.headerTxt}>Select Date:</Text>
                    <Calendar
                        // change color of the calendar
                        
                        style={styles.calendar}
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={{ [selectedDate]: { selected: true, selectedColor: 'grey' }}}
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
                

                <TouchableOpacity style={styles.button} onPress={handleOpenConfirmation}>
                    <Text style={styles.buttonTxt}>Book Appointment</Text>
                </TouchableOpacity>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isConfirmationVisible}
                onRequestClose={handleCloseConfirmation}
            >
                <AppointmentConfirmation onClose={handleCloseConfirmation} />
            </Modal>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => {}}
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
