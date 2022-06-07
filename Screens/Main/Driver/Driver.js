import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
//screens

import Profile from './Profile';
import Map from './Map';
import EditProfile from './EditProfile';

//navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();





const Tab = createBottomTabNavigator();

export default function Driver (navigation) {
  return (
    <View style={styles.tab}>
        <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Tab.Screen name="Map" component={Map} options={{headerShown: false}}/>
        <Stack.Screen name='EditProfile' component={EditProfile} options={{headerShown: false}}/>
        </Tab.Navigator>
    </View>
        
        
    
  )
}



const styles = StyleSheet.create({
    tab:{
        flex:1
    }
})