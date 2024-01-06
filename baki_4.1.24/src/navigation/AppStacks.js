import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Iframe from 'react-iframe'
//import { WebView } from 'react-native-webview';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const AppStacks = () => {
  return (

    <WebView
        source={{uri: 'https://reporting.smsamfund.se'}}
        style={{marginTop: 20}}
        />
  );
};

export default AppStacks;

const styles = StyleSheet.create({});
