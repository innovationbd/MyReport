import { StyleSheet, Text, View, Image,TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import storage from '../../storage';
import { API } from '../../api-service';


const Notification = (props) => {
  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 
  
  const [filterCon, setFilterCon] = useState([]);

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

  return (
    <ScrollView>
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
      }
})