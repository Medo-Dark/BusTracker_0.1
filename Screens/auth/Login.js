import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native'
import React, { useState , useEffect } from 'react'
import { userSelector , clearState, loginUser , fetchUserByuserId } from '../../slices/userSlice';
import { useDispatch ,useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';






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
            <View style = {styles.container} >
                <View style={styles.image}>
 
                </View>

              <View style={styles.logo}>
                
                <Text style = {styles.logotitle} >BUS </Text>
                <Text style = {styles.logotitle}>Tarcker </Text>
              </View>
                
              <View style={styles.head}>
                <Text style = {styles.titre}>Login</Text>
              </View>
              <View style={styles.items}>
              <TextInput 
              placeholder='Email'
              style={styles.Input}
              onChangeText={(email) => setEmail(email)}/>

              <TextInput 
              style={styles.Input}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}/>
              </View>
              
              <View style={styles.btn}>
              <Text
                style={{color:'#0D6CFC'}}
                    title="Register"
                    onPress={() => props.navigation.replace("ForgetPassword")} >
                    Forget your password!.
                </Text>
            </View>
            <View style={styles.signin} >
            {isFetching? <ActivityIndicator size={"large"} color={"#0D6CFC"}/> : <Button 
            onPress={()=>Login({email,password})}
            color={'#fff'}
              title="Sign In"/>}
            
            </View>
            <View style={styles.bar}></View>
            
            <View style={styles.register} >
                <Text
                style={styles.fot}
                    title="Register"
                    onPress={() => props.navigation.replace("Register")} >
                    Don't have an account? SignUp.
                </Text>
            </View>
            
            </View>
          )
    
  
}



const styles = StyleSheet.create({
    container:{
        left:70,
        top:300,
    },
    image:{
        top:-100,
        left:25,
    },

    titre:{
        fontSize: 40,
        left:75,
        margin:12,
        //fontFamily:'bold'   
    },
    logo:{
        top:-200,
        left:120,
    },
    logotitle:{
        
        fontSize: 40,
        margin:0,
        color:'#0D6CFC'
    },

    head:{
        top:-180,
    },

    fot:{
        top:-140,
        color:'#0D6CFC'
    },

    items:{
        top:-180,
    },
    btn:{
        width:300,
        right:-10,
        top:-180,
          
    },
    signin:{
        left:25,
        margin:8,
        backgroundColor:'#0D6CFC',
        width:220,
        top:-150,
        borderRadius:50,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:6,
        shadowOffset:{width: 1, height:2 },
        fontSize:32,
        elevation:5,
    },

    Input:{
        borderWidth:2,
        borderColor:'#0D6CFC',
        width:300,
        height:45,
        borderRadius:50,
        margin:10,
        right:22,
        padding:9,
    },
    place:{
        borderWidth:2,
        borderColor:'#0D6CFC',
        width:300,
        height:45,
        borderRadius:50,
        margin:10,
        right:22,
        padding:9,
    },
    bar:{
        color:'#0D6CFC',
        width:100,
        height:1,
        
    },
    fotter:{
        top:240,
        
    },
    stut:{
        fontSize:16,
        
    },
    b1:{
        fontSize:16,
        
    },

    register:{
        top:220,
        left:30,
    },

    splach:{
        flex:1,
    }
    
})

export default Login;