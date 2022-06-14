import { StyleSheet, Text, View , FlatList , Button,Platform} from 'react-native';
import React , { useState, useEffect ,useRef, memo } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useDispatch ,useSelector } from 'react-redux';
import { setUserLoc , setNearsetStation, getDriverLoc, DistanceMatrix } from './slices/locationReducer';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import gglApiKey from './gglApiKey';
import AppNav from './navigation/AppNav';
import { setTargetedBus  } from './slices/locationReducer';
import { useNavigation } from '@react-navigation/native';
import MarkersList from './components/MarkersList';




  
  const Map = () => {
    console.log("Map did render !!");
    const dispatch = useDispatch();
    const userLoc = useSelector((state)=>state.loc.userLoc);
    const nearestStation = useSelector((state)=>state.loc.nearestStation);
    const targetedBus = useSelector((state)=>state.loc.targetedBus);
    const STATIONS = useSelector((state)=>state.loc.STATIONS);
    const WAYPOINTS = useSelector((state)=>state.loc.WAYPOINTS);
    const BusPath = useSelector((state)=>state.loc.BusPath);
    //const [listLOL,setListLOL]= useState([]);
    console.log('------------------BUS PATH---------------------',BusPath);
    const navigation = useNavigation();

 const {name}= targetedBus;
    const routeRef = useRef();



    useEffect(()=>{
      if (!targetedBus || !targetedBus.isMoving || !targetedBus.location ) {
        return;
      }
      const interval = setInterval(()=>{
        if (!targetedBus || !targetedBus.isMoving || !targetedBus.location ) {
          return;
        }
        dispatch(getDriverLoc(targetedBus));
        dispatch(DistanceMatrix({origin:targetedBus,destination:nearestStation}))
          console.log('moooooooooooooooooooooooooooore');
      },4000);
      return()=>clearInterval(interval);
    })



    
    useEffect( ()=>{
       if (!nearestStation || !userLoc) {return ;}


     if (Platform.OS=='android') {
       routeRef.current.fitToCoordinates([
         userLoc,
         {
           latitude: nearestStation.latitude,
           longitude: nearestStation.longitude,
         },
       ],{edgePadding:{top:50,right:50,bottom:50,left:50},animated:true})
     }else{
          routeRef.current.fitToSuppliedMarkers(["User",'nearsetStation'],{
            edgePadding:{top:50,right:50,bottom:50,left:50},animated:true});
     }

       }
    ,[nearestStation])

       useEffect(()=>{
        if (!targetedBus.location||!userLoc) {return ;}
        routeRef.current.fitToCoordinates([targetedBus.location,userLoc],{
              edgePadding:{top:50,right:50,bottom:50,left:50},            
            });
              
        }
        ,[name])
    
  
    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('-----------------status',status)
        if (status !== 'granted') {
          Alert.alert('','Permission to access location was denied');
          navigation.replace('SplashScreen');
          return;
        }
      try {
        let loco = await Location.getCurrentPositionAsync();
        dispatch(setUserLoc({latitude:loco.coords.latitude,longitude:loco.coords.longitude}));
      } catch (error) {
        Alert.alert('',"GPS FEATCHERS R Highly important for our app functionality Please activate it");
        navigation.replace('SplashScreen');
        return;
      }
    })();
  }, []);
     
  return (
    <View style={{alignItems:'center'}} ><View>{
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
          lineDashPattern={[1,10]}
          origin={userLoc}
          destination={{latitude:nearestStation.latitude,longitude:nearestStation.longitude}}
          strokeWidth={3}
          strokeColor={"black"}
          apikey={gglApiKey}
         />
        )}
        {BusPath && (
         <MapViewDirections
          waypoints={WAYPOINTS.slice(0,20)}
          optimizeWaypoints={true}
          origin={BusPath.origin}
          destination={BusPath.destination}
          strokeWidth={3}
          strokeColor={"blue"}
          apikey={gglApiKey}
         />
        )}

        
       {targetedBus.isMoving &&  <Marker
          coordinate={targetedBus.location}
          identifier='Bus'

        />}
          {BusPath &&  <MarkersList list={WAYPOINTS} />}

          

        {userLoc?.longitude && <Marker 
        coordinate={
        {latitude: userLoc.latitude,
        longitude: userLoc.longitude,
        }}
        title={"U R HERE!"}
        identifier='User'
        description={"this is your actuel loc.made by the one and only Mohamed Darkaoui"}
        />}
         {nearestStation && <Marker  
        coordinate={
        {latitude: nearestStation.latitude,
        longitude: nearestStation.longitude,
        }}
        title={'Station'}
        identifier='nearsetStation'
        description={nearestStation.name}
        />}

        </MapView>
        }
     
      <View style={styles.list}>
          {userLoc.latitude && <AppNav  />}
      </View>
      </View></View>
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
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
})
export default Map;