import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { setUserLoc } from '../../../slices/locationReducer';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { updateUserLoc } from '../../../slices/locationReducer';

const Map = () => {
  const dispatch = useDispatch();
  const [prevLoc,setPrevloc] = useState(null);
  const userLoc = useSelector((state)=>state.loc.userLoc);
console.log('--------------------------Userloc',userLoc);
  const [send,setSend]=useState(false);
  const targetedUser = useSelector((state=>state.user.targetedUser));
  //const [move ,setMove]= useState(0.1);



  const GetUserLoc = async()=>{
    try {
      let loco = await Location.getCurrentPositionAsync();
      console.log(loco);
      dispatch(setUserLoc(loco.coords));
    } catch (error) {
      Alert.alert("coudnt fetch user location please try again");
      return;
    }
  }


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
    GetUserLoc();
  })();
}, []);

useEffect(()=>{
  const interval = setInterval(()=>{
    setPrevloc(userLoc);
    GetUserLoc();
      console.log('moooooooooooooooooooooooooooore');
    setSend(true);
  },4000);
  return()=>clearInterval(interval)
})

useEffect(()=>{
  console.log('its in',prevLoc);
  
  if (send) {
  if (prevLoc &&  Math.abs(prevLoc.latitude-userLoc.latitude)>0.00000001 || Math.abs( prevLoc.longitude-userLoc.longitude)>0.00000001 ) {
      console.log('it did change');  
      dispatch(updateUserLoc({targetedUser,userLoc}));
      setSend(false);
     // setMove((move)=>move+0.1)
  }
  }
},[userLoc])


  return (
    <View>
      <Text>Map</Text>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})