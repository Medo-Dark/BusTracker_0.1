import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native'
import React, { useState , useEffect } from 'react'
import { userSelector , clearState, loginUser , fetchUserByuserId } from '../../slices/userSlice';
import { useDispatch ,useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';





const logo = require('../../assets/logo.png')

const Login = props =>{
    const dispatch = useDispatch();
    const { isFetching, isSuccess, isError, errorMessage,gotUser } = useSelector(userSelector);
    const userId = useSelector((state)=>state.user.userId);
    const targetedUser = useSelector ((state)=>state.user.targetedUser);
    console.log('--------------------------------------',userId);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        return () => {
          dispatch(clearState());
        };
      }, []);
    
      useEffect(() => {
        if (isSuccess) {
          console.log('---------------------Success--------------------------')
          if (userId) {
            dispatch(fetchUserByuserId(userId));
          }
            dispatch(clearState());
        }
    
        if (isError) {
          Alert.alert('Error!!!',errorMessage);
          dispatch(clearState());
        }
      }, [isSuccess, isError]);

      useEffect(()=>{
        if (targetedUser) {
          props.navigation.replace(targetedUser.role);
        }
      },[gotUser]);



    
    const Login = async (data) => {
        console.log("onsubmit data",data)
       dispatch(loginUser( await data));
    };

    
    
        
    return (
        <View style={styles.back}>
            
          <View style={styles.img}>
              <Image source={logo}/>  
          </View>
          <View style={styles.text}>
              <Text style={styles.title}>BUS</Text>
              <Text style={styles.title}>Tarcker</Text> 
          </View>
          <View style={styles.head}>
                <Text style = {styles.titre}>Login</Text>
                <Text style={styles.tot}>      To your Account</Text>
          </View>
          
          <View style={styles.items}>
                  <TextInput 
                  placeholder='Email'
                  style={styles.Input}
                  onChangeText={(email) => setEmail(email)}
                  />
    
                  <TextInput 
                  style={styles.Input}
                  placeholder='Password'
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  />
          </View>
    
          <View style={styles.btn}>
                  <Text
                    style={{color:'#ffff'}}
                        title="Register"
                        onPress={() => { props.navigation.navigate('Forgot')}} >
                        Did u fogot ur Password? Click here.
                  </Text>
            </View>
    
            <View style={styles.signin} >
                <Button onPress={()=>{
                    if (!email||!password) {
                        Alert.alert('Message','Make Sure that neither of text fields left empthy')
                        return;
                    }
                    Login({email,password})}}
                color={'#0D6CFC'}
                  title="Sign In"/>
            </View>
    
            <View style={styles.footer}>
                <Text style={styles.footertxt}
                    onPress={() => props.navigation.navigate("Register")}>
                    Don't have an account? SignUp.
                </Text>
            </View>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        back:{
            width:415,
            height:898,
            backgroundColor:'#0D6CFC',
        },
        img:{
            top:200,
            left:90,
        },
        text:{
            top:110,
            left:195,
        },
        title:{
            fontSize: 40,
            margin:0,
            color:'#ffff',
            fontWeight:'bold',
        },
    
        Input:{
            borderWidth:2,
            borderColor:'#FFFF',
            width:300,
            height:45,
            borderRadius:50,
            margin:10,
            right:22,
            padding:9,
            backgroundColor:'#FFFF'
        },
        items:{
            top:150,
            left:70,
        },
        head:{
            top:150,
            left:160,
        },
        titre:{
            color:'#ffff',
            fontSize:36,
            fontWeight:'bold',
        },
        tot:{
            right:40,
            color:'#ffff',
            fontSize:16,
            marginTop:8,
            marginBottom:0,
        },
        btn:{
            top:145,
            left:60,
        },
        signin:{
            left:85,
            margin:8,
            backgroundColor:'#ffff',
            width:220,
            top:180,
            borderRadius:50,
            shadowColor:'black',
            shadowOpacity:0.25,
            shadowRadius:6,
            shadowOffset:{width: 1, height:2 },
            fontSize:32,
            elevation:5,
        },
        footer:{
            top:250,
            left:100,
        },
        footertxt:{
            color:'#ffff',
    
        }
    })

export default Login;