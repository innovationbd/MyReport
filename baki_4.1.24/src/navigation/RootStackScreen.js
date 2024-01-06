import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../rootscreen/SplashScreen';
import SignInScreen from '../rootscreen/SignInScreen';
import SignUpScreen from '../rootscreen/SignUpScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = (navigation) => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignInScreen">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  )
}

export default RootStackScreen

const styles = StyleSheet.create({})