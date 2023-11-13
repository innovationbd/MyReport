import React, {useEffect,useState} from "react";
import { Button, ScrollView, StyleSheet, Text, View,Alert, Modal } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";
import storage from '../../storage';
import config from "../../config";
//import axios from "axios";
import { API } from "../../api-service";
import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";


const ChangePassword = () =>{
    const [user, setUser] = useState();
    const [status, setStatus] = useState(undefined); // For message
    const [old_password, setOldPass] = useState("");
    const [new_password1, setPassword1] = useState("");
    const [new_password2, setPassword2] = useState("");
    const [new_password, setPassword] = useState("");
    const [token, setToken] = useState (null);

    const [processing, setProcessing] = useState(false);
    const [processingCount, setProcessingCount] = useState(0);
    const maxProcessingTime = 15; //if 15 second waiting time, then network problem

    var myColor = "green";
    var retypeMessage = '';
    var passMatched = false;
    
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

      setTimeout(() => {
        if(processingCount <= maxProcessingTime) {
          if(processing) {
            setProcessingCount(processingCount+1);
          } else {
            setProcessingCount(0);
          }
        }
      }, 1000);

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
          }},
        ]);
      }


      const userChangePassword = (e) => {
       // e.preventDefault();
        if(new_password == new_password2){ 
          setProcessing(true);
          //setPassword(new_password1);
          const data = {
            old_password,
            new_password
          };
          //console.log(old_password);
          //console.log(new_password);
          API.changePassword(data, token)
            .then((res) => {
              setProcessing(false);
              console.log(res);
              setStatus({ type: "error" });
              Alert.alert("Error", "Check Old & New Password,Password at least 8 characters.", [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            })
            .catch((error) => {
              setProcessing(false);
              console.log(error);
              
              setStatus({ type: "success" });
              Alert.alert("Success!", "Your Password successfully Changed", [
                {
                  text: 'Cancel',
                  //onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK'},
              ]);
            });
        }
        else {
            Alert.alert("Error", "Retype new password correctly", [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }
      };
    
      const matchPassword = (pass2) => evt => {
        if(pass2 == '') {
          passMatched = false;
          retypeMessage = '';
        } else if (pass2 != new_password1) {
          passMatched = false;
          retypeMessage = 'Retype new password correctly';
          myColor = "red";
        } else {
          setPassword(pass2);
          passMatched = true;
          retypeMessage = 'Password matched!';
          myColor = "green";
        }
      };


    return(
        

        
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#a7d49c", "#006ae3"]}
        style={styles.container}
        >

      <Modal
        animationType="slide"
        transparent={true}
        visible={processing}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {'Processing...'}
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
            <View>
            <View style={styles.lower_body}>
            <Text style={styles.change_password}>Change Password</Text>
            
                
                <TextInput 
                    style={styles.change_password1}
                    placeholder="Old Password" secureTextEntry={true} 
                    onChangeText={setOldPass}
                    value={old_password}
                
                />

                <TextInput
                    style={styles.change_password2}
                    placeholder="New Password" secureTextEntry={true} 
                    onChangeText={setPassword}
                    value={new_password}
                />
                

                <TextInput
                    style={styles.change_password3}
                    placeholder="Confirm New Password" secureTextEntry={true} 
                    onChangeText={setPassword2}
                    value={new_password2}
                />

            <Text style={styles.change_password4}
            onPress={() => {
                userChangePassword();
             }}
            >Change Password</Text>
            </View>
            </View>
             

        </LinearGradient>
        

    )
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
    modalText: {
      marginBottom: 5,
      textAlign: 'center',
      position: 'absolute',
      top: 20
    },
    change_password:{
        flexDirection:'row',
        textAlign:'center',
        color:'white',
        fontSize:20,
        marginTop:50,
        marginBottom:50,
    },
    lower_body:{
        flex:3,
        flexDirection:'column'
    },
    change_password1:{
        flexDirection:'row',
        textAlign:'center',
        color:'grey',
        fontSize:20,
        height:'8%',
        borderRadius:40,
        marginBottom:10,
        backgroundColor:'white',
        shadowOffset:5,
    },
    change_password2:{
        flexDirection:'row',
        textAlign:'center',
        color:'grey',
        fontSize:20,
        height:'8%',
        borderRadius:40,
        backgroundColor:'white',
        marginBottom:10,
    },
    change_password3:{
        flexDirection:'row',
        textAlign:'center',
        color:'grey',
        fontSize:20,
        height:'8%',
        width:300,
        borderRadius:40,
        backgroundColor:'white',
        marginBottom:10,
    },
    change_password4:{
        flexDirection:'row',
        textAlign:'center',
        fontSize:20,
        height:'8%',
        borderRadius:40,
        backgroundColor:'green',
        color:'white',
        textAlignVertical:'center'
    },
    

})