import { StyleSheet, Text, View ,Dimensions ,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { setUserLoc } from '../../../slices/locationReducer';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { updateUserLoc } from '../../../slices/locationReducer';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';




const Map = props => {
  const dispatch = useDispatch();
  const [prevLoc,setPrevloc] = useState(null);
  const userLoc = useSelector((state)=>state.loc.userLoc);
console.log('--------------------------Userloc',userLoc);
  const [send,setSend]=useState(false);
  const targetedUser = useSelector((state=>state.user.targetedUser));




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

  const ShareLoc=()=>{
  setSend((send)=>!send);
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
  if (!send) {
    return;
  }
  const interval = setInterval(()=>{
    setPrevloc(userLoc);
    GetUserLoc();
    console.log('moooooooooooooooooooooooooooore');
  },4000);
  return()=>clearInterval(interval)
})

useEffect(()=>{
  console.log('its in',prevLoc);
  
  if (send) {
  if (prevLoc &&  (Math.abs(prevLoc.latitude-userLoc.latitude)>0.00000001 || Math.abs( prevLoc.longitude-userLoc.longitude)>0.00000001) ) {
      console.log('it did change');  
      dispatch(updateUserLoc({targetedUser,userLoc}));
      setSend(false);
  }
  }
},[userLoc])
    
  return (
    
    <View style={styles.map}>
    <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.map}       
    initialRegion={{          
      latitude: 35.7595,          
      longitude: -5.8340,          
      latitudeDelta: 0.0922,          
      longitudeDelta: 0.0421        
    }}        
    showsUserLocation={true}
    />
    <TouchableOpacity style={styles.bar}
    onPress={ShareLoc}>
    <Text  style={{...styles.txt,color:send?'#0D6CFC':'#000'}} >  {!send?'Share your Location!':'Stop Sharing!!'}</Text>
    <Ionicons style={styles.icon} name="toggle" size={30} color={send?'#0D6CFC':'#000'} />
    
    </TouchableOpacity>
    </View>



    
    
  )
}

const styles = StyleSheet.create({
  map:{
  flex:0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bar:{
        height:60,
        backgroundColor:'#FFFF',
        top:-200,
        borderRadius:50,
        width:300,
        left:60,
        
        
  },
  txt:{
    fontWeight:'bold',
    color:'#0D6CFC',
    top:20,
    left:20,
  },

  icon:{
    left:230,
    top:-5,
  }
  
})

export default Map;