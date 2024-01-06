import { Button,ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity, Modal } from 'react-native'
import React, {useEffect, useState} from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import {SocialIcon} from '@rneui/themed';
//import axios from "axios";
import config from "../../config";
import { API } from '../../api-service';
import storage from '../../storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";

const Contactus = () => {

  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 

  const [status, setStatus] = useState(undefined);// For message

  const [name,setName]=useState('');
  const [phone,setPhone]=useState(null);
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [processingCount, setProcessingCount] = useState(0);
  const maxProcessingTime = 15; //if 15 second waiting time, then network problem

  useEffect(() => {
    if(user>0) {
      setLoading(false);
    } 
  }, [user]);

  setTimeout(() => {
    if(loadingCount <= maxProcessingTime && processingCount <= maxProcessingTime) {
      if(processing) {
        setProcessingCount(processingCount+1);
      } else {
        setProcessingCount(0);
      }

      if(loading) {
        setLoadingCount(loadingCount+1);
      } else {
        setLoadingCount(0);
      }
    }
  }, 1000);

  useEffect(() => {
    if(loadingCount > maxProcessingTime) {
      setLoadingCount(0);
      setLoading(false);
      connectivityProblem();
    }
  }, [loadingCount]);

  useEffect(() => {
    if(processingCount > maxProcessingTime) {
      setProcessingCount(0);
      setProcessing(false);
      connectivityProblem();
    }
  }, [processingCount]);

  const connectivityProblem = () => {
    Alert.alert('Network Error!', ' Please check your network connection and Try Again. If the problem still persist, please logout, close the app, and login again.', [
      {text: 'DISMISS', onPress: () => {
        setProcessing(false);
        setLoading(false);
      }},
    ]);
  }

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!name.trim()) {
      alert('Please Enter Name');
      return;
    }
    //Check for the Email TextInput
    if (!phone.trim()) {
      alert('Please Enter Phone No.');
      return;
    }
    if (!email.trim()) {
      alert('Please Enter Email.');
      return;
    }
    if (!message.trim()) {
      alert('Please Enter a message.');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    //alert('Success');
    sendDataToApi();
  };

const sendDataToApi= ()=>{
  setProcessing(true);
  //e.preventDefault();
 
  const data = {
    name,
    phone,
    email,
    message
  }
  API.postFeedback(data, token)
  .then((res) => {
    setProcessing(false);
  setStatus({ type: 'success' });
  Alert.alert("Success!", "Feedback successfully sent.", [
    {
      
      text: 'Cancel',
      //onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK'},
  ]);
  setName('');
  setPhone(null);
  setEmail('');
  setMessage('');
  //e.target.reset();
  })
  .catch((error) => {
    setProcessing(false);
  setStatus({ type: 'error', error });
  Alert.alert("Error", "Feedback Not Sent!", [
    {
      text: 'Cancel',
      //onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK'},
  ]);
  });

  

  }

  useEffect(() => {
    storage.load({
      key: 'user',
      id: '1001'
    })
    .then(ret => {
      // found data goes to then()
      //console.log(ret.loggedin);
      setToken(ret.token);
      setUser(ret.userid);
    });   
  }, []);

  return (
    <ScrollView style={styles.fullbody}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={processing || loading}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {processing ? 'Sending...' : 'Loading...'}
          </Text>
          <Animatable.Image
          animation="fadeInDown"
          source={loading_line}
          style={{ width: 191, height: 100, zIndex: -1}}
          resizeMode="stretch"

        />
          </View>
        </View>
      </Modal>
      
      <View style={styles.upperBox}>
        <View style={styles.upperBoxRow1}>
          <View style={styles.upperBox1}>
            <Text style={styles.upperBox1text}>Contact</Text>
              <Text style={styles.upperBox1text1}>
                Call Us : 073-656 97 22
              </Text>
          </View>
          <View style={styles.upperBox2}>
            <Text style={styles.social}>Follow Us On</Text>
            <View style={styles.social1}>
            <Icon
                  name="facebook"
                  onPress={() => {
                    Linking.openURL('https://www.facebook.com/smsamfund')
                  }}
                  size={30} color='#3b5998'
            />
            <Icon
                  name="twitter"
                  onPress={() => {
                    Linking.openURL('https://twitter.com/')
                  }}
                  size={30} color=' #00acee' marginLeft={10}
            />
            <Icon
                  name="instagram"
                  onPress={() => {
                    Linking.openURL('https://www.instagram.com/smsamfund/')
                  }}
                  size={30} color='black' marginLeft={10}
            />
            <Icon
                  name="youtube"
                  onPress={() => {
                    Linking.openURL('https://www.youtube.com/')
                  }}
                  size={30} color='#c4302b'
                  marginLeft={10}
            />
            </View>
          </View>
        </View>
        <View style={styles.upperBoxRow2}>
          <View style={styles.upperBox3}>
            <Text style={styles.upperBox1text}>Address</Text>
            <Text style={styles.upperBox1text1}>
              Torvsätravägen 28

              127 38, Skärholmen
            </Text>
          </View>
          <View style={styles.upperBox4}>
            <Text style={styles.upperBox1text}>About Us</Text>
            <Text style={styles.upperBox1text2}
              onPress={() => Linking.openURL('https://smsamfund.se/about-sms/')}>
              smsamfund
            </Text>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.lowerBox}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.lowerBoxText}>Give Feedback</Text>
      </ScrollView>
      <TextInput 
        style={styles.lowerBoxTextInput}
        placeholder='Your Name'
        onChangeText={(value) => setName(value)}
        value={name}
      />

      <TextInput 
        style={styles.lowerBoxTextInput}
        placeholder='Your Phone'
        onChangeText={(value) => setPhone(value)}
        value={phone}
      />
      <TextInput 
        style={styles.lowerBoxTextInput}
        placeholder='Your Email'
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <TextInput 
        style={styles.lowerBoxLastTextInput}
        placeholder='Your Message'
        onChangeText={(value) => setMessage(value)}
        value={message}
      />
      <TouchableOpacity style={styles.submitButton}>
        <Button
          title={"Submit"}
          color="#0070bb"
          onPress={checkTextInput}
          
        />

      </TouchableOpacity>
      
    </ScrollView>
    
  )
}

