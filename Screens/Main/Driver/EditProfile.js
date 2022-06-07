import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native'
import React , {useEffect, useState} from 'react'
import { useDispatch ,useSelector } from 'react-redux';



export default function EditProfile({navigation}) {

   const userId = useSelector((state)=>state.user.userId);
   const targetedUser = useSelector((state)=>state.user.targetedUser);
   console.log(userId);
   console.log('--------------------------------------------------------',targetedUser);

    
    
      

    
    
  return (
    <View>
    <View style={styles.btn}>
        <Button title="Edit Profile" onPress={()=>{}}/>
      </View>
      <View style={styles.back1}>
          <Text style={styles.title}>
              Edit your profile details
          </Text>
          
      </View>
      <View style={styles.back2}>
            <TextInput
              style={styles.Input}
                placeholder="Username"
                value=''
                keyboardType="twitter"
                onChangeText={(txt) => setdriverData({})}
                />
              <TextInput
              placeholder='Full name'
              style= {styles.Input}
              value={driverData ? driverData.name || '' : ''}
              onChangeText={(txt) => setdriverData({...driverData, name: txt})}
              />
              
              <TextInput
              placeholder='Email'
              style= {styles.Input}
              value={driverData ? driverData.email || '' : ''}
              />

              <TextInput
              placeholder='Password'
              style= {styles.Input}
              value= {driverData ? driverData.password || '' : ''}
              onChangeText={(txt) => setdriverData({...driverData, password: txt})}
              secureTextEntry={true}
              />

             <TextInput
              placeholder='DriverCode'
              style= {styles.Input}
              value= {driverData ? driverData.drivercode || '' : ''}
              />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
   
    back1:{
        top:-43,
        width:414,
        height: 775,
        backgroundColor: '#0DA8FF',
        
        shadowColor:'black',
        shadowOpacity:0.55,
        shadowRadius:10,
        shadowOffset:{width: 2, height:4 },
        elevation:5,
        borderBottomRightRadius:150,
        borderBottomLeftRadius:150,
    },

    back2:{
        top:-630,
        width:414,
        height:525,
        backgroundColor: '#0D6CFC',
        zIndex:1,
        shadowColor:'black',
        shadowOpacity:0.55,
        shadowRadius:10,
        shadowOffset:{width: 2, height:4 },
        elevation:5,
        borderBottomRightRadius:150,
        borderBottomLeftRadius:150,
        borderTopRightRadius:150,
        borderTopLeftRadius:150,
    },

    btn:{
        top:670,
        zIndex:2,
        backgroundColor:'#fff',
        width:200,
        left:100,
        borderRadius:50,
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:6,
        shadowOffset:{width: 1, height:2 },
        elevation:5,
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
        top:-70,
    },

    title:{
        color:'#fff',
        top:50,
        left:40,
        fontSize:32,
        fontWeight:'bold',
    },

    img:{
        width:150,
        height:150,
        top:-70,
        left:130,
        borderRadius:75,
        zIndex:1,
    },
})