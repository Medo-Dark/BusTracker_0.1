import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
//screens

import Profile from './Profile';
import Map from './Map';
import ContactUs from '../User/ContactUs';
import EditProfile from './EditProfile'
//navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();





const Tab = createBottomTabNavigator();

export default function Driver (navigation) {
  return (
    <View style={styles.tab}>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Profile') {
                iconName ='person-circle-outline';
              } else if (route.name === 'Map') {
                iconName ='compass-outline';

              } else if (route.name === 'ContactUs') {
                iconName ='information-circle';

              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0D6CFC',
            tabBarInactiveTintColor: 'gray',
          })} >
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Tab.Screen name="Map" component={Map} options={{headerShown: false}}/>
        <Tab.Screen name='ContactUs' component={ContactUs} options={{headerShown: false}}/>
        </Tab.Navigator>
    </View>
        
        
    
  )
}



const styles = StyleSheet.create({
    tab:{
        flex:1
    }
})