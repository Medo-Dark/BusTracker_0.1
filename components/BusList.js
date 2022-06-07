import { StyleSheet, Text, View , FlatList , Button ,TouchableOpacity ,ImageBackground } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { getDriver, getDriverLoc, setTargetedBus ,setDrivers, setBusPath } from '../slices/locationReducer';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';







const BusList = props => {


  const BUS = useSelector((state)=>state.loc.BUS);
  const dispatch = useDispatch();
  const targetedBus = useSelector((state)=>state.loc.targetedBus);

  

  return (
    <View>
      <FlatList data={BUS} renderItem={itemData=>{
            return(
                <TouchableOpacity style={ [styles.grid,{backgroundColor:'grey'} ]}
               
                onPress={()=> {
                    console.log('--------------------path----------------',itemData.item.path);
                    dispatch(setBusPath(itemData.item.path));
                    dispatch(setDrivers(null));
                    // dispatch(setTargetedBus({...targetedBus,...itemData.item}));
                    itemData.item.driverIds.forEach(element => {
                        dispatch(getDriver(element));
                    });
                    props.navigation.navigate('Copies')
                
                }
                }>
           <View>
               {/* <ImageBackground source = {{uri: itemData.item.imageUrl}} style={styles.image} >  */}
        <Text style={styles.title} >{itemData.item.name} </Text>

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
export default BusList







