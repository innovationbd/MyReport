
import { StyleSheet, Text, View, Button, SafeAreaView, Image,TextInput  } from 'react-native';
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../../assets/appLogo.png'
import { API } from '../../api-service';
import storage from '../../storage';

const PageLogin = (props) => {

  const [username, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = () => {
    const data = {
      username,
      password,
    };

    API.loginAuth(data)
    .then( res => {
      console.log(res.user_name);
      console.log(res.user_id);
      console.log(res.token);

      var userA = {
        username: res.user_name,
        userid: res.user_id,
        token: res.token,
        loggedin: res.user_id ? 1 : 0
      };
      
      storage.save({
        key: 'user', // Note: Do not use underscore("_") in key!
        id: '1001', // Note: Do not use underscore("_") in id!
        data: userA,
        expires: 1000 * 3600 * 24
      });
    })
    .catch(error => {
        console.log(error);
    });

    storage.load({
      key: 'user',
      id: '1001'
    })
    .then(ret => {
      // found data goes to then()
      //console.log(ret.loggedin);
    })
    .catch(err => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          console.log('not found');
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });

    //console.log(username);
  }

  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{x: 1, y: 1 }}
          colors={['#a7d49c', '#006ae3']}
          style={styles.container}
          >
     
       
      <Image source={logo} style={{ width:180, height: 180 }} />
      <TextInput
        style={styles.input}
        onChangeText={setUserId}
        value={username}
        placeholder="User Id"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button
        onPress={userLogin}
        title="USER LOGIN "
        color="#355e2b"
      />
     
   
     </LinearGradient>
    </SafeAreaView>
  )
}

export default PageLogin

const styles = StyleSheet.create({
  root:{flex:1},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input: {
    width:300,
    height: 50,
    margin: 12,
    borderColor:'#a7d49c',
    borderWidth:3,
    padding: 10,

    borderRadius:10,
    backgroundColor:'#dcfffd'
  },
})