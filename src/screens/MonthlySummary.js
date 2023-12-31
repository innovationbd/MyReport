import React, {useCallback, useEffect, useState} from 'react';
import { Button,StyleSheet,View,Text,ScrollView, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import CheckBox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import storage from '../../storage';
import { API } from '../../api-service';


  
const MonthlySummary = () => {

  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 

  const [date, setDate] = useState(new Date());
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

  const [supporterName, setSupporterName] = useState(null);
  const [studyCircleDate, setStudyCircleDate] = useState(null);
  const [qiamulLailDate, setQiamulLailDate] = useState(null);
  const [eyanatDate, setEyanatDate] = useState(null);
  const [studyCircle, setStudyCircle] = useState(null);
  const [qiamulLail, setQiamulLail] = useState(null);
  const [eyanatPaid, setEyanatPaid] = useState(null);
  const [supporterIncrease, setSupporterIncrease] = useState(null);
  const [monthlyComment, setmonthlyComment] = useState(null);

  const [postId, setPostId] = useState(null);
  const [searchApiData, setsearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState([]);

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

  const [allsummarys, setAllsummarys] = useState([]);
  const [summaryid, setSummaryid] = useState(0);

  const [gotsummary, setGotsummary] = useState(false);
  const [summarylength, setP] = useState(100);
  const [selectedDate, setSelectedDate] = useState(new Date());


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

  useEffect(() => {
    console.log(month+' '+maxD);
  }, [month]);

  const getSummary = () => {
    //console.log(allsummarys);
    if(allsummarys.length>0) {
      const summary = allsummarys.filter((item) => item.month == month && item.year == year && item.user == user);
      setP(summary.length);
      if(summary.length != 0) {
          setSummaryid(summary[0].id);
          //setQuranStudy(summary.map((item) => item.quranStudy));
          setQuranStudy(summary[0].quranStudy == null ? null : summary[0].quranStudy);
          setHadithStudy(summary[0].hadithStudy == null ? null : summary[0].hadithStudy);
          setBookStudy(summary[0].bookStudy == null ? null : summary[0].bookStudy);
          setLectureListening(summary[0].lectureListening == null ? null : summary[0].lectureListening);
          setSalat(summary[0].salat == null ? null : summary[0].salat);
          setDawahProgram(summary[0].dawahProgram == null ? null : summary[0].dawahProgram);
          setMemberContact(summary[0].memberContact == null ? null : summary[0].memberContact);
          setSocialWork(summary[0].socialWork == null ? null : summary[0].socialWork);
          setDawahMaterial(summary[0].dawahMaterial == null ? null : summary[0].dawahMaterial);
          setDistribution(summary[0].distribution == null ? null : summary[0].distribution);
          setFamilyMeeting(summary[0].familyMeeting == null ? null : summary[0].familyMeeting);
          setOrgProgram(summary[0].orgProgram == null ? null : summary[0].orgProgram);
          setOrgTime(summary[0].orgTime == null ? null : summary[0].orgTime);
          setPhysicalExercise(summary[0].physicalExercise == null ? null : summary[0].physicalExercise);
          setSelfCriticism(summary[0].selfCriticism == null ? null : summary[0].selfCriticism);
          setSupporterIncrease(summary[0].supporterIncrease == null ? NaN : summary[0].supporterIncrease);

          setSupporterName(summary[0].supporterName == null ? '' : summary[0].supporterName);
          setStudyCircle(summary[0].studyCircle == null ? 0 : summary[0].studyCircle);
          setQiamulLail(summary[0].qiamulLail == null ? 0 : summary[0].qiamulLail);
          setEyanatPaid(summary[0].eyanatPaid == null ? 0 : summary[0].eyanatPaid);
          setStudyCircleDate(summary[0].studyCircleDate == null ? '' : summary[0].studyCircleDate);
          setQiamulLailDate(summary[0].qiamulLailDate == null ? '' : summary[0].qiamulLailDate);
          setEyanatDate(summary[0].eyanatDate == null ? '' : summary[0].eyanatDate);
          setmonthlyComment(summary[0].monthlyComment == null ? '' : summary[0].monthlyComment);
      }
      else {
          setSummaryid(0);
          setQuranStudy(null);
          setHadithStudy(null);
          setBookStudy(null);
          setLectureListening(null);
          setSalat(null);
          setDawahProgram(null);
          setMemberContact(null);
          setSocialWork(null);
          setDawahMaterial(null);
          setDistribution(null);
          setFamilyMeeting(null);
          setOrgProgram(null);
          setOrgTime(null);
          setPhysicalExercise(null);
          setSelfCriticism(null);
          setSupporterIncrease(NaN);
          setSupporterName('');
          setStudyCircle(0);
          setQiamulLail(0);
          setEyanatPaid(0);
          setStudyCircleDate('');
          setQiamulLailDate('');
          setEyanatDate('');
          setmonthlyComment('');
      }
    }
  }


  useEffect(() => {
      API.getSummarys(token)
      .then( resp =>  setAllsummarys(resp))
      .catch (error => console.log(error))
  }, [gotsummary]);

  setTimeout(() => {
    if(!allsummarys.length) {
      API.getSummarys(token)
      .then( resp =>  setAllsummarys(resp))
      .catch (error => console.log(error))
    } 
    console.log(allsummarys.length);
  }, 500);

  useEffect(() => {
      getSummary();
      //setDays(new Date(year, month, 0).getDate());
  }, [allsummarys, month, year]);

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

  function float2time(fnum) {
    var t0 = Math.trunc(fnum);
    var t1 = twoDigit(Math.round((fnum-t0)*60));
    return t0 + ":" + t1;
  }
  function twoDigit(num) {
    return num<10 ? "0"+num : num.toString();
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
    console.log('resp');
    const data = {
        user,
        month,
        year,
        selfCriticism,
        eyanatPaid,
        eyanatDate: (eyanatDate=='' ? null : eyanatDate),
        supporterIncrease,
        supporterName,
        studyCircle,
        studyCircleDate: (studyCircleDate=='' ? null : studyCircleDate),
        qiamulLail,
        qiamulLailDate: (qiamulLailDate=='' ? null : qiamulLailDate),
        monthlyComment
      };
    
      API.updateSummary(summaryid, data, token)
      .then( resp => {
          console.log(resp);
          console.log(data);
          if(resp.user == user) {
            Alert.alert('Alert Title', 'Monthly Report Updated!', [
              {
                text: 'Cancel',
                //onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK'},
            ]);
            setGotsummary(!gotsummary);
          }
          else {
            Alert.alert('Alert Title', 'Monthly Summary Not Updated!', [
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
          console.log(error);
          Alert.alert('Alert Title', 'Monthly Summary Not Updated!', [
            {
              text: 'Cancel',
              //onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK'},
          ]);
          swal("Error", "Monthly Summary Not Updated", "warning");
      });   
  } 

  //------------------------------------------------------

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber-1);

    // Using the browser's default locale.
    return date.toLocaleString([], { month: 'long' });
  }


  return (

    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#fdeacc", "#fdeacc"]}
        style={styles.column}>

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

        

    
    
    <ScrollView>

      <View style={styles.row}>
      <Text style={styles.daily_fields} >Fields</Text>
      <Text style={styles.amounts}>Total</Text>
      <Text style={styles.amounts}>Avg.</Text>
      </View>
      

      <View style={styles.row}>
      <Text style={styles.leftpart1}>Quran Study</Text>
      <Text style={styles.inner_amounts2}>{quranStudy}</Text>
      <Text style={styles.inner_amounts1}>{parseFloat(quranStudy / days).toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Hadith Study</Text>
      <Text style={styles.inner_amounts2}>{hadithStudy}</Text>
      <Text style={styles.inner_amounts}>{parseFloat(hadithStudy / days).toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Islamic Book Study</Text>
      <Text style={styles.inner_amounts2}>{bookStudy}</Text>
      <Text style={styles.inner_amounts}>{parseFloat(bookStudy / days).toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Lecture Listening</Text>
      <Text style={styles.inner_amounts2}>{float2time(lectureListening)}</Text>
      <Text style={styles.inner_amounts}>{float2time(lectureListening / days)}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Salat in Jamaah</Text>
      <Text style={styles.inner_amounts2}>{salat}</Text>
      <Text style={styles.inner_amounts}>{parseFloat(salat / days).toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Social Work</Text>
      <Text style={styles.inner_amounts2}>{float2time(socialWork)}</Text>
      <Text style={styles.inner_amounts}>{float2time(socialWork/days)}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Org Time</Text>
      <Text style={styles.inner_amounts2}>{float2time(orgTime)}</Text>
      <Text style={styles.inner_amounts}>{float2time(orgTime / days)}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Physical Exercise</Text>
      <Text style={styles.inner_amounts2}>{float2time(physicalExercise)}</Text>
      <Text style={styles.inner_amounts}>{float2time(physicalExercise / days)}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart_inner}>Dawah Prog</Text>
      <Text style={styles.inner_amounts2}>{dawahProgram}</Text>
      <Text style={styles.leftpart_inner}>Org Prog</Text>
      <Text style={styles.inner_inner_amounts}>{orgProgram}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart_inner}>Contact</Text>
      <Text style={styles.inner_amounts2}>{memberContact}</Text>
      <Text style={styles.leftpart_inner}>Distribution</Text>
      <Text style={styles.inner_inner_amounts}>{distribution}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart_inner}>Family Meet</Text>
      <Text style={styles.inner_amounts2}>{familyMeeting}</Text>
      <Text style={styles.leftpart_inner}>Self-Critic</Text>
      <Text style={styles.inner_inner_amounts}>{selfCriticism}</Text>
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Supporter Increase</Text>
      <TextInput 
        placeholder='Number'
        style={styles.button6}
        keyboardType='numeric'
        onChangeText = {(text)=> setSupporterIncrease(numericText(text, 0, 1000))}
        value={num2string(supporterIncrease)}  
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Supporter Name</Text>
      <TextInput 
        placeholder='Name'
        style={styles.button6}
        onChangeText = {setSupporterName}
        value={supporterName}
      />
      </View>

      <View style={styles.row}>
      <Text style={styles.leftpart}>Study Circle
      
      </Text>
      <View style={styles.button5}>
        <CheckBox
          style={styles.checkbox}
          disabled={false}
          value={studyCircle ? true : false}
          onValueChange={(e) => setStudyCircle(Number(e))}
        />
      </View>
      <Text style={styles.button4}></Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.leftpart}>Qiamul Lail</Text>
        <View style={styles.button5}>
          <CheckBox
              style={styles.checkbox}
              disabled={false}
              value={qiamulLail ? true : false}
              onValueChange={(e) => setQiamulLail(Number(e))}
          />
        </View>
        <Text style={styles.button4}></Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.leftpart}>Eyanat Paid</Text>
        <View style={styles.button5}>
          <CheckBox
              style={styles.checkbox}
              disabled={false}
              value={eyanatPaid ? true : false}
              onValueChange={(e) => setEyanatPaid(Number(e))}
          />
        </View>
        <Text style={styles.button4}></Text>
      </View>

      <TextInput 
        placeholder='Comment'
        style={styles.button3}
        onChangeText = {setmonthlyComment}
        value={monthlyComment}
      />

      <View style={styles.footer}>
        <View style={styles.save_share} >
          <Text style={styles.save_share_text} onPress={sbbutton}>SAVE</Text>
        </View> 
          
        {/*<View style={styles.save_share1}>
          <Text style={styles.save_share_text}>SHARE</Text>
  </View> */}
      </View>

      
      
    </ScrollView></LinearGradient>
  
  );
};
  
export default MonthlySummary;
  
const styles = StyleSheet.create({
  
  column: {
    flex:1,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  row: {
    flex:1,
    padding: 1,
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
  daily_fields:{
    flex:2,
    height:50,
    marginRight:30,
    marginLeft:30,
    padding:10,
    marginBottom:-20
  },
  amounts:{
    flex:1,
    height:50,
    padding:10,
    marginLeft: 5,
    marginRight:20,
    marginBottom:-20
  },
  leftpart:{
    flex:3,
    height:40,
    fontSize:10,
    marginRight:3,
    marginLeft:2,
    padding:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    textAlignVertical:'center',
  },
  leftpart_inner:{
    flex:2.3,
    height:40,
    fontSize:10,
    marginRight:3,
    marginLeft:2,
    padding:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    textAlignVertical:'center',
  },
  leftpart1:{
    flex:3,
    height:40,
    fontSize:10,
    marginRight:3,
    marginLeft:2,
    padding:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    borderTopLeftRadius:15,
    textAlignVertical:'center'
  },
  inner_amounts:{
    flex:2,
    height:40,
    padding:10,
    marginRight:2,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center'
  },
  inner_inner_amounts:{
    flex:2,
    height:40,
    padding:10,
    marginRight:2,
    backgroundColor:'white',
    textAlign:'left',
    textAlignVertical:'center'
  },
  inner_amounts1:{
    flex:2,
    height:40,
    padding:10,
    marginRight:2,
    backgroundColor:'white',
    textAlign:'center',
    borderTopRightRadius:15,
    textAlignVertical:'center'
  },
  inner_amounts2:{
    flex:1,
    height:40,
    padding:10,
    marginRight:2,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center'
  },
  checkbox:{
    backgroundColor:'white',
    marginLeft:5,
    marginRight: 5,
  },
  button3:{
    flex:2,
    marginBottom:10,
    height: 50,
    width: 360,
    padding: 10,
    marginTop: 10,
  },
  button4:{
    flex: 1.63,
    height:40,
    fontSize:15,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center',
    padding:10
  },
  button5:{
    flex: 0.4,
    height:40,
    fontSize:15,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center',
    padding:10
  },
  button6:{
    flex: 2.6,
    height:40,
    fontSize:15,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center'
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
    marginLeft:20
  },
  prevdate:{
    height:50,
    width:40,
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
    width:40,
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