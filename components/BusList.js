import { StyleSheet, Text, View , FlatList , Button ,TouchableOpacity ,ImageBackground } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { getDriver, getDriverLoc, setTargetedBus ,setDrivers, setBusPath } from '../slices/locationReducer';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';








const BusList = props => {


  const BUS = useSelector((state)=>state.loc.BUS);
  const dispatch = useDispatch();
  const targetedBus = useSelector((state)=>state.loc.targetedBus);
  
  

  return (
    <View style={styles.form} >
    <Text style={styles.title}> Bus </Text>
      <FlatList data={BUS} renderItem={itemData=>{
            return(
                <TouchableOpacity style={ [styles.grid,{backgroundColor:'grey'} ]}
               
                onPress={()=> {
                    console.log('--------------------path----------------',itemData.item.path);
                    dispatch(setBusPath({path:itemData.item.path,id:itemData.item.id}));
                    dispatch(setDrivers(null));
                       itemData.item.driverIds.forEach(element => {
                       dispatch(getDriver(element));
                    });
                    props.navigation.navigate('Copies')
                
                }
                }>
           <View>
              <Text style={styles.titre} >{itemData.item.name} </Text>
             <Ionicons style = {styles.icon} name="bus-outline" size={50} color="#0D6CFC"></Ionicons>

            
            </View>
            </TouchableOpacity>
            
            );
        }}  />
    </View>
  )
    }

const styles = StyleSheet.create({
    grid:{
        height:80,
        flex:1,
        margin:1,
        backgroundColor:'#ECE9E6',
        borderRadius:50,
        elevation:3,
        marginTop:20,
        overflow:'hidden'
    },   title:{
        top:15,
        left:175,
        fontSize:24,
        fontWeight:'bold',
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
    
      titre:{
        left:80,
        top:15,
        fontSize:20,
        fontWeight:'bold',
      },
      icon:{
        top:-10,
        left:20,
    },
    btn1:{
      zIndex:1,
      top:-65,
      left:340,

   }


})
export default BusList







