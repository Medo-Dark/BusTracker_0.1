import { StyleSheet, Text, View ,ActivityIndicator  } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUserByuserId, userSelector } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearState } from '../slices/userSlice';





const SplashScreen = props => {
const navigation = useNavigation();
const dispatch = useDispatch();
const targetedUser = useSelector((state)=>state.user.targetedUser);
const { isFetching } = useSelector(userSelector);


    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('UserData');
          if(value !== null) {
            const UserData = JSON.parse(value);
            const {userId} = UserData;
            //const expiryDate = new Date(expirationDate);
            if (userId == null ) {
              console.log('in in')
              navigation.replace('Login');
                return;
            }
            Alert.alert('u in');
            dispatch(fetchUserByuserId(userId));
            


          }else{
            console.log('Loginnnn')
              navigation.replace('Login');
              return;
          }
        } catch(e) {
          Alert.alert('Error acured while tryin to get Stored Data');
          navigation.replace('Login');
        }
      }
   
    useEffect (()=>{
      console.log('in useEffect')
      getData();

    },[])
    useEffect(()=>{
      if (targetedUser) {
        navigation.replace(targetedUser.role);
      }
    },[isFetching]);
  return (
    <View>
      <ActivityIndicator size={'large'} color={'red'} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})