export default Contactus

const styles = StyleSheet.create({
  fullbody:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#fefbd5',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
    paddingLeft: 50,
    paddingRight: 50
  },
  upperBox:{
    flex:7,
    flexDirection:'row',
    borderColor:'green',
    marginTop:50,
    marginLeft:10,
    marginRight:10,
    marginBottom:70,
    borderRadius:20,
  },
  lowerBox:{
    flex:1,
    height:'10%',
    width:'95%',
    flexDirection:'row',
    marginLeft:10,
    marginBottom:5,
    backgroundColor:'#50a6f4',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  lowerBoxTextInput:{
    flex:1,
    height:40,
    width:'95%',
    flexDirection:'row',
    marginLeft:10,
    marginBottom:10,
    backgroundColor:'white',
    borderWidth:0.5,
    paddingLeft:5,
  },
  lowerBoxLastTextInput:{
    flex:1,
    height:70,
    width:'95%',
    flexDirection:'row',
    marginLeft:10,
    marginBottom:10,
    backgroundColor:'white',
    borderWidth:0.5,
    paddingLeft:5,
  },
  upperBoxRow1:{
    flex:1,
    flexDirection:'column',
  },
  upperBoxRow2:{
    flex:1,
    flexDirection:'column'
  },
  upperBox1:{
    flex:1,
    borderEndColor:'green',
    backgroundColor:'#ffffff',
    borderTopLeftRadius:10,

    borderTopRightRadius:0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth:1,
    borderColor: '#39b549',
  },
  upperBox2:{
    flex:1,
    flexDirection:'column',
    borderEndColor:'green',
    marginBottom:2,
    backgroundColor:'#ffffff',
    borderBottomLeftRadius:10,
    borderTopRightRadius:0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius:0,
    borderWidth:1,
    borderColor: '#39b549',
  },
  upperBox3:{
    flex:1,
    borderEndColor:'green',
    backgroundColor:'#ffffff',
    borderTopRightRadius:10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius:0,
    borderWidth:1,
    borderColor: '#39b549',
  },
  upperBox4:{
    flex:1,
    borderEndColor:'green',
    marginBottom:2,
    backgroundColor:'#ffffff',
    borderBottomRightRadius:10,
    borderTopRightRadius:0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius:0,
    borderWidth:1,
    borderColor: '#39b549',
  },
  upperBox1text:{
    fontSize:20,
    color:'green',
    verticalAlign:'middle',
    padding:10
  },
  social:{
    flex:1,
    flexDirection:'row',
    fontSize:20,
    color:'green',
    verticalAlign:'middle',
    padding:10,
    marginTop:1
  },
  social1:{
    flex:1,
    flexDirection:'row',
    fontSize:10,
    color:'green',
    verticalAlign:'middle',
    width:50
  },
  upperBox1text1:{
    fontSize:15,
    verticalAlign:'middle',
    padding:20
  },
  upperBox1text2:{
    fontSize:15,
    verticalAlign:'middle',
    padding:10,
    color:'blue',
    marginTop:8
  },
  lowerBoxText:{
    fontSize:15,
    padding:10,
    color:'white',
  },
  submitButton:{
    alignItems:'center',
    padding:20,
  }
})