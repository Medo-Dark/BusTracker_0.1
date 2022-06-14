import { StyleSheet, Text, View, ScollView, SafeAreaView, Image, FlatList, Button } from 'react-native'
import React , {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backToOldDays } from '../../../slices/userSlice';

//import { setDriverLoc } from '../../../redux/reducers/locationReducer'
//import {setLocalisation} from './Map';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import EditProfile from './EditProfile';



export default function Profile({navigation}) {
   const [isVisble,setIsVisble] = useState(false);
   const disptach = useDispatch();
   const userId = useSelector((state)=>state.user.userId);
   const targetedUser = useSelector((state)=>state.user.targetedUser);
   console.log(userId);
   console.log('------------------------in Driver--------------------------------',targetedUser);

   const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('UserData');
    } catch(e) {
      Alert.alert("Error accured while Loggin out");
    }
  
    console.log('Done.')
  }

    const Logout = () =>{
        removeValue();
        disptach(backToOldDays());
        navigation.replace('Login');
    }

  
  return (
    <View style={styles.back}>
    {isVisble&&
      <EditProfile goBack={()=>{
        setIsVisble(false);
       }} />
    }
    {!isVisble &&<View style={{top:200,position:'relative'}}>
      <Ionicons style={styles.icon} name="person-circle-outline" size={200} color="#000" />
      <Text style={styles.username}>{targetedUser.userName}</Text>
      <Text style={styles.details}> User Details </Text>
      <Text style={styles.detailsitems}> Email : {targetedUser.email} </Text>
      <Text style={styles.detailsitems}> Role :{targetedUser.role} </Text>
      <View style={styles.btn}>
        <Button  title='Edit Profile' onPress={()=>{setIsVisble(true)}} />
      </View>
      <View style={{...styles.btn,top:-30}}>
        <Button  title='Log out' onPress={Logout} />
      </View>
      
    </View>}
    </View>
    
  )
}

const styles = StyleSheet.create({
  back:{
    backgroundColor:'#ECE9E6',
    width:415,
    height:700,
    borderRadius:50,
    position:'relative'
},
icon:{
    top:-110,
    left:100,
},
username:{
    top:-120,
    left:140,
    fontSize:24,
    fontWeight:'bold',
},
details:{
    top:-70,
    fontSize:24,
    fontWeight:'bold',
    color:'#0D6CFC',
    left:30,
},
detailsitems:{
    fontSize:20,
    fontWeight:'bold',
    left:60,
    margin:9,
    top:-40,
},
btn:{
    top:80,
    left:90,
    margin:8,
    backgroundColor:'#0D6CFC',
    width:220,
    borderRadius:50,
    shadowColor:'black',
    shadowOpacity:0.25,
    shadowRadius:6,
    shadowOffset:{width: 1, height:2 },
    fontSize:32,
    elevation:5,
}
    

    
    
})