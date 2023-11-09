import React, {useState,useEffect} from 'react';
import { Button,StyleSheet,View,Text,ScrollView,Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from 'react-native-progress/Bar';
import CheckBox from 'expo-checkbox';
import config from "../../config";
import storage from '../../storage';
import { API } from '../../api-service';
//import axios from "axios";
  
const Syllabus = () => {
  const [isSelected, setSelection] = useState(false);
  //const user = localStorage.getItem("user_id");
  const [user, setUser] = useState([]); 
  const [userId, setUserId] = useState([]); 
  const [book, setTBook] = useState([]);
  const [totalbook, setTotalBook] = useState([]);
  const [bookStudy, setBookStudy] = useState("");
  const [bookRead, setbookRead] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [token, setToken] = useState (null); 

  const fetchBook = () => {
    API.getBooks(token)
    .then((res) => {
      setTBook(res);
      setTotalBook(res.length);
    });
  };

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


  const userbookData = () => {
    API.getUser(user ,token)
      .then((result) => {
        //setBookList(result.bookRead);
        setbookRead(result.bookRead);
        setBookStudy(result.bookRead.length);
      }) 
  };
  
  useEffect(() => {
    //userbookData();
    //console.log(book);
  }, [book]);

  useEffect(() => {
    //userbookData();
    console.log(bookRead.length);
    console.log(bookRead);
  }, [bookRead]);

  setTimeout(() => {
    if(!book.length) {
      fetchBook();
    }
    if(!bookRead.length) {
      userbookData();
    }
  }, 500);

  const Progress = book.length>0 ? (bookRead.length / book.length) * 100 : 0;
  const pbgcolor=Progress<=25?"danger":Progress<=50?"warning":Progress<=75?"info":"success";

  // useEffect(() => {
  //   toggleHandler();
  // }, [bookRead]);

  //----------------------------------------------------------

  const updateBookData = () => {
    const data = {
      user,
      bookRead,
      userLogout: 1
    };

    API.updateUser(user, data, token)
            .then( resp => {
                console.log(resp);
                //console.log(data);
                if(resp.user == user) {
                  Alert.alert('Saved', 'Book reading updated!', [
                    {text: 'OK'},
                  ]);
                }
                else {
                  Alert.alert('Oops!', 'Book reading not updated!', [
                    {text: 'Dismiss'},
                  ]);
                }
            })
            .catch(error => {
                console.log('error: '+error);
                Alert.alert('Oops!', 'Book reading Not Updated!', [
                  {text: 'Dismiss'},
                ]);
            });
  };

  return (
    <ScrollView> 
      
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#f3eef6", "#f3eef6"]}
        style={styles.column}>    

      <View style={styles.row}>
        <View style={styles.upper_amounts}>
          <Text style={styles.amounts_u}>Total Completed</Text>
          <View style={styles.progress_bar}>
            <Text>{parseFloat(Progress).toFixed(2)} %</Text>
            <ProgressBar progress={Progress/100} width={80} height={5} marginRight={35} variant={pbgcolor}/>
          </View>
        </View> 
      </View>

      <View style={styles.row}>
      <Text style={styles.serial}>SL</Text>
      <Text style={styles.amounts}>Book Name</Text>
      <Text style={styles.amounts1}>Completed</Text>
      </View>
      

      { 
            book.length ? (
              book.map((item) => {
                return (
                  <View style={styles.row}>
                  <Text style={styles.leftpart}>{item.id}</Text>
                  <Text style={styles.inner_amounts}>{item.bookName}</Text>
                  <View style={styles.checkbox}>
                    <CheckBox
                        style={styles.checkbox1}
                        disabled={false}
                        value={bookRead.length ? (bookRead.includes(item.id) ? true : false) : false}
                        onValueChange={(e) => bookRead.includes(item.id) ? setbookRead(bookRead.filter(b => b !== item.id)) : setbookRead(old => [...old, item.id])}
                    />
                  </View>
                  </View> 
                )
              })
            ) : (
              ''
            )}
      


      
      {/*<TextInput 
        placeholder='Comment(Optional)'
        style={styles.button3}
            />*/}

      <Button
            title="Save"
            color="#0070bb"
            onPress={updateBookData}
      />

      </LinearGradient>
      
    </ScrollView>
  
  );
};
  
export default Syllabus;
  
const styles = StyleSheet.create({
  
  column: {
    flex:1,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  row: {
    flex:1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  serial:{
    flex:0.5,
    height:40,
    padding:5,
    backgroundColor:'#3ebefa', 
    color:'white',
    textAlign:'center',
    textAlignVertical:'center'
  },
  amounts:{
    flex:6,
    height:40,
    padding:10,
    backgroundColor:'#0070bb',
    textAlign:'center',
    textAlignVertical:'center',
    color:'white'
  },
  amounts_u:{
    padding:10,
    textAlign:'center',
    textAlignVertical:'center'
  },
  progress_bar:{
    marginBottom:10,
    marginRight:20,
    alignItems:'center',
    alignSelf:'center'
  },
  amounts1:{
    flex:2,
    height:40,
    padding:10,
    backgroundColor:'#009245',
    color:'white',
  },
  leftpart:{
    flex:0.5,
    height:40,
    padding:10,
    backgroundColor:'white', 

  },
  inner_amounts:{
    flex:6,
    height:40,
    padding:10,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center'
  },
  checkbox:{
    flex:1,
    height:40,
    padding:15,
    backgroundColor:'white',

  },
  checkbox1:{
    width:15,
    height:15,
    alignSelf:'center'
  },
  button3:{
    flex:1,
    marginBottom:10,
    height: 50,
    width: 360,
    padding: 10,
    marginTop: 10,
  },
  footer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  save_share: {
    backgroundColor: 'green',
    width: '40%',
    height: 40,
    marginHorizontal:10,
    marginTop:30,
    borderRadius:30
  },
  save_share1: {
    backgroundColor: '#29abe1',
    width: '40%',
    height: 40,
    marginHorizontal:10,
    marginTop:30,
    borderRadius:30
  },
  save_share_text:{
    marginTop:10,
    textAlign:'center',
    color:'white'
  },
  example: {
    marginVertical: 24,
  },
  upper_amounts:{
    flexDirection:'row',
    alignItems:'flex-end',
    marginLeft:190    
  }
  
});