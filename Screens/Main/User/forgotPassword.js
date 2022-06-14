import { StyleSheet, Text, View , Image ,TextInput, Alert } from 'react-native'
import React , {useState} from 'react';
import { Button } from 'react-native';
import { clearState, resetPassword ,userSelector} from '../../../slices/userSlice';
import { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';



//const logo = require('../../../assets/bus.jpg');

export default function ForgetPassword() {

    const { isSuccess, isError, errorMessage } = useSelector(userSelector);    
    const [email, setEmail] = useState('');
    const [SucMessage, setMessage] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
          dispatch(clearState());
        };
      }, []);

      useEffect(() => {
        if (isSuccess) {
          console.log('---------------------Success--------------------------');
          dispatch(clearState());
          setMessage('Check ur Email to get the reset password Link')
        }
        if (isError) {
          Alert.alert('Error!!!',errorMessage);
          dispatch(clearState());
          setMessage('');
        }
      }, [isSuccess, isError]);

  return (

    <View style={{flex:1}}>
        <StatusBar/>
    <View style={styles.head}>
      <Text style={styles.logo}>BUS</Text>
      <Text style={styles.logo}>Tarcker</Text>
      <View style={styles.titre}>
         <Text style={styles.hop}>Get Back your Account Password</Text>
      </View>
      </View>
      <TextInput style={styles.Input}
        placeholder='Enter ur email'
        value={email}
        onChangeText={(email) => setEmail(email)}
        />
    <Button title='Reset Password' onPress={()=>{
        if (!email) {
            Alert.alert('InVALID','Make sure to enter a Valid Email')
            return;
        }
        dispatch(resetPassword(email));
        setEmail('');
    }} />
    <Text style={styles.hop}>{SucMessage}</Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
    head:{
        width:415,
        height:250,
        backgroundColor:'#0D6CFC',
    },
    logo:{
        top:10,
        fontSize: 40,
        margin:0,
        color:'#ffff',
        left:195,
        
    }, Input:{
        borderWidth:2,
        borderColor:'#0D6CFC',
        backgroundColor:'#fff',
        width:350,
        height:55,
        borderRadius:50,
        margin:10,
        left:22,
        padding:10,
        
    },
    titre:{
        
    },
    hop:{
        fontSize:22,
        left:35,
        fontWeight:'bold',
    },

    
})