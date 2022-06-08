import React from 'react';
import {StyleSheet} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './Screens/auth/Rejester';
import Login from './Screens/auth/Login';
import Driver from './Screens/Main/Driver/Driver';
import User from './Screens/Main/User/User';
import SplashScreen from './components/SplashScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import ContactUs from './Screens/Main/User/ContactUs';
import { View } from 'react-native';



export default function App() {

  const Stack = createNativeStackNavigator();
  return (<View style={{flex:1}}>
    <ContactUs/>
  </View>
    );
{/* <Provider store={store} >
<NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen">
                 <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                  headerShown: false
        
        }} />
                 <Stack.Screen name="Register" component={Register} options={{
                   headerShown: false
        
        }}/>
                 <Stack.Screen name="Login" component={Login} options={{
                   headerShown: false
        
        }}/>
                 <Stack.Screen name = "Driver" component={Driver} options={{
                   headerShown: false
        
        }} />
                 <Stack.Screen name = "User" component={User} options={{
                   headerShown: false
        
        }} />
               </Stack.Navigator>
    </NavigationContainer>

</Provider> */}
  };
