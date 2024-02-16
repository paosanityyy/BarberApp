import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Animated, TouchableOpacity, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faCut } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import MapView, { Marker } from 'react-native-maps';

const AboutScreen = () => {

    const shopLocation = {
        latitude: 43.697, // Update with the actual latitude
        longitude: -79.467, // Update with the actual longitude
      };
    
      const openMaps = () => {
        const url=`https://www.google.com/maps/search/?api=1&destination=${shopLocation.latitude},${shopLocation.longitude}`;
        Linking.openURL(url);
      }

  return (
    <View style={styles.AboutUsContainer}>    
        <ScrollView>
      {/* Contact Information */}
      <Text style={styles.aboutUsText}>Central Studios</Text>
      <Text style={styles.addressText}>
        876 Weston Road, York, Ontario M5N 3R6, Canada
      </Text>
      <Text style={styles.contactsText}>centrastudio01@gmail.com</Text>
      <Text style={styles.contactsText}>(416)766-6957</Text>

      <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: shopLocation.latitude,
              longitude: shopLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={shopLocation} title="Central Studios" />
            <TouchableOpacity style={styles.directionsButton} onPress={openMaps}>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="#fff" size={16} style={styles.icon} />
            <Text style={styles.directionsButtonText}>Get Directions</Text>
          </TouchableOpacity>
          </MapView>

        </View>
      {/* Separator Line */}
      <View style={styles.separatorLine} />

  

      {/* Table of Hours */}
      {/* Hours Text */}
      <Text style={styles.aboutUsText}>Hours</Text>

      {/* Table of Hours */}
      <View style={styles.hoursTableContainer}>
      <View style={styles.hoursTable}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>Monday:</Text>
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursText}>Closed</Text>
        </View>
      </View>
      <View style={styles.hoursTable}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>Tuesday:</Text>
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursText}>11:00am - 7:00pm</Text>
        </View>
      </View>
      <View style={styles.hoursTable}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>Wednesday:</Text>
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursText}>11:00am - 7:00pm</Text>
        </View>
      </View>
      <View style={styles.hoursTable}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>Thursday:</Text>
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursText}>11:00am - 7:00pm</Text>
        </View>
      </View>
      <View style={styles.hoursTable}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>Friday:</Text>
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursText}>10:00am - 7:00pm</Text>
        </View>
      </View>
      <View style={styles.hoursTable}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>Saturday:</Text>
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursText}>10:00am - 8:00pm</Text>
        </View>
      </View>
      <View style={styles.hoursTable}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>Sunday:</Text>
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursText}>11:00am - 6:00pm</Text>
        </View>
      </View>       
      </View>
      <Text style={styles.footer}>© 2023 Central Studios. All Rights Reserved.</Text>
      {/* Repeat the above structure for each day */}
      {/* ... (Repeat for Tuesday, Wednesday, etc.) */}
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
  AboutUsContainer: {
    backgroundColor: '#ffffff',
    height: '100%',
  },  
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#d3d3d3',
    marginTop: 40,
  },
  aboutUsText: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontSize: 22,
    fontFamily: 'SourceCodePro',
  },
  shopImage: {
    width: '100%',
    height: 300,
    marginTop: 30,
  },
  infoText: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
   

  },
  offerImage: {
    width: '100%',
    height: 200,
    marginTop: 30,
  },
  offerText: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 10,
 
  },
  addressText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
   
  },
  contactsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  
  },
  hoursTable: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayContainer: {
    width: 100, // Adjust the width as needed
  },
  hoursContainer: {
     flex: 1,// Takes remaining space
  },
  hoursText: {
    marginLeft: 10,
    fontSize: 15,
  
  },
  dayText: {
    fontSize: 15,
    marginRight: 10,

  },
  hoursTableContainer: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    marginHorizontal: 95, // Add some top margin if needed
  },
  footer: {
    textAlign: 'center',
    marginBottom: 30,
    padding: 15,
    fontWeight: '200',
    marginTop: 90,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#3e3e3e',
    right: 16,
    bottom: 16,
    paddingVertical: 20, 
    paddingHorizontal: 20, 
    borderRadius: 100,
  },
  map: {
    height: 200,
    margin: 30,

  },
  addressText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
  },
// Get Directions Button
mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  map: {
    height: 200,
    width: '100%',
    margin: 15,

  },
  directionsButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.7)', // Semi-transparent grey background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  directionsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});

export default AboutScreen;
