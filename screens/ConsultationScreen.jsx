// import { GiftedChat } from 'react-native-gifted-chat';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Picker, TextInput } from 'react-native';


const ConsultationScreen = () => {
  // const [messages, setMessages] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState('JR');
  return (

  <View>
    <ScrollView>
    <Text style={{fontSize:'32', textAlign:'center'}}>Consultation Screen</Text>
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
        <TextInput 
                placeholder="Message..."
                // change placeholder color
                placeholderTextColor="#c0c0c0"
                style={styles.input}
            />
    </ScrollView>
  </View>
    // <GiftedChat
    //   messages={messages}
    //   onSend={(newMessages) =>
    //     setMessages((previousMessages) =>
    //       GiftedChat.append(previousMessages, newMessages),
    //     )
    //   }
    //   user={{ _id: 1 }}
    // />
  );
};
export default ConsultationScreen