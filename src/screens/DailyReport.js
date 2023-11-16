import React, {useEffect, useState} from 'react';
import { Button,StyleSheet,View,Text,SafeAreaView,Alert, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import CheckBox from 'expo-checkbox';
import { ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import storage from '../../storage';
import { API } from '../../api-service';
import moment from 'moment/moment';
import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";
//import Swal from 'sweetalert2';

  
const DailyReport = () => {

  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 

  const [isSelected, setSelection] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  //const [date, setDate] = useState(moment(selectedDate).format('YYYY-MM-DD'));
  const date=moment(selectedDate).format('YYYY-MM-DD');
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  //const cY = selectedDate.getFullYear();

  const [quranStudy, setQuranStudy] = useState(null);
  const [hadithStudy, setHadithStudy] = useState(null);
  const [bookStudy, setBookStudy] = useState(null);
  const [lectureListening, setLectureListening] = useState(null);
  const [salat, setSalat] = useState(null);
  const [dawahProgram, setDawahProgram] = useState(null);
  const [memberContact, setMemberContact] = useState(null);
  const [socialWork, setSocialWork] = useState(null);
  const [dawahMaterial, setDawahMaterial] = useState(null);
  const [distribution, setDistribution] = useState(null);
  const [familyMeeting, setFamilyMeeting] = useState(null);
  const [orgProgram, setOrgProgram] = useState(null);
  const [orgTime, setOrgTime] = useState(null);
  const [physicalExercise, setPhysicalExercise] = useState(null);
  const [selfCriticism, setSelfCriticism] = useState(null);
  const [comment, setComment] = useState(null);

  const tm = "02:48";

  const [allreports, setAllreports] = useState([]);
  const [reportid, setReportid] = useState(0);

  const [gotreport, setGotreport] = useState(false);
  const [gotVal, setGotVal] = useState(false);
  const [TP, setTP] = useState(false);
  const [socialWorkTP, setSocialWorkTP] = useState(false);
  const [orgTimeTP, setOrgTimeTP] = useState(false);
  const [physicalExerciseTP, setPhysicalExerciseTP] = useState(false);
  const [reportlength, setP] = useState(100);
  const hm="";

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [processingCount, setProcessingCount] = useState(0);
  const maxProcessingTime = 15; //if 15 second waiting time, then network problem

  const maxHour = 23; //the maximum number that can be taken as hour input

  const getReport = () => {
    setGotVal(false);
    console.log('allreport length outside '+allreports.length);
    if(allreports.length>0) {
        console.log('allreport length'+allreports.length);
        console.log(allreports[allreports.length-1].user);
        const report = allreports ? allreports.filter((item) => item.date == date && item.user == user) : null;
        setP(report.length);
        console.log('report length'+report.length);
        if(report.length != 0) {
            setReportid(report[0].id);
            console.log(report[0].quranStudy);
            //setQuranStudy(report.map((item) => item.quranStudy));
            setQuranStudy(report[0].quranStudy == null ? NaN : report[0].quranStudy);
            setHadithStudy(report[0].hadithStudy == null ? NaN : report[0].hadithStudy);
            setBookStudy(report[0].bookStudy == null ? NaN : report[0].bookStudy);
            setLectureListening(report[0].lectureListening == null ? NaN : report[0].lectureListening);
            setSalat(report[0].salat == null ? NaN : report[0].salat);
            setDawahProgram(report[0].dawahProgram == null ? NaN : report[0].dawahProgram);
            setMemberContact(report[0].memberContact == null ? NaN : report[0].memberContact);
            setSocialWork(report[0].socialWork == null ? NaN : report[0].socialWork);
            setDawahMaterial(report[0].dawahMaterial == null ? NaN : report[0].dawahMaterial);
            setDistribution(report[0].distribution == null ? NaN : report[0].distribution);
            setFamilyMeeting(report[0].familyMeeting == null ? NaN : report[0].familyMeeting);
            setOrgProgram(report[0].orgProgram == null ? NaN : report[0].orgProgram);
            setOrgTime(report[0].orgTime == null ? NaN : report[0].orgTime);
            setPhysicalExercise(report[0].physicalExercise == null ? 0 : report[0].physicalExercise);
            setSelfCriticism(report[0].selfCriticism == null ? 0 : report[0].selfCriticism);
            setComment(report[0].comment == null ? '' : report[0].comment);
        }
        else {
            setReportid(0);
            setQuranStudy(NaN);
            setHadithStudy(NaN);
            setBookStudy(NaN);
            setLectureListening(NaN);
            setSalat(NaN);
            setDawahProgram(NaN);
            setMemberContact(NaN);
            setSocialWork(NaN);
            setDawahMaterial(NaN);
            setDistribution(NaN);
            setFamilyMeeting(NaN);
            setOrgProgram(NaN);
            setOrgTime(NaN);
            setPhysicalExercise(NaN);
            setSelfCriticism(0);
            setComment('');
        }
    }
    setGotVal(true);
  }

  useEffect(() => {
      API.getReports(token)
      .then( resp =>  setAllreports(resp))
      .catch (error => console.log(error));
      //setSelectedDate(new Date());
  }, [gotreport]);


    setTimeout(() => {
      if(!allreports.length) {
        API.getReports(token)
        .then( resp =>  setAllreports(resp))
        .catch (error => console.log(error))
      } 
    }, 500);

    useEffect(() => {
      if(allreports.length > 0) {
        setLoading(false);
      } 
    }, [allreports]);

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

  useEffect(() => {
      getReport();
      console.log(date);
  }, [allreports, date]);

  function twoDigit(num) {
      return num<10 ? "0"+num : num;
  }
  function time2float(time) {
      var t = time.split(":");
      var fnum = Number(t[0]) + Number(t[1])/60;
      return fnum;
  }
  function float2time(fnum) {
      var t0 = Math.trunc(fnum);
      var t1 = twoDigit(Math.round((fnum-t0)*60));
      return t0 + ":" + t1;
  }

  function float2hour(fnum) {
    var t0 = Math.trunc(fnum);
    return t0.toString();
  }
  function float2min(fnum) {
    var t0 = Math.trunc(fnum);
    var t1 = twoDigit(Math.round((fnum-t0)*60));
    return t1.toString();
  }

  const changeLectureListening = (e) => {
    setLectureListening(time2float(e));
    setTP(false);
  }
  const changeSocialWork = (e) => {
      setSocialWork(time2float(e));
      setSocialWorkTP(false);
  }
  const changeOrgTime = (e) => {
      setOrgTime(time2float(e));
      setOrgTimeTP(false);
  }
  const changePhysicalExercise = (e) => {
      setPhysicalExercise(time2float(e));
      setPhysicalExerciseTP(false);
  }

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

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
  const prevDay1 = () => {
    console.log(selectedDate.getDate()-1);
  }

  const numericText = (text, min, max) => {
    let newText = '';
    let numbers = '0123456789';
  
    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
            newText = Number(newText)>max ? max.toString() : newText;
            newText = Number(newText)<min ? min.toString() : newText;
        }
    }
    return newText;
  }
  const num2string = (num) => {
    return num ? num.toString() : num;
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
      console.log(ret.token);
    });   
  }, []);

  const createButtonAlert = () =>
    Alert.alert('Alert Title', 'Adding Report Succesfull.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

    const sbbutton = () => {
      setProcessing(true);

      const data = {
          user,
          date,
          quranStudy,
          hadithStudy,
          bookStudy,
          lectureListening,
          salat,
          dawahProgram,
          memberContact,
          socialWork,
          dawahMaterial,
          distribution,
          familyMeeting,
          orgProgram,
          orgTime,
          physicalExercise,
          selfCriticism,
          comment
        };
        if(reportid == 0) {
            API.createReport(data, token)
            .then( resp => {
                setProcessing(false);
                console.log(resp);
                if(resp.user == user) {
                  Alert.alert('Saved', 'Report added Succesfully.', [
                    {
                      text: 'Cancel',
                      //onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK'},
                  ]);
                  //Alert.alert("Success!", "Report successfully Added", "success");
                    setGotreport(!gotreport);
                }
                else {
                  Alert.alert('Failed', 'Report Not Added', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                  //Alert.alert("Error", "Report Not Added", "warning");
                }
            })
            .catch(error => {
                setProcessing(false);
                //console.log(error);
                //Alert.alert("Error", "Report Not Added", "warning");
                Alert.alert('Error', 'Report Not Added', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]);
            });
        }
        else {
            API.updateReport(reportid, data, token)
            .then( resp => {
              setProcessing(false);
                //console.log(resp);
                //console.log(data);
                if(resp.user == user) {
                  Alert.alert('Saved', 'Report successfully Updated!', [
                    {
                      text: 'Cancel',
                      //onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK'},
                  ]);
                  //Alert.alert("Success!", "Report successfully Updated", "success");
                    setGotreport(!gotreport);
                }
                else {
                  Alert.alert('Oops!', 'Report Not Updated!', [
                    {
                      text: 'Cancel',
                      //onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK'},
                  ]);
                  //Alert.alert("Error", "Report Not Updated", "warning");
                }
            })
            .catch(error => {
              setProcessing(false);
                //console.log(error);
                Alert.alert('Error!', 'Report Not Updated!', [
                  {
                    text: 'Cancel',
                    //onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK'},
                ]);
            });
        }
        
    } 

  return (
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#ddeacc", "#ddeacc"]}
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
      
      
      
      <View style={styles.rowMonthYear}>
      <Text style={styles.prevdate} onPress={prevDay}>{'<'}</Text>
      <Text style={styles.textdate} onPress={showDatePicker}>
          {date}
          {/*selectedDate ? selectedDate.getFullYear()+'-'+selectedDate.getMonth()+'-'+selectedDate.getDate() : 'No date selected'*/}
      </Text>
      <Text style={styles.nextdate} onPress={nextDay}>{'>'}</Text>
      </View>

      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date('2022-01-01')}
        maximumDate={new Date()}
      />

      <ScrollView style={{marginBottom: 10}}>

      <View style={styles.row}>
      <Text style={styles.leftpart1}>Quran Study (Ayahs) {TP}</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button1}
        keyboardType="numeric"
        onChangeText = {(text)=> setQuranStudy(numericText(text, 0, 6666))}
        value={num2string(quranStudy)}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Hadith Study (No.)</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button}
        keyboardType="numeric"
        onChangeText = {(text)=> setHadithStudy(numericText(text, 0, 10000))}
        value={num2string(hadithStudy)}                                    
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Islamic Book Study (Pages)</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button}
        keyboardType="numeric"
        onChangeText = {(text)=> setBookStudy(numericText(text, 0, 10000))}
        value={num2string(bookStudy)}  
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Lecture Listening (hh:mm)</Text>
      <TextInput 
        placeholder='hh'
        style={styles.button_lecture}
        keyboardType="numeric"
        onChangeText={(text) => 
          setLectureListening(lectureListening ? time2float(numericText(text,0,maxHour)+':'+float2min(lectureListening)) : numericText(text,0,maxHour))}
        value={lectureListening ?  (lectureListening.length>1 ? lectureListening : float2hour(lectureListening)) : ""}
      />
      <Text style={styles.colon_time}>:</Text>
      <TextInput 
        placeholder='mm'
        style={styles.button_lecture2}
        keyboardType="numeric"
        onChangeText={(text) =>
          setLectureListening(lectureListening ? time2float(float2hour(lectureListening)+':'+text) : time2float('0:'+text))}
        value={lectureListening ? (lectureListening.length>1 ? lectureListening : float2min(lectureListening)) : ""}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Salah in Jamayah (Waqt)</Text>
      <TextInput 
        placeholder='Waqt (0-5)'
        style={styles.button}
        keyboardType="numeric"
        onChangeText = {(text)=> setSalat(numericText(text, 0, 5))}
        value={num2string(salat)}  
      />
      </View>


      <View style={styles.row}>
      <Text style={styles.leftpart}>Dawah Program (No.)</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button}
        keyboardType="numeric"
        onChangeText = {(text)=> setDawahProgram(numericText(text, 0, 100))}
        value={num2string(dawahProgram)}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Personal Contact (No.)</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button}
        keyboardType="numeric"
        onChangeText = {(text)=> setMemberContact(numericText(text, 0, 100))}
        value={num2string(memberContact)}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Social Work (hh:mm)</Text>
      <TextInput 
        placeholder='hh'
        style={styles.button_lecture}
        onChangeText={(text) =>
          setSocialWork(socialWork ? time2float(numericText(text,0,maxHour)+':'+float2min(socialWork)) : numericText(text,0,maxHour))}
          value={socialWork ?  (socialWork.length>1 ? socialWork : float2hour(socialWork)) : ""}
        />
      <Text style={styles.colon_time}>:</Text>
      <TextInput 
        placeholder='mm'
        style={styles.button_lecture2}
        onChangeText={(text) =>
          setSocialWork(socialWork ? time2float(float2hour(socialWork)+':'+text) : time2float('0:'+text))}
          value={socialWork ? (socialWork.length>1 ? socialWork : float2min(socialWork)) : ""}
        />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Distribution (No.)</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button}
        keyboardType="numeric"
        onChangeText = {(text)=> setDistribution(numericText(text, 0, 1000))}
        value={num2string(distribution)}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Family Meeting (No.)</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button}
        keyboardType="numeric"
        onChangeText = {(text)=> setFamilyMeeting(numericText(text, 0, 100))}
        value={num2string(familyMeeting)}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Organization Program (No.)</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button}
        keyboardType="numeric"
        onChangeText = {(text)=> setOrgProgram(numericText(text, 0, 100))}
        value={num2string(orgProgram)}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Organization Time (hh:mm)</Text>
      <TextInput 
        placeholder='hh'
        style={styles.button_lecture}
        keyboardType="numeric"
        onChangeText={(text) =>
          setOrgTime(orgTime ? time2float(numericText(text,0,maxHour)+':'+float2min(orgTime)) : numericText(text,0,maxHour))}
          value={orgTime ?  (orgTime.length>1 ? orgTime : float2hour(orgTime)) : ""}
        />
      <Text style={styles.colon_time}>:</Text>
      <TextInput 
        placeholder='mm'
        style={styles.button_lecture2}
        keyboardType="numeric"
        onChangeText={(text) =>
          setOrgTime(orgTime ? time2float(float2hour(orgTime)+':'+text) : time2float('0:'+text))}
          value={orgTime ? (orgTime.length>1 ? orgTime : float2min(orgTime)) : ""}
        />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Physical Exercise (hh:mm)</Text>
      <TextInput 
        placeholder='hh'
        style={styles.button_lecture}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPhysicalExercise(physicalExercise ? time2float(numericText(text,0,maxHour)+':'+float2min(physicalExercise)) : numericText(text,0,maxHour))}
          value={physicalExercise ?  (physicalExercise.length>1 ? physicalExercise : float2hour(physicalExercise)) : ""}
        />
      <Text style={styles.colon_time}>:</Text>
      <TextInput 
        placeholder='mm'
        style={styles.button_lecture2}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPhysicalExercise(physicalExercise ? time2float(float2hour(physicalExercise)+':'+text) : time2float('0:'+text))}
          value={physicalExercise ? (physicalExercise.length>1 ? physicalExercise : float2min(physicalExercise)) : ""}
        />
      </View>
      
      <View style={styles.row}>
      <Text style={styles.leftpart}>Self Criticism</Text>
      <View style={styles.button}>
      <CheckBox
          style={styles.checkbox}
          value={selfCriticism ? true : false} 
          onValueChange={(e) => setSelfCriticism(Number(e))}
      /></View>
      </View>

      <TextInput 
        placeholder='Comment(Optional)'
        style={styles.button3}
        onChangeText = {setComment}
        value={comment}
      />

      <View style={styles.footer}>
              <View style={styles.save_share} >
                <Text style={styles.save_share_text} onPress={sbbutton}>{reportid == 0 ? "ADD REPORT" : "UPDATE REPORT"}</Text>
              </View> 
      </View>
      </ScrollView>


      
      
      
    
    </LinearGradient>
  
  );
};
  
