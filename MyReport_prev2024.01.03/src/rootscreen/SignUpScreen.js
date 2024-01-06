import { StyleSheet, Text, View,SafeAreaView,
    Image, } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#a7d49c", "#006ae3"]}
        style={styles.container}
      >
       <Text>SignUpScreen</Text>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    root: { flex: 1 },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
})