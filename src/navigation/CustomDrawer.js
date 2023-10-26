import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {PageLogin} from "../screens/PageLogin";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./RootStackScreen";
import storage from "../../storage";
import { API } from "../../api-service";

const CustomDrawer = (props) => {

  //console.log(props);
  const [user, setUser] = useState([]);
  const [userid, setUserId] = useState(0);
  const [userToken, setUserToken] = useState (null); 
  const [responsibilities, setResponsibilities] = useState([]);

  useEffect(() => {
    storage.load({
      key: 'user',
      id: '1001'
    })
    .then(ret => {
      // found data goes to then()
      //console.log(ret.loggedin);
      setUserToken(ret.token);
      setUserId(ret.userid);

      API.getResponsibilities(ret.token)
      .then( resp =>  setResponsibilities(resp))
      .catch (error => console.log(error));
    });

    
  }, []);

  useEffect(() => {
    console.log(userid);
    if(userid > 0) {
      API.getUser(userid, userToken)
      .then( res => {
        setUser(res);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [userid]);

  const PageLogin = () => {
    var userA = {
      username: null,
      userid: null,
      token: null,
      loggedin: 0
    };
    
    storage.save({
      key: 'user', // Note: Do not use underscore("_") in key!
      id: '1001', // Note: Do not use underscore("_") in id!
      data: userA,
      expires: 1000 * 3600 * 24
    });

    props.navigation.navigate('SignInScreen', {name: 'SignInScreen'});
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#006ae3" }}
      >
        <ImageBackground
          source={require("../../assets/img/AppBG.jpg")}
          style={{ padding: 20, alignItems: "center" }}
        >
          <Image
            source={require("../../assets/img/user.png")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderColor: "white",
              borderWidth: 2,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 18, color: "white" }}>
             {user.firstName+' '+ user.lastName}
          </Text>
          <Text style={{ fontSize: 12, color: "#ffffffa6" }}>
            {" "}
            {user.responsibility && responsibilities.length>=Number(user.responsibility) ? responsibilities[Number(user.responsibility)-1].responsibilityName : ''}
          </Text>
        </ImageBackground>
        <View style={{ backgroundColor: "#9fdbfd" }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 5,
          borderTopWidth: 1,
          borderColor: "blue",
          backgroundColor: "lightblue",
        }}
      >
        <TouchableOpacity onPress={PageLogin} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center",paddingLeft:15 }}>
            <FontAwesome5 name="user" size={20} color="blue" />
            <Text style={{marginLeft:25, color:'blue',fontSize:16,fontWeight:"bold"}}> Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
