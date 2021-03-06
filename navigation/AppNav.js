import React from 'react';
import {StyleSheet , View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StationsList from '../components/StationsList';
import BusList from '../components/BusList';
import SplashScreen from '../components/SplashScreen';
import { Provider } from 'react-redux';
import { store } from '../store';
import BusCopiesList from '../components/BusCopiesList';

const Stack = createNativeStackNavigator();

const AppNav = ()=>{
    return(
    <Stack.Navigator initialRouteName='Stations'>
        <Stack.Screen name= "Stations" component={StationsList} options={{headerShown: false}}/>
        <Stack.Screen name="Bus" component={BusList} options={{headerShown: false}}/>
         <Stack.Screen name="Copies" component={BusCopiesList}options={{headerShown: false}}/>
        </Stack.Navigator>
)


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








