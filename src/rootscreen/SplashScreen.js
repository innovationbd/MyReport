import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Animatable from 'react-native-animatable';
import React, { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../../assets/appLogo.png";
import { greaterThan } from "react-native-reanimated";
import SignInScreen from "./SignInScreen";
import storage from "../../storage";
const SplashScreen = (props) => {

  const [userToken, setUserToken] = useState (null);

  useEffect (() => {
    if(userToken!=null) {
      props.navigation.navigate('AppStack', {name: 'AppStack'});
    }
  }, [userToken]);

  storage.load({
    key: 'user',
    id: '1001'
  })
  .then(ret => {
    // found data goes to then()
    //console.log(ret.loggedin);
    setUserToken(ret.token);
  })
  .catch(err => {
    // any exception including data not found
    // goes to catch()
    //console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        // TODO;
        setUserToken(null);
        break;
      case 'ExpiredError':
        // TODO
        setUserToken(null);
        break;
    }
  });

  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#a7d49c", "#006ae3"]}
        style={styles.container}
      >
        {/* Inner Content Start */}

        <View style={styles.header}>
          <Animatable.Image
          animation="bounceIn"
         
            source={logo}
            style={{ width: 180, height: 180 }}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View style={styles.footer}
        animation="fadeInUpBig"
        >
          <Text style={styles.title}>Stay connected with everyone!</Text>
          <Text>Sign in with account</Text>
          <View style={{alignItems:"flex-end",paddingTop:50}}>
            <TouchableOpacity onPress={() => props.navigation.navigate(SignInScreen)}>
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.getstart}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Get Started   <FontAwesome5 name="arrow-right" size={16} color="white" />
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Inner Content End */}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#08ad86",
  },
  getstart: {
    width: 150,
    padding: 10,
    fontWeight: "bold",
    color: "white",
    borderRadius: 30,
    alignItems: "center",
  },
});
