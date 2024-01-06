import { StyleSheet, Text, View, Image,TouchableOpacity, ScrollView, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import storage from '../../storage';
import { API } from '../../api-service';
import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";


const Notification = (props) => {
  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 
  
  const [filterCon, setFilterCon] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const maxProcessingTime = 15; //if 15 second waiting time, then network problem


  useEffect(() => {
    storage.load({
      key: 'user',
      id: '1001'
    })
    .then(ret => {
      setToken(ret.token);
      setUser(ret.userid);
    });   
  }, []);

  const fetchNotification = () => {
    API.getNotifications(token)
    .then((res) => {
        setFilterCon(res.reverse());
    });
  };

  setTimeout(() => {
    if(!filterCon.length) {
      fetchNotification();
    }
  }, 500);

  useEffect(() => {
    //console.log(filterCon);
  }, [filterCon]);

  useEffect(() => {
    if(filterCon.length > 0) {
      setLoading(false);
    } 
  }, [filterCon]);
  
  setTimeout(() => {
    if(loadingCount <= maxProcessingTime) {
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
  
  const connectivityProblem = () => {
    Alert.alert('Network Error!', ' Please check your network connection and Try Again. If the problem still persist, please logout, close the app, and login again.', [
      {text: 'DISMISS', onPress: () => {
        setLoading(false);
      }},
    ]);
  }

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.notification}>Last Notifications</Text>
      </View>
      { 
            filterCon ? (
              filterCon.map((item) => {
                return (
                    <View style={styles.notification_body1}>
                      <Text>
                        {item.time.substring(0, 10)+' '} 
                        @ {item.time.substring(11, 16)}
                      </Text>
                      <Text style={styles.notification_body_header}>{item.title}</Text>
                      <Text>{item.details}</Text>
                  </View>
                )
              })
            ) : (
              ''
            )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={loading}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {'Loading...'}
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
    </ScrollView>
  )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        padding:5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#3a8fca",
        width:"100%",
        flexDirection: "row",
      },
      notification:{
        fontSize:20,
        color:'white'
      },
      notification_body1:{
        borderWidth:1,
        fontSize:20,
        color:'white',
        marginTop:10,
        padding:10,
        width:'90%',
        alignSelf:'center',
        borderColor:'#3a8fca'
      },
      notification_body_header:{
        fontWeight:'bold',
        fontSize:20,
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
})