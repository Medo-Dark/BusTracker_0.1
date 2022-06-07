import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState , useEffect } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { signupUser, userSelector , clearState ,CreateUser, backToOldDays } from '../../slices/userSlice';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';
 
const Register = props => {
    const dispatch = useDispatch();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);
    const userId = useSelector((state)=>state.user.userId);
    console.log(userId);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userName, setUsername] = useState('');
    
    useEffect(() => {
        return () => {
          dispatch(clearState());
        };
      }, []);
    
      useEffect(() => {
        if (isSuccess) {
          console.log('---------------------Success--------------------------')
          if (userId) {
            dispatch(CreateUser({userId,userName,email}));
            dispatch(backToOldDays());
            props.navigation.replace('Login');

          }
          dispatch(clearState());
        }
    
        if (isError) {
          Alert.alert('Error!!!',errorMessage);
          dispatch(clearState());
        }
      }, [isSuccess, isError]);



      const signUp =  (data) => {
       console.log("onsubmit data",data)
       dispatch(signupUser(data));
      };
            
        return (
            <View style={styles.screen}>
                <View style={styles.image}>
                </View>
                <View style={styles.logo}>
                <Text style = {styles.logotitle} >BUS </Text>
                <Text style = {styles.logotitle}>Tarcker </Text>
              </View>
                <View style = {styles.header}>
                <View style={styles.bar}></View>

                <TextInput
                    style={styles.Input}
                    placeholder="Username"
                    value={userName}
                    keyboardType="twitter"
                    onChangeText={(userName) => setUsername(userName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
                />
              <TextInput
              placeholder='Full name'
              style= {styles.Input}
              onChangeText={(name) => setName(name)}/>
              
              <TextInput
              placeholder='Email'
              style= {styles.Input}
              onChangeText={(email) => setEmail(email)}/>

              <TextInput
              placeholder='Password'
              style= {styles.Input}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}/>

             <TextInput
              placeholder='Confirm Password'
              style= {styles.Input}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}/>

{/*-----------------------------------A Button is in here  ---------------------------------------------------------*/}
              <View style={styles.btn}>
           { isFetching ? <ActivityIndicator size={"large"} color={"red"}/> :<Button onPress = { ()=> {
              // Login({userName,email,password})
                signUp({email,password})
               }} title="Sign Up"/>}

              </View>
              <Text style={styles.slogo}>Create your Account now to enjoy  </Text>
              <Text style={styles.slogo1}>Our amazing services</Text>
            
            
           </View>
           <View style = {styles.header1}>
             <Text style={styles.title}>Create Account</Text>
           </View>

           <View style={styles.fot} >
                <Text
                    onPress={() => props.navigation.replace("Login")} >
                    Already have an account? SignIn.
                </Text>
            </View>

            </View>
            
            
            
          )
    
  
}



const styles = StyleSheet.create({

    screen:{
        flex:1,
    },

    image:{
        top:100,
        left:80,
    },

    header:{
        width:414,
        borderRadius:50, 
        top:100,
        left:0,
        height: 630,
        paddingTop: 36,
        backgroundColor: '#0D6CFC',
        zIndex:1,
        
    },

    header1: {
        width:414,
        borderRadius:200,
        top:-600,
        height: 220,
        left:0,
        paddingTop: 36,
        backgroundColor: '#0DA8FF',
        zIndex:0,
        
    },

    logo:{
        top:0,
        left:170
    },
    logotitle:{
        fontSize: 40,
        margin:0,
        color:'#0D6CFC'
        
    },

    title:{
        color:'#fff',
        fontSize:24,
        left:120,
        top:-15,
        
    },
    Input:{
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
    btn:{
        width:220,
        height:40,
        backgroundColor:'#ffff',
        borderRadius: 50,
        left:95,
        top:30,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:6,
        shadowOffset:{width: 1, height:2 },
        fontSize:32,
        elevation:5,

    },
    slogo:{
        color:'#ffff',
        left:90,
        top:80,
        fontSize:16,
    },
    slogo1:{
        color:'#ffff',
        left:130,
        top:80,
        fontSize:16,
    },
    fot:{
        top:50,
    }
})


export default Register;