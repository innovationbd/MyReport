import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../../assets/logo.png";
const PageHome = () => {
  return (
    <SafeAreaView style={styles.root}>
      
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#a7d49c", "#006ae3"]}
        style={styles.container}
      >
        <Text>Home Page</Text>
        <Image source={logo} style={{ width: 250, height: 50 , marginTop:20}} />

        <Button
          onPress={function () {
            props.navigation.navigate("Home");
          }}
          title="USER LOGIN "
          color="#355e2b"
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PageHome;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
  
  },
  input: {
    width: 300,
    height: 50,
    margin: 12,
    borderColor: "#a7d49c",
    borderWidth: 3,
    padding: 10,

    borderRadius: 10,
    backgroundColor: "#dcfffd",
  },
});