import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react';
import { Marker } from 'react-native-maps'
import Ionicons from '@expo/vector-icons/Ionicons';


const MarkersList = props => {
    
    let ListMarker =  [];
    props.list.forEach(element => {
        ListMarker.push(<Marker
            coordinate={element}
            identifier={'WAYPOINT '+element.id}
            title={element.name}
            key={element.id}
           > 
            <Ionicons style={styles.icons2} name="time-outline" size={30} color="#0D6CFC"></Ionicons>
           </Marker>
          
        )
            
    });  
  return (
    <View>
      {ListMarker}
    </View>
  )
}

export default MarkersList

const styles = StyleSheet.create({})