import { StyleSheet, Text, View , FlatList , Button,Platform} from 'react-native'
import React , { useState, useEffect ,useRef, memo } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useDispatch ,useSelector } from 'react-redux';
import { setUserLoc , setNearsetStation, getDriverLoc } from './slices/locationReducer';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import gglApiKey from './gglApiKey';
import AppNav from './navigation/AppNav';
import { setTargetedBus  } from './slices/locationReducer';



  
  const Map = () => {
    console.log("Map did render !!");
    const dispatch = useDispatch();
    const userLoc = useSelector((state)=>state.loc.userLoc);
    const nearestStation = useSelector((state)=>state.loc.nearestStation);
    const targetedBus = useSelector((state)=>state.loc.targetedBus);
    const STATIONS = useSelector((state)=>state.loc.STATIONS);
    const BusPath = useSelector((state)=>state.loc.BusPath);
    console.log('------------------BUS PATH---------------------',BusPath);

 const {name}= targetedBus;
    const routeRef = useRef();



    useEffect(()=>{
      if (!targetedBus || !targetedBus.isMoving) {
        return;
      }
      const interval = setInterval(()=>{  
        dispatch(getDriverLoc(targetedBus));
          console.log('moooooooooooooooooooooooooooore');
      },4000);
      return()=>clearInterval(interval);
    })


    
    useEffect(()=>{
       if (!nearestStation || !userLoc) {return ;}
       console.log(nearestStation);

       routeRef.current.fitToSuppliedMarkers(["User",'nearsetStation'],{
             edgePadding:{top:50,right:50,bottom:50,left:50}});

       }
    ,[nearestStation])

       useEffect(()=>{
        if (!targetedBus.location||!userLoc) {return ;}
        routeRef.current.fitToSuppliedMarkers(["User",'Bus'],{
              edgePadding:{top:50,right:50,bottom:50,left:50}});
              
        }
        ,[name])
    
  
    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
      try {
        let loco = await Location.getCurrentPositionAsync();
        dispatch(setUserLoc({latitude:loco.coords.latitude,longitude:loco.coords.longitude}));
      } catch (error) {
        Alert.alert("coudnt fetch user location please try again");
        return;
      }
    })();
  }, []);
     
  return (
    <View>
        {
        !userLoc.longitude? <ActivityIndicator size={"large"} color={"red"}/>:
        <MapView 
        ref={routeRef}
        initialRegion={{
        latitude: userLoc.latitude,
        longitude: userLoc.longitude,
        latitudeDelta: 0.00522,
        longitudeDelta: 0.00521,}} style={STATIONS?styles.map:{...styles.map,flex:0}} >

        {userLoc && nearestStation && (
         <MapViewDirections
          origin={userLoc}
          destination={{latitude:nearestStation.latitude,longitude:nearestStation.longitude}}
          strokeWidth={3}
          strokeColor={"hotpink"}
          apikey={gglApiKey}
         />
        )}
        {BusPath && (
         <MapViewDirections
          origin={BusPath.origin}
          destination={BusPath.destination}
          strokeWidth={3}
          strokeColor={"blue"}
          apikey={gglApiKey}
         />
        )}

        
       {targetedBus.isMoving &&  <Marker
          coordinate={targetedBus.location}
          identifier={"Bus"}

        />}
           

   


        {userLoc?.longitude && <Marker 
        coordinate={
        {latitude: userLoc.latitude,
        longitude: userLoc.longitude,
        }}
        title={"U R HERE!"}
        identifier={"User"}
        description={"this is your actuel loc.made by the one and only Mohamed Darkaoui"}
        />}
         {nearestStation && <Marker  
        coordinate={
        {latitude: nearestStation.latitude,
        longitude: nearestStation.longitude,
        }}
        title={'Station'}
        identifier={"nearsetStation"}
        description={nearestStation.name}
        />}

        </MapView>
        }
      {userLoc.longitude && <View style={styles.list}>
          <AppNav  />
      </View>}
    </View>
  )
    }

const styles = StyleSheet.create({
    map: {
        flex:1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height-120,
      },
    list:{
      flex:1
    }
})
export default Map;