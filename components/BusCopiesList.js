import { StyleSheet, Text, View , FlatList , Button ,TouchableOpacity ,ImageBackground } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { getDriver, getDriverLoc, setTargetedBus , DistanceMatrix } from '../slices/locationReducer';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



const BusCopiesList = () => {
  const DRIVERS = useSelector((state)=>state.loc.DRIVERS);
  const dispatch = useDispatch();
  const targetedBus = useSelector((state)=>state.loc.targetedBus);
  const nearestStation = useSelector((state)=>state.loc.nearestStation);
 
 const tooSoon = ()=>{
  
        Alert.alert("","this Driver is currently out of service Please COME BACK LATER");
        dispatch(setTargetedBus({name:'lala'}));


 }
 
  console.log('--------------DRILVERS---------------',DRIVERS);
  return (
    <View>
      <FlatList data={DRIVERS} renderItem={itemData=>{
            return(
                <TouchableOpacity style={ [styles.grid, itemData.item.isMoving ? styles.moving : styles.notMoving]}
               
                onPress={()=> {
                    console.log(itemData.item);
                    
                    itemData.item.isMoving ?  dispatch(setTargetedBus(itemData.item)) : tooSoon()
                   
                }
                }>
           <View>
               <Text style={styles.title} >{itemData.item.userName} </Text>
           <Text style={styles.time}> 7 min</Text>
           <Ionicons style={styles.icons2} name="time-outline" size={30} color="#0D6CFC"></Ionicons>
           <Ionicons style={styles.icon1} name="person-circle-outline" size={60}></Ionicons>
           
            <Ionicons style={styles.icons} name="speedometer-outline" size={30} color="#fff"></Ionicons>
            {targetedBus.location && targetedBus.userId===itemData.item.userId && <Text style={styles.items}>Speed : {    Math.floor(itemData.item.location.speed)} m/s</Text>}
            {targetedBus.info && targetedBus.userId===itemData.item.userId && <Text style={styles.items}>duration :{targetedBus.info[0].duration.text} </Text>}
            {targetedBus.info && targetedBus.userId===itemData.item.userId && <Text style={styles.items}>distance :{targetedBus.info[0].distance.text} </Text>}
            </View>
            </TouchableOpacity>
            );
        }}/>
    </View>
  )
    }

const styles = StyleSheet.create({
    grid:{
        height:160,
        flex:1,
        margin:1,
        borderBottomColor:'purple',
        borderRadius:70,
        elevation:3,
        marginTop:15,
        overflow:'hidden'
    },title:{
        fontSize:18,
        color:'white',
        paddingLeft:15,
        height:30,
        paddingTop:5,
        fontWeight:'bold',
        left:90,
        top:20,
    },
    image:{
        height:'100%',
        width:'100%'
    },
    moving:{
        backgroundColor:'green'
    },
    notMoving:{
        backgroundColor:'red'
    },
    icon1:{
        top:-40,
        left:30,
    },
    icons :{
        left:120,
        top:-90,
        
    },
    items:{
        top:-124,
        margin:8,
        left:150,
    },
    time:{
        left:330,
        top:40,
        fontWeight:'bold',
        fontSize:16,
    },
    icons2:{
        top:13,
        left:300,
    }


})
export default BusCopiesList







