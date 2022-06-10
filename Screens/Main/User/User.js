import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, Text, View, StyleSheet ,StatusBar } from 'react-native';
import Map from "../../../map";
import ContactUs from './ContactUs';
import Profile from '../Driver/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

export default function User() {
  return (
    

      <Drawer.Navigator>
        <Drawer.Screen name='Map' component={Map}  />
        <Drawer.Screen name='Profil' component={Profile}  />
        <Drawer.Screen name='Contact Us' component={ContactUs} />
      </Drawer.Navigator>

 


  );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
paragraph:{
  justifyContent:"center",
  alignItems:"center"
}

})