export default DailyReport;
  
const styles = StyleSheet.create({
  root:{flex:1},
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

  rowMonthYear: {
    flex:1,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

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
  
  button:{
    flex: 0.67,
    height: 40,
    textAlign: 'center'
  },
  button_lecture:{
    flex: 0.30,
    height: 40,
    textAlign: 'right'
  },
  button_lecture2:{
    flex: 0.30,
    height: 40,
  },
  colon_time:{
    padding:5, 
    backgroundColor: '#e7e0ec', 
    height:40, 
    verticalAlign: 'middle',
    paddingTop: 10
  },
  button1:{
    flex: 0.67,
    height: 40,
    borderTopRightRadius:15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    textAlign: 'center'
  },
  button3:{
    flex:1,
    marginBottom:1,
    height: 40,
    width: 365,
    padding: 10,
    marginTop:5
  },
  daily_fields:{
    width:'50%',
    height:40,
    marginRight:80,
    marginLeft:30,
    padding:10,
  },
  leftpart:{
    flex:1,
    width:'50%',
    height:40,
    marginRight:10,
    marginLeft:2,
    padding:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
  },
  leftpart1:{
    flex:1,
    height:40,
    marginRight:10,
    marginLeft:2,
    padding:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    borderTopLeftRadius:15,
  },
  checkbox: {
    flex:0,
    justifyContent: 'center',
    alignSelf: 'center',
    verticalAlign: 'middle',
    backgroundColor:'white',
    marginTop: 10
  },
  textdate:{
    width:'40%',
    height:50,
    padding:10,
    backgroundColor:'white',
    textAlign:'center',
    marginBottom: 10,
    fontSize: 17
  },
  prevdate:{
    height:50,
    width:30,
    paddingBottom:7,
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
    width:30,
    paddingBottom:7,
    backgroundColor:'#79c52c',
    textAlign:'center',
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    marginBottom: 10,
    fontSize: 30,
    color: 'white'
  },
  footer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  save_share: {
    backgroundColor: 'green',
    flex: 1,
    height: 40,
    marginHorizontal:10,
    marginTop:10,
    borderRadius:30
  },
  save_share_text:{
    marginTop:10,
    textAlign:'center',
    color:'white'
  },
  
});