import React from 'react';
import { Platform, Text, View, StyleSheet ,StatusBar } from 'react-native';
import Map from "../../../map";

export default function User() {
  return (

  <View style={styles.container}>
  <StatusBar/>
  <Map/>
  </View>

  );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
paragraph:{
  justifyContent:"center",
  alignItems:"center"
}

})