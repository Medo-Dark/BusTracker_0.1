import { StyleSheet, Text, View ,ActivityIndicator,Image } from 'react-native';
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
const image = require('../assets/bus.jpg')


    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('UserData');
          if(value !== null) {
            const UserData = JSON.parse(value);
            const {userId} = UserData;
            if (userId == null ) {
              console.log('in in')
              navigation.replace('Login');
                return;
            }
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
      const myTimeout = setTimeout(()=>{
        if (targetedUser) {
          navigation.replace(targetedUser.role)
        }
        }, 5000);
      return()=>{
        clearTimeout(myTimeout)
      }
    },[isFetching]);
  return (
    <View>
      
      <View style = {styles.header}></View>
            <View style = {styles.header1}></View>
            <View style={styles.img}>
                <Image source = {image}/>
            </View>
            <View style = {styles.footer}></View>
            <View style = {styles.text}>
                <Text style = {styles.objet}>Our Objectif is to help you</Text>
            </View>
            <View style = {styles.title}>
                <Text style = {styles.ob}>A bus is always near to You!</Text>
            </View>
            <View style = {styles.stuf}>
                <Text  style = {styles.ab} >Find your bus now</Text>
            </View>
      <ActivityIndicator size={'large'} color={'red'} />

            
    </View>

  )
}

export default SplashScreen

const styles = StyleSheet.create({
  header:{
    width:220,
    borderRadius:200,
    top:-40,
    right:130,
    height: 220,
    paddingTop: 36,
    backgroundColor: '#0D6CFC',
    zIndex:1,
    
},
 
img:{
    top:-220,
    right:50,
},

header1: {
    width:220,
    borderRadius:200,
    top:-310,
    height: 220,
    right:40,
    paddingTop: 36,
    backgroundColor: '#0DA8FF',
   
    
},

footer: {
    width:900,
    borderRadius:900,
    height: 900,
    right: 237,
    top:-200,
    //paddingTop: 36,
    backgroundColor: '#0D6CFC',
    justifyContent:'center',
    alignItems:'center',
    zIndex:1,
    
},

getstart:{
    top:-990,
    zIndex:2,
    left:100,
    color: '#ffff',
    backgroundColor: '#ffff',
    borderRadius: 50,
    width:'50%',
    shadowColor:'black',
    shadowOpacity:0.25,
    shadowRadius:6,
    shadowOffset:{width: 1, height:2 },
    fontSize:32,
    elevation:5,
    margin:8,
    
    
},


text:{
    top:-990,
    justifyContent:'center',
    alignItems: 'center',
    zIndex:3,
    color:'#fff',
    fontFamily:'bold'
},

title:{
    top:-1600,
    left:50,
    justifyContent:'center',
    alignItems: 'center',
    fontFamily:'bold',
},

stuf: {
    top:-1600,
    left:85, 
    
},

objet:{
    fontSize:16,
    color:'#ffff',
    // fontFamily: "inter",
},

ob:{
    fontSize:20,
    fontWeight: "bold",
    
},

ab:{
    fontSize:20,
    color:'#0D6CFC',
    fontWeight: "bold",
},


    
    

})