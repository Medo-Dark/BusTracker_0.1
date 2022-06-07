import React from 'react';
import {StyleSheet} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image } from 'react-native';
import Landing from './components/auth/Landing';
import Register from '../Screens/auth/Rejester';
import Login from '../Screens/auth/Login';
import Driver from '../Screens/Main/Driver/Driver';
import User from '../Screens/Main/User/User';

import SplashScreen from '../components/SplashScreen';


const Stack = createNativeStackNavigator();

const AppNav = ()=>{
    return(<NavigationContainer>
   <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen">
                 <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
                 <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                 <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                 <Stack.Screen name="DriverLogin" component={DriverLogin} options={{headerShown: false}}/>
                 <Stack.Screen name = "Sondage" component={Sondage} options={{headerShown: false}}/>
                 <Stack.Screen name = "Driver" component={Driver} options={{headerShown: false}} />
                 <Stack.Screen name = "User" component={User} options={{headerShown: false}} />
               </Stack.Navigator>
              </NavigationContainer>
    </NavigationContainer>)


}

const style = StyleSheet.create({
    header:{
        backgroundColor:"black",
        textAlign:'center',
        
    },
    title:{
        textAlign:'auto',
        color:"white"
    }
})

export default AppNav;