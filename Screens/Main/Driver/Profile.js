import { StyleSheet, Text, View, ScollView, SafeAreaView, Image, FlatList, Button } from 'react-native'
import React , {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backToOldDays } from '../../../slices/userSlice';

//import { setDriverLoc } from '../../../redux/reducers/locationReducer'
//import {setLocalisation} from './Map';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';


export default function Profile({navigation}) {
  const disptach = useDispatch();
   const userId = useSelector((state)=>state.user.userId);
   const targetedUser = useSelector((state)=>state.user.targetedUser);
   console.log(userId);
   console.log('------------------------in Driver--------------------------------',targetedUser);

   const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('UserData');
    } catch(e) {
      Alert.alert("Error accured while Loggin out");
    }
  
    console.log('Done.')
  }

    const Logout = () =>{
        removeValue();
        disptach(backToOldDays());
        navigation.replace('Login');
    }

  
  return (
    <View >
      
      <View style = {styles.header}></View>
      <Text style={styles.username}> {targetedUser.userName} </Text>
      <View style={styles.edit}>
        <Button title='Edit' color='#fff' onPress={() => {
          navigation.navigate('EditProfile')
       }} />
      </View>
      <View style={styles.logout}>
        <Button title='Logout' onPress={Logout} />
      </View>
      <Text style={styles.driver}></Text>
      <View  style={styles.list}>
        <Text>Name: {targetedUser.userName}</Text>
        <Text>Email : {targetedUser.email}</Text>
        <Text>Profile : {targetedUser.role} </Text>
      </View>

      <View style={styles.Share}>
        <Button title='Share Your localisation' color='#fff'
        onPress={{}} />
      </View>
      
    </View>
    
  )
}

const styles = StyleSheet.create({
    header:{
        width:415,
        height: 220,
        backgroundColor: '#0D6CFC',
        zIndex:1,
        borderBottomRightRadius:250,
        
    },

    img:{
      width:150,
      height:150,
      top:-70,
      left:130,
      borderRadius:75,
      zIndex:1,
    },

    edit:{
      backgroundColor:"#0D6CFC",
      width:100,
      borderRadius:50,
      top:-40,
      left:100,
      shadowColor:'black',
      shadowOpacity:0.25,
      shadowRadius:6,
      shadowOffset:{width: 1, height:2 },
      fontSize:32,
      elevation:5,
    },

    logout:{
      width:100,
      backgroundColor:"#fff",
      borderRadius:50,
      borderWidth:2,
      top:-77,
      left:210,
      shadowColor:'black',
      shadowOpacity:0.25,
      shadowRadius:6,
      shadowOffset:{width: 1, height:2 },
      fontSize:32,
      elevation:5,
      
    },
    username:{
      top:-55,
      left:160,
      fontSize:16,
      
    },

    driver:{
      top:-55,
      left:145,
      fontSize:22,
    },

    list:{
      left:100,
      top:-50,
    },

    Share:{
      backgroundColor:"#0D6CFC",
      width:300,
      borderRadius:50,
      
      left:60,
      shadowColor:'black',
      shadowOpacity:0.25,
      shadowRadius:6,
      shadowOffset:{width: 1, height:2 },
      fontSize:32,
      elevation:5,
    }

    
    
})