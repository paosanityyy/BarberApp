// CustomDrawerContent.js

import React from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = ({ navigation, user }) => {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <View>
        {user ? (
          <>
            <Text>{user.username}</Text>
            <Text>{user.email}</Text>
            {/* Display other user information */}
          </>
        ) : (
          <Text>Login or Signup Here</Text>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
