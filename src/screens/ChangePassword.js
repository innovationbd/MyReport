import React, {useEffect,useState} from "react";
import { Button, ScrollView, StyleSheet, Text, View,Alert } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";
import storage from '../../storage';
import config from "../../config";
//import axios from "axios";
import { API } from "../../api-service";


const ChangePassword = () =>{
    const [user, setUser] = useState();
    const [status, setStatus] = useState(undefined); // For message
    const [old_password, setOldPass] = useState("");
    const [new_password1, setPassword1] = useState("");
    const [new_password2, setPassword2] = useState("");
    const [new_password, setPassword] = useState("");
    const [token, setToken] = useState (null);
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


      const userChangePassword = (e) => {
       // e.preventDefault();
        if(new_password == new_password2){ 
          //setPassword(new_password1);
          const data = {
            old_password,
            new_password
          };
          //console.log(old_password);
          //console.log(new_password);
          API.changePassword(data, token)
            .then((res) => {
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