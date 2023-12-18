import { StyleSheet, Text, View, Modal, Alert, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import storage from '../../storage';
import { API } from '../../api-service';
import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";


const Counselor = () => {

  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 

  const [alluser, setAlluser] = useState([]);
  const [cuser, setCuser] = useState([]);
  //const [cname, setCname] = useState([]);

  const [advice, setAdvice] = useState("");
  
  const [searchApiData, setsearchApiData] = useState([]);
  const [filterVal, seFilterVal] = useState("");
  const [filterCon, setFilterCon] = useState([]);

  const [currentAdvices, setCurrentAdvices] = useState([]);

  const [cunsellorUser, setCounsellorData] = useState([]);
  const [counsellor, setCounsellor] = useState([]);
  const [reviewee, setReviewee] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const maxProcessingTime = 15; //if 15 second waiting time, then network problem


  const countries = ["Abdul Hamid", "Abul Hasan", "Nasir Uddin", "Abdul Hadi","Riyaz Alom","Khalid Hossain"]
  const [searchQuery, setSearchQuery] = useState("");
  //const onChangeSearch = query => setSearchQuery(query);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error,setError] = useState(null);
  const [fullData, setFullData] = useState("");
  const [userInput,setUserInput] = useState("");
  useEffect(() => {
    storage.load({
      key: 'user',
      id: '1001'
    })
    .then(ret => {
      setToken(ret.token);
      setUser(ret.userid);
      setReviewee(ret.userid);
      //setMonth(cM);
      //setYear1(Number(cY));
    });   
  }, []);

  const fetchUsers = () => {
    API.getUsers(token)
    .then( resp =>  setAlluser(resp))
    .catch (error => console.log(error));
  };

  //to get all counsellor list to this user
  const counsellorList = () => {
    const cnslist = alluser.length ? alluser.filter((item) => item.user == user)[0].counsellor : null;
    setCounsellorData(cnslist);
  };

  //to get full info of all counsellors
  const getCounsellor = () => {
    const cns =  alluser.length && cunsellorUser ? alluser.filter((c) => cunsellorUser.includes(c.id)) : null;
    setCuser(cns);
  }

  //get full name of counsellors
  /*const sName = () => {
    const uname = {};
    if(cuser) {
      cuser.map((item) => {
        uname[item.user]= item.firstName==null?item.id:item.firstName+" "+item.lastName;
        setCname(uname);
      });
    }
  }*/

  function getName(userid) {
    const usr = alluser.length ? alluser.filter((item) => item.user == userid)[0] : null;
    if(usr) {
      return usr.firstName==null ? usr.id : usr.firstName+" "+usr.lastName;
    } else {
      return ' ';
    }
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  setTimeout(() => {
    if(!filterCon.length) {
      fetchAdvice();
    }
    if(!alluser.length) {
      fetchUsers();
    }
  }, 500);

  useEffect(() => {
    if(filterCon.length > 0 && alluser.length > 0) {
      setLoading(false);
    } 
  }, [filterCon, alluser]);
  
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

  useEffect(() => {
    counsellorList();
    console.log(alluser.length);
  }, [alluser]);

  useEffect(() => {
    getCounsellor();
    console.log(cunsellorUser);
  }, [cunsellorUser]);

  /*useEffect(() => {
    sName();
  }, [cuser]);*/

  useEffect(() => {
    setCurrentAdvices(filterCon);
  }, [filterCon]);

  useEffect(() => {
    //selectAdvices();
    console.log(currentAdvices);
  }, [currentAdvices]);

  const fetchAdvice = () => {
    API.getAdvices(token)
    .then((res) => {
        const filterRes = res.length? res.filter((item) => item.reviewee == reviewee) : 0;
        if(filterRes) {
          setFilterCon(filterRes.reverse());
        }
    });
  };

  function selectAdvices(id){
    const selAdvice = filterCon ? filterCon.filter((item) => item.counsellor == id) : 0;
    if(selAdvice) {
      setCurrentAdvices(selAdvice);
      //setCurrentAdvice(selAdvice[0]);
      //setIndexAdvice(0);
    }
  };

  const filterData = (item) =>{

    if(getName(item).toLowerCase().includes(userInput.toLowerCase())){
      return (
        
                
                    <View style={styles.counselor_name}>
                      <Text style={styles.name_list}>{getName(item)}</Text>
                      <Text style={styles.advices} onPress={() => {
                        selectAdvices(item);
                      }}>See Advices</Text>
                    </View>
                
              
      )
    }
  }


  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >
    <View style={styles.fullPart}>
      <View style={styles.upperPart}>
        <View style={styles.upperPartRow}>
          <Text style={styles.counselor}>Counselors List</Text>
          {/* 
          <SelectDropdown
            style={styles.counselorList}
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
          */}
          <Searchbar
                  placeholder="Search"
                  onChangeText={(text) => setUserInput(text)}
                  value={userInput}
                  style={styles.counselorList}  
          />
        </View>
        <ScrollView style={styles.upperPartList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          >
        <FlatList
          data={cunsellorUser}
          renderItem={({item, index}) => filterData(item)}
        /></ScrollView>

      </View>

      <View style={styles.lowerPart}>
        <View style={styles.counselor_name_advices}>
          <Text style={styles.last_advices}>Advices</Text>
          <Text style={styles.alladvices} onPress={() => {
                        setCurrentAdvices(filterCon);
                      }}>See All Advices</Text>
        </View>

        <ScrollView style={styles.lowerPartList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >
        { 
            currentAdvices ? (
              currentAdvices.map((item) => {
                return (
                  <View style={styles.lowerPartRow}>
                  <View style={styles.advice_row}>
                    <Text style={styles.counsellor_info}>{getName(item.counsellor)}</Text>
                    <Text style={styles.advice_time}>
                      {item.time.substring(0, 10)+' '} 
                      @ {item.time.substring(11, 16)}
                    </Text>
                    <Text style={styles.advice_detail}>{item.advice}</Text>
                    {/*<Text style={styles.seeMore}>See More...</Text>*/}
                  </View>
                </View>
                )
              })
            ) : (
              <View style={styles.advice_row}>
                <Text style={styles.counsellor_info}>No advices</Text>
              </View>
            )}
        </ScrollView>

      </View>
    </View>
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

export default Counselor;

const styles = StyleSheet.create({
  fullPart:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#fdeded'
  },
  upperPart:{
    flex:1,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
  },
  lowerPart:{
    flex:1,
    flexDirection:'column',
    marginTop:0,
    marginLeft:10,
    marginBottom:10,
    marginRight:10,
  },
  upperPartList:{
    flex:2,
    marginTop:10,
    marginLeft:2,
    marginRight:2,
    marginBottom:20,
    height:187
  },
  lowerPartList:{
    flex:2,
    marginTop:10,
    marginLeft:2,
    marginRight:2,
    marginBottom:20,
    height:290
  },
  upperPartRow:{
    flexDirection:'row',
  },
  lowerPartRow:{
    flex:1,
    flexDirection:'row',
    position: 'relative'
  },
  advice_row:{
    flex:1,
    flexDirection:'column',
    marginTop:10,
    marginLeft:1,
    marginBottom:10,
    marginRight:1,
    backgroundColor:'white',
    borderRadius:15,
    borderWidth:2,
    borderColor:'#1d70b8',
    height: 125
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
  counselor:{
    flex:1,
    backgroundColor:'#36a9e0',
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center'
  },
  counselor_name:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'white',
    fontSize:20,
    color:'black',
    textAlignVertical:'center',
    verticalAlign:'middle',
    alignItems:'center',
    marginTop:5,
    height:60,
    position:'relative'
  },
  counselor_name_advices:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'#0070bb',
    fontSize:20,
    color:'black',
    textAlignVertical:'center',
    verticalAlign:'middle',
    alignItems:'center',
    marginTop:5,
    height:60,
  },
  counselorList:{
    flex:1,
    borderWidth:1,
    borderColor:'#36a9e0'
  },
  advices:{
    flex:1,
    backgroundColor:'#0070bb',
    color:'white',
    fontSize:15,
    textAlign:'center',
    textAlignVertical:'center',
    height:30,
    borderRadius:5,
    position:'absolute',
    padding:5,
    right:10, 
    bottom:10,
  },
  alladvices:{
    flex:1,
    backgroundColor:'white',
    color:'black',
    fontSize:15,
    textAlign:'center',
    textAlignVertical:'center',
    marginLeft:100,
    marginRight:10,
    height:30,
    padding:5,
    borderRadius:5,
    position:'absolute',
    right:10,
    bottom:10,
  },
  seeMore:{
    backgroundColor:'#0070bb',
    color:'white',
    fontSize:15,
    textAlign:'center',
    textAlignVertical:'center',
    marginLeft:10,
    height:30,
    borderRadius:5,
    padding: 5,
    position: 'absolute',
    right: 5,
    bottom: 5
  },
  name_list:{
    flex:1,
    backgroundColor:'white',
    color:'black',
    fontSize:20,
    marginLeft:5

  },

  comment_row:{
    flexDirection:'row',
  },

  counsellor_info:{
    fontSize:20,
    fontWeight:'bold',
    flexDirection:'row',
    paddingLeft: 3
  },
  advice_list:{
    backgroundColor:'white',
    color:'black',
    fontSize:10,
  },
  advice_time:{
    backgroundColor:'white',
    color:'#1f734d',
    fontWeight:'bold',
    fontSize:15,
    paddingLeft: 5
  },
  advice_detail:{
    flexDirection:'row',
    fontSize:20,
    color:'black',
    paddingLeft: 3,
    marginBottom: 15
  },
  last_advices:{
    flex:1,
    backgroundColor:'#1d70b8',
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    textAlign:'auto',
    textAlignVertical:'center',
    height:60,
    padding:10,
  },
  
  
})