import { StyleSheet, Text, View , FlatList , Button ,TouchableOpacity ,ImageBackground } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { getDriver, getDriverLoc, setTargetedBus  } from '../slices/locationReducer';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';




const BusCopiesList = () => {
  const DRIVERS = useSelector((state)=>state.loc.DRIVERS);
  const dispatch = useDispatch();
  const targetedBus = useSelector((state)=>state.loc.targetedBus);
  

  return (
    <View>
      <FlatList data={DRIVERS} renderItem={itemData=>{
            return(
                <TouchableOpacity style={ [styles.grid, itemData.item.isMoving ? styles.moving : styles.notMoving]}
               
                onPress={()=> {
                    console.log(itemData.item);
                   
                    itemData.item.isMoving ?  dispatch(setTargetedBus(itemData.item)) : Alert.alert("","this Driver is currently out of service Please COME BACK LATER");
                }
                }>
           <View>
               {/* <ImageBackground source = {{uri: itemData.item.imageUrl}} style={styles.image} >  */}
        <Text style={styles.title} >{itemData.item.userName} </Text>

                 {/* </ImageBackground>  */}
            </View>
            </TouchableOpacity>
            
            );
        }}  />
    </View>
  )
    }

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
    moving:{
        backgroundColor:'green'
    },
    notMoving:{
        backgroundColor:'red'
    }


})
export default BusCopiesList







