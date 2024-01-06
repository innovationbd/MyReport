import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Aboutus = (props) => {

  const url = "https://smsamfund.se/about-sms/";
  useEffect(() => {
    Linking.openURL(url);
    props.navigation.navigate('Home', {name: 'Dashboard'});
  }, []);

  return (
    <View>
      <Text>About Us</Text>
    </View>
  )
}

export default Aboutus

const styles = StyleSheet.create({})