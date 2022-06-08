import React ,{useState} from 'react';
import { StyleSheet, Text, View ,Linking , Alert ,TextInput ,Button} from 'react-native';

const ContactUs = () => {
   const [subject,SetSubject] = useState();
   const [description,SetDescription] = useState();
   const [pressed,setPressed] = useState(false);

  return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>ContactUs</Text>
        <TextInput
                    style={[styles.Input,pressed && !subject && {borderColor:'red'}] }
                    placeholder="Subject"
                    value={subject}
                    keyboardType="twitter"
                    onChangeText={(subject) => {SetSubject(subject.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))
                    setPressed(false);
                }}
                />
        <TextInput
                    style={[{...styles.Input,height:170},pressed && !description && {borderColor:'red'}]}
                    placeholder="Description"
                    value={description}
                    multiline = {true}
                    keyboardType="twitter"
                    onChangeText={(description) => {SetDescription(description)
                        setPressed(false);
                    }} 
                />
      <Button onPress={() => {
          if (!subject || !description) {
              Alert.alert('','Please Fill the Above Field Before Progress');
              setPressed(true);
              return;
          }
          Linking.openURL(`mailto:BusTrackerSupport@gmail.com?subject=${subject}&body=${description}`)
        } }
      title="Mail Support"/>
    </View>
  )
}

export default ContactUs

let styles = StyleSheet.create({
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
        textAlignVertical: "top",
        padding:19
        
    }
})