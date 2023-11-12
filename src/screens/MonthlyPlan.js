import React, {useEffect, useState} from 'react';
import { Button,StyleSheet,View,Text,ScrollView,Alert, Modal } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { API } from '../../api-service';
import storage from '../../storage';
import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";



  
const MonthlyPlan = () => {

  const [isSelected, setSelection] = useState(false);
  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 
  const [openYear, setOpenYear] = useState(false);
  const [open, setOpen] = useState(false);
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

  const [date, setDate] = useState(new Date());
  //const month=moment(date).format('MM');
  //const year=moment(date).format('YYYY');
  const cY = moment(Date()).format('YYYY');  //currentYear
  const cM = moment(Date()).format('MM');  //currentMonth
  const cD = moment(Date()).format('DD');  //currentDateOnly

  const [year, setYear] = useState(Number(cY));
  //const year = '2023'; //set 2023 for now

  const minYear = 3;
  const [itemsYear, setItemsYear] = useState([
    {label: Number(year)-minYear, value: Number(year)-minYear},
    {label: Number(year)-2, value: Number(year)-2},
    {label: Number(year)-1, value: Number(year)-1},
    {label: Number(year), value: Number(year)},
    {label: Number(year)+1, value:  Number(year)+1},
  ]);

  const days = new Date(year, month, 0).getDate();
  const d = year+'-'+month+'-';
  const minD = d+'01';
  const maxD = (cY > year ? d+days : (cM > month ? d+days : d+cD));

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
  const [supporterIncrease, setSupporterIncrease] = useState(null);
  const [planComment, setPlanComment] = useState(null);

  const [allplans, setAllplans] = useState([]);
  const [planid, setPlanid] = useState(0);

  const [gotplan, setGotplan] = useState(false);
  const [planlength, setP] = useState(100);
  const [comment, setComment] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [processingCount, setProcessingCount] = useState(0);
  const maxProcessingTime = 15; //if 15 second waiting time, then network problem

  const maxHour = 500; //the maximum number that can be taken as hour input


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
      setMonth(cM);
      setYear(Number(cY));
    });   
  }, []);

  const getPlan = () => {
    if(allplans.length) {
        const plan = allplans.filter((item) => item.month == month && item.year == year && item.user == user);
        setP(plan.length);
        if(plan.length != 0) {
            setPlanid(plan[0].id);
            //setQuranStudy(plan.map((item) => item.quranStudy));
            setQuranStudy(plan[0].quranStudy == null ? NaN : plan[0].quranStudy);
            setHadithStudy(plan[0].hadithStudy == null ? NaN : plan[0].hadithStudy);
            setBookStudy(plan[0].bookStudy == null ? NaN : plan[0].bookStudy);
            setLectureListening(plan[0].lectureListening == null ? NaN : plan[0].lectureListening);
            setSalat(plan[0].salat == null ? NaN : plan[0].salat);
            setDawahProgram(plan[0].dawahProgram == null ? NaN : plan[0].dawahProgram);
            setMemberContact(plan[0].memberContact == null ? NaN : plan[0].memberContact);
            setSocialWork(plan[0].socialWork == null ? NaN : plan[0].socialWork);
            setDawahMaterial(plan[0].dawahMaterial == null ? NaN : plan[0].dawahMaterial);
            setDistribution(plan[0].distribution == null ? NaN : plan[0].distribution);
            setFamilyMeeting(plan[0].familyMeeting == null ? NaN : plan[0].familyMeeting);
            setOrgProgram(plan[0].orgProgram == null ? NaN : plan[0].orgProgram);
            setOrgTime(plan[0].orgTime == null ? NaN : plan[0].orgTime);
            setPhysicalExercise(plan[0].physicalExercise == null ? NaN : plan[0].physicalExercise);
            setSelfCriticism(plan[0].selfCriticism == null ? NaN : plan[0].selfCriticism);
            setSupporterIncrease(plan[0].supporterIncrease == null ? NaN : plan[0].supporterIncrease);
            setPlanComment(plan[0].planComment == null ? '' : plan[0].planComment);
        }
        else {
            setPlanid(0);
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
            setSelfCriticism(NaN);
            setSupporterIncrease(NaN);
            setPlanComment('');
        }
    }
}

