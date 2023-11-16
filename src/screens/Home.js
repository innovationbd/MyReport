import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import PageLogin from '../screens/PageLogin';
import Header from "../components/Header";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageHome from "./PageHome";
import storage from "../../storage";

const Stack = createNativeStackNavigator();
const Home = (props) => {

  //console.log(props);

  
  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#a7d49c", "#006ae3"]}
        style={styles.container}
      >
        <Header/>

        
        
        

      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
  },

  button: {
    flex: 1,
    marginTop: 20,
  },
});