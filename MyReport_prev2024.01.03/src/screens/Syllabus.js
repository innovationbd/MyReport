import React, {useState,useEffect} from 'react';
import { Button,StyleSheet,View,Text,ScrollView,Alert, Modal, FlatList } from 'react-native';
import { Searchbar, TextInput } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from 'react-native-progress/Bar';
import CheckBox from 'expo-checkbox';
import config from "../../config";
import storage from '../../storage';
import { API } from '../../api-service';
import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";
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
  const [bookList, setBookList] = useState([]);
  const [token, setToken] = useState (null); 

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [processingCount, setProcessingCount] = useState(0);
  const maxProcessingTime = 15; //if 15 second waiting time, then network problem
  const [userInput,setUserInput] = useState("");

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

    /*if(!bookStudy) {
      userbookData();
    }*/
  }, 500);

  useEffect(() => {
    if(book.length > 0) {
      setLoading(false);
    } 
  }, [book]);

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

  const Progress = book.length>0 ? (bookRead.length / book.length) * 100 : 0;
  const pbgcolor=Progress<=25?"danger":Progress<=50?"warning":Progress<=75?"info":"success";

  // useEffect(() => {
  //   toggleHandler();
  // }, [bookRead]);

  //----------------------------------------------------------

  const updateBookData = () => {
    setProcessing(true);
    const data = {
      user,
      bookRead,
      userLogout: 1
    };

    API.updateUser(user, data, token)
            .then( resp => {
              setProcessing(false);
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
              setProcessing(false);
                console.log('error: '+error);
                Alert.alert('Oops!', 'Book reading Not Updated!', [
                  {text: 'Dismiss'},
                ]);
            });
  };

  const filterData = (item) =>{
    if(userInput === ""){
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
    }

    if(item.bookName.toLowerCase().includes(userInput.toLowerCase())){
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
    }
  }

  return (
    <>
    <View style={styles.row_completed}>
      <TextInput
        placeholder="Search"
        onChangeText={(text) => setUserInput(text)}
        value={userInput}
        style={styles.counselorList}        
      />
      <View style={styles.upper_amounts}>
        <Text style={styles.amounts_u}>Total Completed</Text>
        <View style={styles.progress_bar}>
          <Text>{parseFloat(Progress).toFixed(2)} %</Text>
          <ProgressBar progress={Progress/100} width={80} height={5} marginRight={35} variant={pbgcolor}/>
        </View>
      </View> 
    </View>

    <View style={styles.row_columnName}>
      <Text style={styles.serial}>SL</Text>
      <Text style={styles.amounts}>Book Name</Text>
      <Text style={styles.amounts1}>Completed</Text>
    </View>

    <FlatList
      data={book}
      renderItem={({item, index}) => filterData(item)}
    />

    {/* 
    <TextInput 
    style={styles.search}
    placeholder="Search"
    onChangeText={(text) => setUserInput(text)}
    />
    */}
      
    <ScrollView> 
      
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#f3eef6", "#f3eef6"]}
        style={styles.column}>   

        <Modal
        animationType="slide"
        transparent={true}
        visible={processing || loading}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {processing ? 'Saving...' : 'Loading...'}
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

      

      
      
    {/* 
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

      */}
      


      
      {/*<TextInput 
        placeholder='Comment(Optional)'
        style={styles.button3}
            />*/}

      

      </LinearGradient>
      
    </ScrollView>
    <Button
    title="Save"
    color="#0070bb"
    onPress={updateBookData}
    />
    </>
  
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

  row_columnName: {
    marginTop:30,
    marginBottom:20,
    flex:1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },

  row_completed: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  search:{
    width:'80%',
    alignSelf:'center',
    marginTop:10,
  },
 
  counselorList:{
    flex:1,
    flexDirection:'column',
    marginLeft:10,
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
    alignItems:'center',
    alignSelf:'center',
    marginLeft:50,
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
    flex:1,
    flexDirection:'column',
  }
  
});