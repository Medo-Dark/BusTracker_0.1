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
        <Stack.Screen name= "Stations" component={StationsList} options={{
           headerStyle:style.header,
           headerTitleStyle:style.title
        
        }
        } />
        <Stack.Screen name="Bus" component={BusList} options={{
           headerStyle:style.header,
           headerTitleStyle:style.title,
           animation:'slide_from_right'
        
        }
        }/>
         <Stack.Screen name="Copies" component={BusCopiesList} options={{
           headerStyle:style.header,
           headerTitleStyle:style.title,
           animation:'slide_from_right'
        
        }
        }/>
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








