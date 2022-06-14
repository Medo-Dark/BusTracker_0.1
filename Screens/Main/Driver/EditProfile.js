import { StyleSheet, Text, View, Button, TextInput, Image ,Dimensions } from 'react-native'
import React , {useEffect, useState} from 'react'
import { useDispatch ,useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function EditProfile(props) {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');

   const userId = useSelector((state)=>state.user.userId);
   const targetedUser = useSelector((state)=>state.user.targetedUser);
   console.log(userId);
   console.log('--------------------------------------------------------',targetedUser);

    
    
  return (
    <View style={{position:'absolute'}}>
    <View style={styles.form}>
        
        <Ionicons style={styles.icon} name="cloud-upload-outline" size={200} color="#000" />
        <Text style={styles.title}> Edit User Profile </Text>
        <TextInput style={styles.Input}
        placeholder='UserName'
        onChangeText={(userName) => setUsername(userName)}
        />
        <TextInput style={styles.Input}
        placeholder='Email'  
        onChangeText={(email) => setEmail(email)}
        />
        <View style={styles.btn}>
            <Button title='Update' onPress={()=>{
                
            }}/>
        </View>
        <View style={{...styles.btn,top:-80}}>
            <Button title='Go Back' onPress={()=>{props.goBack()}}/>
        </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
   
    back:{
        flex:1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor:'#ECE9E6',
        position:'absolute'
    },
    form:{
        backgroundColor:'#ffff',
        zIndex:1,
        top:200,
        width:415,
        height:700,
        borderRadius:50,
    },

    title:{
        top:-50,
        left:110,
        fontSize:24,
        fontWeight:'bold',
        color:'#0D6CFC',
    },
    Input:{
        top:-20,
        width:300,
        height:55,
        borderRadius:50,
        margin:10,
        padding:9,
        left:40,
        backgroundColor:'#D9D9D9',
    },
    btn:{
        borderWidth:2,
        borderColor:'#0D6CFC',
        top:30,
        left:90,
        margin:8,
        backgroundColor:'#ffff',
        width:220,
        borderRadius:50,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:6,
        shadowOffset:{width: 1, height:2 },
        fontSize:32,
        elevation:5,
    },
    icon:{
        top:-110,
        left:100,
    },
})