useEffect(() => {
    API.getPlans(token)
    .then( resp =>  setAllplans(resp))
    .catch (error => console.log(error))
}, [gotplan]);

setTimeout(() => {
  if(!allplans.length) {
    API.getPlans(token)
    .then( resp =>  setAllplans(resp))
    .catch (error => console.log(error))
  } 
}, 500);

useEffect(() => {
  if(allplans.length > 0) {
    setLoading(false);
  } 
}, [allplans]);

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
    getPlan();
}, [allplans, month, year]);

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
function twoDigit(num) {
  return num<10 ? "0"+num : num.toString();
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

const prevMonth = () => {
  if(month == '01') {
    if(year != Number(cY)-minYear) {
      setMonth('12');
      setYear(year-1);
    } 
  }
  else {
    setMonth(twoDigit(Number(month)-1));
  } 
}
const nextMonth = () => {
  if(month == '12') {
    if(year != Number(cY)+1) {
      setMonth('01');
      setYear(year+1);
    }  
  }
  else {
    setMonth(twoDigit(Number(month)+1));
  }
}

const sbbutton = () => {
  setProcessing(true);
  
    const data = {
        user,
        month,
        year,
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
        supporterIncrease,
        planComment
      };
    if(planid == 0) {
        API.createPlan(data, token)
        .then( resp => {
          setProcessing(false);
            //console.log(resp);
            if(resp.user == user) {
              Alert.alert("Success!", "Plan successfully Added", [
                {
                  text: 'Cancel',
                  //onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK'},
              ]);
              setGotplan(!gotplan);
            }
            else {
              Alert.alert("Error", "Plan Not Added", [
                {
                  text: 'Cancel',
                  //onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK'},
              ]);
            }
        })
        .catch(error => {
          setProcessing(false);
            //console.log(error);
            Alert.alert("Error", "Plan Not Added", [
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
      
        API.updatePlan(planid, data, token)
        .then( resp => {
          setProcessing(false);
            //console.log(resp);
            //console.log(data);
            if(resp.user == user) {
             
              Alert.alert("Success!", "Plan successfully Updated", [
                {
                  
                  text: 'Cancel',
                  //onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK'},
              ]);
              //console.log('Plan successfully Updated');
              setGotplan(!gotplan);
            }
            else {
              Alert.alert("Error", "Plan Not Updated", [
                {
                  text: 'Cancel',
                  //onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK'},
              ]);
              //console.log('Plan not Updated elase');
            }
        })
        .catch(error => {
          setProcessing(false);
            //console.log(error);
            Alert.alert("Error", "Plan Not Updated", [
              {
                text: 'Cancel',
                //onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK'},
            ]);
            //console.log('Plan not Updated efrror');
        });
    }
    
} 




  return (
    
      
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#cbebcf", "#cbebcf"]}
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
        <Text style={styles.prevdate} onPress={prevMonth}>{'<'}</Text>
        <DropDownPicker
          open={open}
          value={month}
          items={items}
          setOpen={setOpen}
          setValue={setMonth}
          setItems={setItems}
          placeholder=""
          style={styles.select_month}
          containerStyle={{width: 130, height: 60}}
        />
        
        <Text style={styles.nextdate} onPress={nextMonth}>{'>'}</Text>

        <DropDownPicker
          open={openYear}
          value={year}
          items={itemsYear}
          setOpen={setOpenYear}
          setValue={setYear}
          setItems={setItemsYear}
          placeholder=""
          style={styles.select_month1}
          containerStyle={{width: 130, height: 60}}
        />
        </View>

    <ScrollView 
            style={{marginBottom: 10}}>
          <View style={styles.row}>
          <Text style={styles.leftpart1}>Quran Study (Ayahs)</Text>
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
          <Text style={styles.leftpart}>Islamic Book Study (Page)</Text>
          <TextInput 
            placeholder='Number'
            style={styles.button}
            keyboardType="numeric"
            onChangeText = {(text)=> setBookStudy(numericText(text, 0, 10000))}
            value={num2string(bookStudy)} 
          />
          </View>

          <View style={styles.row}>
          <Text style={styles.leftpart}>Lecture Listening (hrs)</Text>
          <TextInput 
            placeholder='hh:mm'
            style={styles.button}
            onChangeText={(text) =>
              setLectureListening(lectureListening ? time2float(text) : text)}
            value={lectureListening ? (lectureListening.length>1 ? lectureListening : float2time(lectureListening)) : ""}
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
            style={styles.button_lecture1}
            keyboardType="numeric"
            onChangeText={(text) =>
              setLectureListening(lectureListening ? time2float(float2hour(lectureListening)+':'+text) : time2float('0:'+text))}
            value={lectureListening ? (lectureListening.length>1 ? lectureListening : float2min(lectureListening)) : ""}
          />
          </View>

          <View style={styles.row}>
          <Text style={styles.leftpart}>Salah In Jamaah (Waqt)</Text>
          <TextInput 
            placeholder='Waqt(0-5)'
            style={styles.button}
            keyboardType="numeric"
            onChangeText = {(text)=> setSalat(numericText(text, 0, 155))}
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
          <Text style={styles.leftpart}>Social Work(hrs)</Text>
          <TextInput 
            placeholder='hh:mm'
            style={styles.button}
            onChangeText={(text) =>
              setSocialWork(socialWork ? time2float(text) : text)}
            value={socialWork ? (socialWork.length>1 ? socialWork : float2time(socialWork)) : ""}
          />
          </View>

          <View style={styles.row}>
          <Text style={styles.leftpart}>Social Work (hh:mm)</Text>
          <TextInput 
            placeholder='hh'
            style={styles.button_lecture}
            keyboardType="numeric"
            onChangeText={(text) =>
              setSocialWork(socialWork ? time2float(numericText(text,0,maxHour)+':'+float2min(socialWork)) : numericText(text,0,maxHour))}
              value={socialWork ?  (socialWork.length>1 ? socialWork : float2hour(socialWork)) : ""}
            />
          <Text style={styles.colon_time}>:</Text>
          <TextInput 
            placeholder='mm'
            style={styles.button_lecture1}
            keyboardType="numeric"
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
          <Text style={styles.leftpart}>Org. Program (No.)</Text>
          <TextInput 
            placeholder='Number'
            style={styles.button}
            keyboardType="numeric"
            onChangeText = {(text)=> setOrgProgram(numericText(text, 0, 100))}
            value={num2string(orgProgram)}
          />
          </View>

          <View style={styles.row}>
          <Text style={styles.leftpart}>Org. Time(hrs)</Text>
          <TextInput 
            placeholder='hh:mm'
            style={styles.button}
            onChangeText={(text) =>
              setOrgTime(orgTime ? time2float(text) : text)}
            value={orgTime ? (orgTime.length>1 ? orgTime : float2time(orgTime)) : ""}
          />
          </View>

          <View style={styles.row}>
          <Text style={styles.leftpart}>Org. Time (hh:mm)</Text>
          <TextInput 
            placeholder='hh'
            style={styles.button_lecture}
            onChangeText={(text) =>
              setOrgTime(orgTime ? time2float(numericText(text,0,maxHour)+':'+float2min(orgTime)) : numericText(text,0,maxHour))}
              value={orgTime ?  (orgTime.length>1 ? orgTime : float2hour(orgTime)) : ""}
            />
          <Text style={styles.colon_time}>:</Text>
          <TextInput 
            placeholder='mm'
            style={styles.button_lecture1}
            onChangeText={(text) =>
              setOrgTime(orgTime ? time2float(float2hour(orgTime)+':'+text) : time2float('0:'+text))}
              value={orgTime ? (orgTime.length>1 ? orgTime : float2min(orgTime)) : ""}
            />
          </View>

          <View style={styles.row}>
          <Text style={styles.leftpart}>Physical Exercise(hrs)</Text>
          <TextInput 
            placeholder='hh:mm'
            style={styles.button}
            onChangeText={(text) =>
              setPhysicalExercise(physicalExercise ? time2float(text) : text)}
            value={physicalExercise ? (physicalExercise.length>1 ? physicalExercise : float2time(physicalExercise)) : ""}
          />
          </View>

          <View style={styles.row}>
          <Text style={styles.leftpart}>Physical Exercise (hh:mm)</Text>
          <TextInput 
            placeholder='hh'
            style={styles.button_lecture}
            onChangeText={(text) =>
              setPhysicalExercise(physicalExercise ? time2float(numericText(text,0,maxHour)+':'+float2min(physicalExercise)) : numericText(text,0,maxHour))}
              value={physicalExercise ?  (physicalExercise.length>1 ? physicalExercise : float2hour(physicalExercise)) : ""}
            />
          <Text style={styles.colon_time}>:</Text>

          <TextInput 
            placeholder='mm'
            style={styles.button_lecture1}
            onChangeText={(text) =>
              setPhysicalExercise(physicalExercise ? time2float(float2hour(physicalExercise)+':'+text) : time2float('0:'+text))}
              value={physicalExercise ? (physicalExercise.length>1 ? physicalExercise : float2min(physicalExercise)) : ""}
            />
          </View>
          
          <View style={styles.row}>
          <Text style={styles.leftpart}>Self-criticism (Days)</Text>
          <TextInput 
            placeholder='Days'
            style={styles.button}
            onChangeText = {(text)=> setSelfCriticism(numericText(text, 0, 100))}
            value={num2string(selfCriticism)}
          />
          </View>

          <View style={styles.row}>
          <Text style={styles.leftpart}>Supporter Increase (No.)</Text>
          <TextInput 
            placeholder='Number'
            style={styles.button}
            onChangeText = {(text)=> setSupporterIncrease(numericText(text, 0, 100))}
            value={num2string(supporterIncrease)}
          />
          </View>

          <TextInput 
            placeholder='Comment (Optional)'
            style={styles.button3}
            onChangeText = {setPlanComment}
            value={planComment}
          />

          {/* 
          <View style={styles.footer}>
            <View style={styles.save_share}>
              <Text style={styles.save_share_text}>SAVE</Text>
            </View> 
              
            <View style={styles.save_share1}>
              <Text style={styles.save_share_text}>SHARE</Text>
            </View> 
          </View>
          */}
          
        
          
          
          
        
          
          
        </ScrollView>
        <Button
            title={planid == 0 ? "ADD PLAN" : "UPDATE PLAN"}
            color="#0070bb"
            onPress={sbbutton}
          />
    </LinearGradient>
  );
};
  
export default MonthlyPlan;

const mR = 20;
const styles = StyleSheet.create({
  root:{
    flex:1,
  },
  column: {
    flex:1,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  row: {
    flex:1,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

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
    flex: 0.75,
    height: 40,
    marginRight:mR,
    textAlign: 'center'
  },
  button_lecture1:{
    flex: 0.34,
    height: 40,
    marginRight:mR,
  },
  button_lecture:{
    flex: 0.34,
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
    flex: 0.75,
    height: 40,
    marginRight:mR,
    borderTopRightRadius:15,
    textAlign: 'center'
  },
  button3:{
    flex:1,
    marginBottom:5,
    height: 40,
    width: 365,
    padding: 10,
    marginTop:10,
  },
  daily_fields:{
    width:100,
    height:40,
    marginRight:80,
    marginLeft:30,
    padding:10,
  },
  leftpart:{
    flex:1,
    height:40,
    marginRight:10,
    marginLeft:2,
    padding:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    textAlignVertical:'center'
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
    borderTopLeftRadius:15,
    textAlignVertical:'center'
  },
  checkbox: {
    alignSelf: 'center',
    backgroundColor:'white',
    marginLeft:95,
    marginRight: 90,
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
  select_month:{
    alignSelf:'center',
    height:30,
    borderColor:'white',
    borderRadius:0
  },
  select_month1:{
    alignSelf:'center',
    height:30,
    borderColor:'white',
    borderRadius:20,
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
    marginRight:10,
    paddingBottom:7,
    backgroundColor:'#79c52c',
    textAlign:'center',
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    marginBottom: 10,
    fontSize: 30,
    color: 'white'
  },
  
});