import { StyleSheet, Text, View , FlatList , Button ,TouchableOpacity ,ImageBackground,Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDistance } from 'geolib';
import { useDispatch ,useSelector } from 'react-redux';
import { getStations, setNearsetStation ,setDistanceBetween, sortBydistance, isSmthing, getStationBuses ,clearState } from '../slices/locationReducer';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';



const StationsList = props => {

    const [visible,setVisibility]=useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const userLoc = useSelector((state)=>state.loc.userLoc);
    const nearestStation = useSelector((state)=>state.loc.nearestStation);
    const STATIONS = useSelector((state)=>state.loc.STATIONS);
    const {isError,isSuccess,isFetching , errorMessage}= useSelector(isSmthing);

    // useEffect(()=>{
    //     if (userLoc) {
    //         dispatch(getStations());    
    //     };
    // },[])
    useEffect(() => {
        if (isSuccess) {
          sortList(userLoc);
          console.log('-------------------------sorted------------------------------------------------------');
          dispatch(clearState());
        }
        if (isError) {
          Alert.alert('Error!!!',errorMessage);
          dispatch(clearState());
        }
      }, [isSuccess, isError]);

    const sortList = userLoc =>{
        console.log('sortList in')

            for (const index in STATIONS) {               
                dispatch(setDistanceBetween(
                    {distance:getDistance(
                    {latitude: userLoc.latitude, longitude: userLoc.longitude},
                    {latitude: STATIONS[index].latitude, longitude: STATIONS[index].longitude}),index:index}
                ));
            }
            console.log('sortList after for')
            dispatch(sortBydistance())
            console.log('after sort')
            setVisibility(true);
        }
    

  return (
    <View>
        {!visible&&<Button title={"get Nearest stations"} onPress={async ()=>{
            dispatch( getStations());
            }} />}
        {visible && isFetching ? <ActivityIndicator size={'large'} color={'red'} /> : <FlatList data={STATIONS} renderItem={itemData=>{
            return(
                <TouchableOpacity style={styles.grid}
                onPress={()=> {
                    dispatch(setNearsetStation(itemData.item));
          
                }
                }>
           <View>
                <ImageBackground source = {{uri: itemData.item.imageUrl}} style={styles.image} > 
        <Text style={styles.title} >{itemData.item.name} /Distance Between : {itemData.item.distanceBetween}m </Text>
        {nearestStation && nearestStation.id == itemData.item.id &&<View style={{backgroundColor:"grey"}}><Button title={"get Bus Related"} onPress={()=>{
            console.log(itemData.item.id);
            dispatch(getStationBuses(itemData.item.id));
            navigation.navigate('Bus')

        }} /></View>}

                 </ImageBackground> 
            </View>
            </TouchableOpacity>
            
            );
        }}  />}
    </View>
  )
}

export default StationsList;

const styles = StyleSheet.create({
    grid:{
        height:250,
        flex:1,
        margin:1,
        borderBottomColor:'purple',
        borderRadius:10,
        elevation:3,
        marginTop:15,
        overflow:'hidden'
    },title:{
        fontSize:14,
        color:'white',
        paddingLeft:15,
        backgroundColor:"rgba(0,0,0,0.5)",
        height:30,
        paddingTop:5
    },
    image:{
        height:'100%',
        width:'100%'
    },
    
    
})




