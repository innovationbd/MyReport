import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

import logo from "../../assets/logo.png";

const header = (props) => {
  return (
    <View style={styles.container}>
       <View style={{width:"13%",alignItems:"center"}}>
        <Text></Text>
        </View>
      <View style={{width:"74%", alignItems:"center" }}>
        <Image source={logo} style={{ width: 200, height: 35 }} />
        </View>
      <View style={{width:"13%", alignItems:"center"}}>
      {/*<TouchableOpacity  onPress={function(){
            props.navigation.openDrawer()}}>
        <FontAwesome5  name="bars" size={25} color="black" />
      </TouchableOpacity>*/}
   </View>
    </View>
  )
}

export default header

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        padding:5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"white",
        width:"100%",
        flexDirection: "row",
      },
})