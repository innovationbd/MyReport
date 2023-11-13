import { ScrollView, StyleSheet, Text, View,TextInput, Alert, Modal, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import storage from '../../storage';
import { API } from '../../api-service';
import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";


const Reviewee = (props) => {

  const [showModal,setshowModal]=useState(false);

  const [status, setStatus] = useState(undefined); // For message

  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 

  const [alluser, setAlluser] = useState([]);
  const [ruser, setRuser] = useState([]);
  const [rname, setRname] = useState([]);
  const [data, setData] = useState([]);
  const [currentAdvices, setCurrentAdvices] = useState([]);
  const [currentAdvice, setCurrentAdvice] = useState([]);
  const [indexAdvice, setIndexAdvice] = useState(0);
  const [filterVal, seFilterVal] = useState([]);
  const [filterCon, setFilterCon] = useState([]);

  // const [time, setTime] = useState("");
  const [reviewee, setReviewee] = useState(null);
  const [counsellor, setCounsellor] = useState(user);
  const [advice, setAdvice] = useState("");
  const [reviweeUser, setReviweeData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [processingCount, setProcessingCount] = useState(0);
  const maxProcessingTime = 15; //if 15 second waiting time, then network problem

  const [disable, setDisable] = useState('disabled');
  const countries = ["Abdul Hamid", "Abul Hasan", "Nasir Uddin", "Abdul Hadi","Riyaz Alom","Khalid Hossain"]
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [open, setOpen] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [month, setMonth] = useState(null);
  const [items, setItems] = useState([
    {label: 'January', value: '01'},
    {label: 'February', value: '02'},
    {label: 'March', value: '03'},
    {label: 'April', value: '04'},
    {label: 'May', value: '05'},
    {label: 'June', value: '06'},
    {label: 'July', value: '07'},
    {label: 'August', value: '08'},
    {label: 'September', value: '09'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'}
  ]);
  const [year1, setYear1] = useState(null);
  const year = '2023'; //set 2023 for now

  const cY = moment(Date()).format('YYYY');  //currentYear
  const cM = moment(Date()).format('MM');  //currentMonth
  const cD = moment(Date()).format('DD');  //currentDateOnly
  
  const [itemsYear, setItemsYear] = useState([
    {label: Number(year)-1, value: Number(year)-1},
    {label: Number(year), value: Number(year)},
    {label: Number(year)+1, value:  Number(year)+1},
  ]);

  const setRstorage = () => {
    var userR = {
      username: rname[reviewee],
      userid: reviewee,
      token: token
    };
    storage.save({
      key: 'reviewee', // Note: Do not use underscore("_") in key!
      id: '1002', // Note: Do not use underscore("_") in id!
      data: userR,
      expires: 1000 * 3600 * 24
    });
  }

  useEffect(() => {
    storage.load({
      key: 'user',
      id: '1001'
    })
    .then(ret => {
      setToken(ret.token);
      setUser(ret.userid);
      setCounsellor(ret.userid);
      setMonth(cM);
      setYear1(Number(cY));
    });   
  }, []);

  useEffect(() => {
    setRstorage();
  }, [reviewee, filterCon]);

  const fetchAdvice = () => {
    API.getAdvices(token)
    .then((res) => {
        const filterRes = res.length? res.filter((item) => item.counsellor == counsellor) : 0;
        if(filterRes) {
          setFilterCon(filterRes.reverse());
        }
    });
  };

  /*const selectAdvices = () => {
    const selAdvice = filterCon ? filterCon.filter((item) => item.reviewee == reviewee) : 0;
    if(selAdvice) {
      setCurrentAdvices(selAdvice);
      setCurrentAdvice(selAdvice[0]);
      setIndexAdvice(0);
    }
  };*/

  /*const selectAdvice = (i) => {
    var ind = indexAdvice+i;
    if(ind >= currentAdvices.length) {
      ind = 0;
    } else if(ind < 0) {
      ind = currentAdvices.length-1;
    }
    setCurrentAdvice(currentAdvices[ind]);
    setIndexAdvice(ind);
  };*/

  const fetchUsers = () => {
    API.getUsers(token)
    .then( resp =>  setAlluser(resp))
    .catch (error => console.log(error));
  };

  //to get all reviewee list
  const revieweeList = () => {
    const rvwlist = alluser.length ? alluser.filter((item) => item.user == user)[0].reviewee : null;
    setReviweeData(rvwlist);
  };

  //to get full info of all reviewees
  const getReviewee = () => {
    const rvw =  alluser.length && reviweeUser ? alluser.filter((r) => reviweeUser.includes(r.id)) : null;
    setRuser(rvw);
    /*const target = {0 : 'Name'};
    rvw.map((item) => {
      var id = item.id;
      var name = item.firstName;
      var source = {a : name};
      var returnedTarget = Object.assign(target, source);
      setRname(target);
      console.log(rname);
    });*/
    
  }

  //get full name of reviewees
  const sName = () => {
    const uname = {};
    if(ruser) {
      ruser.map((item) => {
        /*uname.push(item.firstName);
        uid.push(item.id);*/
        uname[item.user]= item.firstName==null?item.id:item.firstName+" "+item.lastName;
        setRname(uname);
      });
    }
  }

  useEffect(() => {
    fetchAdvice();
  },[]);

  setTimeout(() => {
    if(!filterCon.length) {
      fetchAdvice();
    } 
    if(!alluser.length) {
      fetchUsers();
    }
    if(!reviewee) {
      setRstorage();
    }
  }, 500);

  useEffect(() => {
    revieweeList();
    getReviewee();
    if(filterCon.length) {
      setCurrentAdvice(filterCon[0]);
      console.log(currentAdvice);
    }
    //console.log(filterCon.length ? filterCon[0].advice : 'NR');
    //console.log(reviweeUser);
    //console.log(ruser);
  },[filterCon, alluser]);

  useEffect(() => {
    sName();
    //console.log(ruser) ;
  },[ruser]);

  useEffect(() => {
    if(!reviewee) {
      setReviewee(currentAdvice.reviewee);
    }
  },[currentAdvice]);

  /*useEffect(() => {
    if(reviewee) {
      selectAdvices();
    }
  },[reviewee, filterCon]);*/

  useEffect(() => {
    setCurrentAdvices(filterCon);
  }, [filterCon]);

  function selectAdvices(id){
    const selAdvice = filterCon ? filterCon.filter((item) => item.reviewee == id) : 0;
    if(selAdvice) {
      setCurrentAdvices(selAdvice);
      //setCurrentAdvice(selAdvice[0]);
      //setIndexAdvice(0);
    }
  };

  useEffect(() => {
    if(filterCon.length > 0 && alluser.length > 0) {
      setLoading(false);
    } 
  }, [filterCon, alluser]);

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
    Alert.alert('Network Error!', 'Please check your network connection and Try Again. If the problem still persist, please logout, close the app, and login again.', [
      {text: 'DISMISS', onPress: () => {
        setProcessing(false);
        setLoading(false);
      }},
    ]);
  }

  const prevDay = () => {
    const prev = moment(selectedDate).subtract(1, 'days');
    setSelectedDate(new Date(prev));
  }
  const nextDay = () => {
    const nxt = moment(selectedDate).add(1, 'days');
    if(nxt <= moment()) {
      setSelectedDate(new Date(nxt));
    }
  }

  const seeLargeAdvice = () =>
    Alert.alert(rname[reviewee], currentAdvice.advice, [ 
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const maxLength = 15;
  const maxAdviceLength = 100;

  function truncateName(name)  {
   if(name) {
    if(name.length <= maxLength) {
      return name;
    }
    else {
      if(name.lastIndexOf(' ')==-1) {
        var shortname = name.substring(0,name.lastIndexOf('.'));
        return truncateName(shortname);
      }
      else {
        var shortname = name.substring(0,name.lastIndexOf(' '));
        return truncateName(shortname);
      }
    }
   }
  }
  function truncateAdvice(advice)  {
    if(advice.length <= maxAdviceLength) {
      return advice;
    }
    else {
      return advice.substring(0,maxAdviceLength)+' ...';
    }
  }

  function getName(userid) {
    const usr = alluser.length ? alluser.filter((item) => item.user == userid)[0] : null;
    if(usr) {
      return usr.firstName==null ? usr.id : usr.firstName+" "+usr.lastName;
    } else {
      return ' ';
    }
  }

  const sendAdvice = () => {
    setProcessing(true);
    setshowModal(false);
    const data = {
      reviewee,
      counsellor,
      advice,
      };
          API.createAdvice(data, token)
          .then( resp => {
            setProcessing(false);
              console.log(resp);
              if(resp.counsellor == counsellor) {
                fetchAdvice();
                Alert.alert(rname[reviewee], 'Advice sent!', [
                  {text: 'OK', onPress: () => setAdvice(null)},
                ]);
              }
              else {
                Alert.alert(rname[reviewee], 'Sending Failed!', [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
              }
          })
          .catch(error => {
            setProcessing(false);
              //console.log(error);
              //Alert.alert("Error", "Report Not Added", "warning");
              Alert.alert(rname[reviewee], 'Sending Error!', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
          });
      
  } 


  return (
    <ScrollView>

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
      <View style={styles.fullPart}>
        <View style={styles.upperPart}>
          <View style={styles.upperPartRow}>
            <Text style={styles.counselor}>Reviewee List</Text>

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
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  style={styles.counselorList}
            />

          </View>
        </View>
          <ScrollView style={styles.upperPartList}>
            { 
            ruser ? (
              ruser.map((item) => {
                return (
                    <View style={styles.counselor_name}>
                      <Text style={styles.name_list}>{rname ? rname[item.id] : ''}</Text>
                      <Text style={styles.advices} onPress={() => {
                        setReviewee(item.id);
                        selectAdvices(item.id)
                      }}>Select</Text>
                    </View>
                )
              })
            ) : (
              <View style={styles.counselor_name}>
                <Text style={styles.name_list}>Reviewee List Empty</Text>
              </View>
            )}
          </ScrollView>

        
        

        <View style={styles.lowerPart}>
          {/*<View style={styles.lowerPartRow}>
            <View style={styles.rowMonthYear}>
              <Text style={styles.prevdate} onPress={prevDay}>{'<'}</Text>
              <DropDownPicker
                open={open}
                value={month}
                items={items}
                setOpen={setOpen}
                setValue={setMonth}
                setItems={setItems}
                placeholder="Month"
                style={styles.select_month}
                containerStyle={{width: 100, height: 60}}
              />
              
              <Text style={styles.nextdate} onPress={nextDay}>{'>'}</Text>

              <DropDownPicker
                open={openYear}
                value={year1}
                items={itemsYear}
                setOpen={setOpenYear}
                setValue={setYear1}
                setItems={setItemsYear}
                placeholder="Year"
                style={styles.select_month1}
                containerStyle={{width: 100, height: 60}}
              />
            </View>
          </View>*/}
          <Text style={styles.viewReport} onPress={() => {
            props.navigation.navigate('AccomplishmentR', {name: 'AccomplishmentR'});
            }}>
              View Report
          </Text>
          <Text style={styles.viewReport1}
          onPress={() => {
            setshowModal(true);
          }}
          
          >Write Review</Text>
          <Modal 
          transparent={true} 
          visible={showModal} 
          onRequestClose={() => setshowModal(false) }
          >
          <TouchableOpacity style={styles.modalContainer} onPress={() => setshowModal(false)} >
                  <TouchableOpacity style={styles.modal} activeOpacity={1} >
                  <View style={styles.lowerlowerPart}>
                    <Text style={styles.write_review}>Write Review</Text>
                    <TextInput
                      multiline={true}
                      placeholder={'Write review to ' + truncateName(rname[reviewee])}
                      style={styles.write_review1}
                      onChangeText = {setAdvice}
                      value = {advice}
                    />
                    <Text style={styles.view} onPress={sendAdvice}>Send</Text>
                  </View>
                  </TouchableOpacity>
              </TouchableOpacity>
          </Modal> 
        </View>

        {/* 
        <View style={styles.lowerlowerPart}>
            <Text style={styles.write_review}>Write Review</Text>
            <TextInput
              multiline={true}
              placeholder={'Write review to ' + truncateName(rname[reviewee])}
              style={styles.write_review1}
              onChangeText = {setAdvice}
              value = {advice}
            />
          <Text style={styles.view} onPress={sendAdvice}>Send</Text>
        </View>
        */}
        <View>
          
        <View style={styles.counselor_name_advices}>
          <Text style={styles.last_advices}>Reviews Sent</Text>
          <Text style={styles.alladvices} onPress={() => {
                        setCurrentAdvices(filterCon);
                      }}>See All Reviews</Text>
        </View>
        
        {/*<View style={styles.middlepart}>
        
          <View style={styles.middlepartRow}>
          <View style={styles.comment_row}>
            <Text style={styles.reviewee_info}>{reviewee ? truncateName(rname[reviewee]) : 'No Reviewee'}</Text>
            <View style={styles.comment}>
              <Text style={styles.prevcmnt} onPress={() => { selectAdvice(-1); }}>{'<'}</Text>
            
                <Text style={styles.comment_number}>
                  {reviewee && currentAdvice ? currentAdvice.time.substring(0, 10)+' ' : '     '} 
                  @ {reviewee && currentAdvice ? currentAdvice.time.substring(11, 16) : '     '}
                </Text>
              
              <Text style={styles.nextcmnt} onPress={() => { selectAdvice(1); }}>{'>'}</Text>
            </View>
            </View>
            <Text style={styles.reviewee_info1}>{reviewee && currentAdvice ? truncateAdvice(currentAdvice.advice) : 'No Comment'}</Text>
            {
              currentAdvice ? (
                currentAdvice.advice ? (
                  currentAdvice.advice.length >= maxAdviceLength ? (
                  <Text style={styles.seeMore} onPress={seeLargeAdvice}>... See more</Text>
                ) : ('')
                ) : ('')
              ) : ('')
              
            }
            {/*<Text style={styles.reviewee_info2}>Associate, Since 2021</Text>*/}
         {/*} </View>
        </View>*/}

        <ScrollView style={styles.middlepart}>
        { 
            currentAdvices ? (
              currentAdvices.map((item) => {
                return (
                  <View style={styles.middlepartrow}>
                    <Text style={styles.reviewee_info}>{getName(item.reviewee)}</Text>
                    <Text style={styles.advice_time}>
                      {item.time.substring(0, 10)+' '} 
                      @ {item.time.substring(11, 16)}
                    </Text>
                    <Text style={styles.reviewee_info1}>{item.advice}</Text>
                    {/*<Text style={styles.seeMore}>See More...</Text>*/}
                  
                </View>
                )
              })
            ) : (
              <View style={styles.middlepartrow}>
                <Text style={styles.reviewee_info}>No review sent yet.</Text>
              </View>
            )}
        </ScrollView>

      </View>
      </View>
    </ScrollView>
    
  )
}

export default Reviewee

const styles = StyleSheet.create({
  fullPart:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#cfe4f2'
  },
  upperPart:{
    flex:2,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    marginBottom:0,
  },
  upperPartList:{
    flex:2,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    marginBottom:5,
    height:187
  },
  middlepart:{
    flex:1,
    flexDirection:'column',
    
    height: 270
  },
  middlepartrow:{
    flex:1,
    flexDirection:'column',
    marginTop:10,
    marginLeft:10,
    marginBottom:0,
    marginRight:10,
    backgroundColor:'white',
    borderRadius:15,
    borderWidth:2,
    borderColor:'#39b549',
    minHeight: 80
  },
  lowerPart:{
    flex:2,
    flexDirection:'row',
    marginTop:0,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'white',
    borderWidth:2,
    borderColor:'#39b549',
    borderBottomLeftRadius:14,
    borderBottomRightRadius:14,
    position:'relative'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 350,
    height: 200
  },
  counselor_name_advices:{
    flex:1,
    flexDirection:'row',
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#0070bb',
    fontSize:20,
    color:'black',
    textAlignVertical:'center',
    verticalAlign:'middle',
    alignItems:'center',
    marginTop:5,
    height:60,
    borderColor:'#0070bb',
    borderTopLeftRadius:14,
    borderTopRightRadius:14,
  },
  last_advices:{
    flex:1,
    backgroundColor:'green',
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    textAlign:'auto',
    textAlignVertical:'center',
    height:60,
    padding:10,
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
  lowerlowerPart:{
    flex:2,
    flexDirection:'column',
    marginLeft:10,
    marginBottom:10,
    marginRight:10,
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'#39b549',
    borderRadius:14,
    height: 150,
    position:'relative'
  },
  upperPartRow:{
    flexDirection:'row',
  },
  lowerPartRow:{
    flex:1,
    flexDirection:'row',
  },
  lowerPartRow1:{
    flex:1,
    flexDirection:'row',
    borderRadius:1,
    borderColor:'#39b549'
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  centeredView1: {
    height:50,
    width:40,
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
    backgroundColor:'green',
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical:'center',
    borderTopLeftRadius:10,
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
  counselorList:{
    flex:1,
    borderWidth:2,
    borderColor:'#39b549'
  },
  advices:{
    flex:0.7,
    flexDirection:'column',
    backgroundColor:'#39b549',
    color:'white',
    fontSize:15,
    textAlign:'center',
    textAlignVertical:'center',
    marginLeft:100,
    marginRight:10,
    height:30,
    borderRadius:5,
    position:'absolute',
    right:5,
    bottom:10,
    padding:5
  },
  view:{
    backgroundColor:'#39b549',
    color:'white',
    fontSize:15,
    textAlign:'center',
    textAlignVertical:'center',
    marginLeft:270,
    marginBottom:10,
    height:30,
    width:60,
    borderRadius:5,
    //position:'relative',
    //margin:10
    position: 'absolute',
    right: 5,
    bottom: 5
  },
  viewReport:{
    backgroundColor:'#39b549',
    color:'white',
    fontSize:20,
    textAlign:'center',
    textAlignVertical:'center',
    margin: 10,
    height:50,
    borderRadius:5,
    position:'relative',
    padding: 10
  },
  viewReport1:{
    backgroundColor:'#39b549',
    color:'white',
    fontSize:20,
    textAlign:'center',
    textAlignVertical:'center',
    margin: 10,
    height:50,
    borderRadius:5,
    position:'absolute',
    right: 5,
    padding: 10
  },
  seeMore:{
    backgroundColor:'#39b549',
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
  report:{
    flex:1,
    flexDirection:'row',
    padding:10,
    fontSize:20
  },
  write_review:{
    flexDirection:'row',
    padding:10,
    fontSize:20,
  },
  write_review1:{
    flexDirection:'row',
    padding:10,
    fontSize:20,
  },
  rowMonthYear: {
    flex:2,
    flexDirection: 'row',

  },
  name_list:{
    flex:1,
    backgroundColor:'white',
    color:'black',
    fontSize:20,
    marginLeft:5

  },
  reviewee_info:{
    fontSize:20,
    fontWeight:'bold',
    flexDirection:'row',
    paddingLeft: 3
  },
  reviewee_info1:{
    flexDirection:'row',
    fontSize:20,
    color:'black',
    paddingLeft: 3,
    paddingTop:5,
    marginBottom: 15
  },
  reviewee_info2:{
    fontSize:30,
    flexDirection:'row'
  },
  select_month:{
    height:30,
    borderColor:'#79c52c',
    borderRadius:0
  },
  select_month1:{
    height:30,
    borderColor:'#79c52c',
    borderRadius:20,
  },
  prevdate:{
    height:50,
    width:20,
    backgroundColor:'#79c52c',
    textAlign:'center',
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    marginBottom: 10,
    fontSize: 30,
    color: 'white'
  },
  nextdate:{
    height:50,
    width:20,
    backgroundColor:'#79c52c',
    textAlign:'center',
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    marginBottom: 10,
    fontSize: 30,
    color: 'white'
  },
  prevcmnt:{
    height:30,
    width:20,
    backgroundColor:'#79c52c',
    textAlign:'center',
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    marginBottom: 10,
    fontSize: 20,
    color: 'white'
  },
  nextcmnt:{
    height:30,
    width:20,
    backgroundColor:'#79c52c',
    textAlign:'center',
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    marginBottom: 10,
    fontSize: 20,
    color: 'white'
  },
  middlepartRow:{
    flex:1,
    flexDirection:'column',
    position: 'relative'
  },
  comment: {
    flex:2,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0
  },
  comment_row:{
    flexDirection:'row',
  },
  comment_number:{
    height:30,
    borderColor:'#79c52c',
    borderBottomColor: 'green',
    borderWidth: 1,
    color:'black',
    textAlignVertical:'center',
    fontSize:15,
    padding: 3
  },
  advice_time:{
    backgroundColor:'white',
    color:'#1f734d',
    fontWeight:'bold',
    fontSize:15,
    paddingLeft: 5
  },

  
})