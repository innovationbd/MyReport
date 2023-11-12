import React, {useEffect, useState,useCallback} from 'react';
import { SafeAreaView,StyleSheet,View,Text,ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from 'react-native-progress/Bar';
import DropDownPicker from 'react-native-dropdown-picker';
import { API } from "../../api-service";
import moment from "moment";
import storage from '../../storage';

import loading_line from "../../assets/loading_line.gif";
import * as Animatable from "react-native-animatable";

  
const Accomplishment = () => {
  const [isSelected, setSelection] = useState(false);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(null);
  const [openYear, setOpenYear] = useState(false);
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
  /*const cYint = Number(cY);
  
  const [items1, setItems1] = useState([
    {label: (cY-5).toString(), value: '01'},
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
  */

  const [year, setYear] = useState(cY);
  //const year = '2023'; //set 2023 for now
  //const user = localStorage.getItem("user_id");
  //const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);  //user id
  const [token, setToken] = useState (null); 

  const [date, setDate] = useState(new Date());
  //const month=moment(date).format('MM');
  //const year=moment(date).format('YYYY');
  
  const cM = moment(Date()).format('MM');  //currentMonth

  const minYear = 3;
  const [itemsYear, setItemsYear] = useState([
    {label: Number(year)-minYear, value: Number(year)-minYear},
    {label: Number(year)-2, value: Number(year)-2},
    {label: Number(year)-1, value: Number(year)-1},
    {label: Number(year), value: Number(year)},
    {label: Number(year)+1, value:  Number(year)+1},
  ]);
  
  const [s, setFilterVal] = useState([]);
  const [p, setFilterValPlan] = useState([]);

  const [allsummarys, setAllsummarys] = useState([]);
  const [allplans, setAllplans] = useState([]);

  const [gotsummary, setGotsummary] = useState(false);
  const [gettingData, setGettingData] = useState(false);

  const progbarW = 60;  //progress bar width
  const progbarH = 5;   //progress bar width
  const fdigit = 0;     //for showing floating digit in percentage

  const [loading, setLoading] = useState(true);
  const [loadingCount, setLoadingCount] = useState(0);
  const maxProcessingTime = 15; //if 15 second waiting time, then network problem

  const [username, setUsername] = useState([]);
  useEffect(() => {
    storage.load({
      key: 'reviewee',
      id: '1002'
    })
    .then(ret => {
      // found data goes to then()
      //console.log(ret.loggedin);
      setToken(ret.token);
      setUser(ret.userid);
      setUsername(ret.username);
      setMonth(cM);
      setYear(Number(cY));
    });   
  }, []);

  useEffect(() => {
    console.log(month);
    console.log(allsummarys.length);
    console.log(token);
  }, [month]);

  const getSummary = () => {
    if(allsummarys.length>0) {
      const summary = allsummarys.filter((item) => item.month == month && item.year == year && item.user == user)[0];
      setFilterVal(summary);
    }
    if(allplans.length>0) {
      const plan = allplans.filter((item) => item.month == month && item.year == year && item.user == user)[0];
      setFilterValPlan(plan);
    }
  }


  useEffect(() => {
    setGettingData(true);
      API.getSummarys(token)
        .then( resp =>  setAllsummarys(resp))
        .then(() => setGettingData(false))
        .catch (error => console.log(error));
      API.getPlans(token)
          .then( resp =>  setAllplans(resp))
          .then(() => setGettingData(false))
          .catch (error => console.log(error));
  }, [gotsummary]);


  setTimeout(() => {
    if(!allsummarys.length) {
      API.getSummarys(token)
        .then( resp =>  setAllsummarys(resp))
        .then(() => setGettingData(false))
        .catch (error => console.log(error));
    }
    console.log(allsummarys.length);
  }, 500);

  setTimeout(() => {
    if(!allplans.length) {
      API.getPlans(token)
          .then( resp =>  setAllplans(resp))
          .then(() => setGettingData(false))
          .catch (error => console.log(error));
    } 
  }, 600);
  
  useEffect(() => {
    getSummary();
  }, [allplans, allsummarys, month, year]);

  useEffect(() => {
    if(allsummarys.length > 0 && allplans.length > 0) {
      setLoading(false);
    } 
  }, [allsummarys, allplans]);
  
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

  
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  // Using the browser's default locale.
  return date.toLocaleString([], { month: 'long' });
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



return (
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#fbcfd1", "#fbcfd1"]}
        style={styles.column}>
      <View><Text style={styles.reviewee_name}>{username}</Text></View>
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

      
      {/* 
      <View>
        <select onChange={this.onChange}>
          {this.getDropList()}
        </select>
      </View>
      */}

      
      
      {s && p ? (
        <ScrollView>
        <View style={styles.row}>
        <Text style={styles.daily_fields} >Fields</Text>
        <Text style={styles.amounts}>   Plan | Accom</Text>
        <Text style={styles.amounts1}>Prog %</Text>
        </View>
        

        <View style={styles.row}>
          <Text style={styles.leftpart1}>Quran Study (Ayahs)</Text>
          <Text style={styles.inner_amounts}>
            {p.quranStudy } | {s.quranStudy}
          </Text>
          <View style={styles.right_amounts1}>
            <Text>
              {p.quranStudy ? parseFloat(s.quranStudy/p.quranStudy*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.quranStudy ? s.quranStudy/p.quranStudy : 0} width={progbarW} height={progbarH} marginLeft={2}  
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Hadith Study (No.)</Text>
          <Text style={styles.inner_amounts}>
            {p.hadithStudy } | {s.hadithStudy}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.hadithStudy ? parseFloat(s.hadithStudy/p.hadithStudy*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.hadithStudy ? s.hadithStudy/p.hadithStudy : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Book Study (Pages)</Text>
          <Text style={styles.inner_amounts}>
            {p.bookStudy } | {s.bookStudy}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.bookStudy ? parseFloat(s.bookStudy/p.bookStudy*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.bookStudy ? s.bookStudy/p.bookStudy : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}><Text style={{letterSpacing: -0.7}}>Lecture Listening (Hour)</Text></Text>
          <Text style={styles.inner_amounts}>
          {float2time(p.lectureListening)} | {float2time(s.lectureListening)}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
              {p.lectureListening ? parseFloat(s.lectureListening/p.lectureListening*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.lectureListening ? s.lectureListening/p.lectureListening : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}><Text style={{letterSpacing: -0.7}}>Salah In Jamaah (Waqt)</Text></Text>
          <Text style={styles.inner_amounts}>
            {p.salat } | {s.salat}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
              {p.salat ? parseFloat(s.salat/p.salat*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.salat ? s.salat/p.salat : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Social Work (Hour)</Text>
          <Text style={styles.inner_amounts}>
            {float2time(p.socialWork)} | {float2time(s.socialWork)}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.socialWork ? parseFloat(s.socialWork/p.socialWork*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.socialWork ? s.socialWork/p.socialWork : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Org. Time (Hour)</Text>
          <Text style={styles.inner_amounts}>
          {float2time(p.orgTime)} | {float2time(s.orgTime)}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.orgTime ? parseFloat(s.orgTime/p.orgTime*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.orgTime ? s.orgTime/p.orgTime : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Ph. Exercise (Hour)</Text>
          <Text style={styles.inner_amounts}>
          {float2time(p.physicalExercise)} | {float2time(s.physicalExercise)}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.physicalExercise ? parseFloat(s.physicalExercise/p.physicalExercise*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.physicalExercise ? s.physicalExercise/p.physicalExercise : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Dawah Program (No.)</Text>
          <Text style={styles.inner_amounts}>
          {p.dawahProgram } | {s.dawahProgram}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.dawahProgram ? parseFloat(s.dawahProgram/p.dawahProgram*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.dawahProgram ? s.dawahProgram/p.dawahProgram : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Org. Program (No.)</Text>
          <Text style={styles.inner_amounts}>
          {p.orgProgram } | {s.orgProgram}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.orgProgram ? parseFloat(s.orgProgram/p.orgProgram*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.orgProgram ? s.orgProgram/p.orgProgram : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}><Text style={{letterSpacing: -0.5}}>Personal Contact (No.)</Text></Text>
          <Text style={styles.inner_amounts}>
          {p.memberContact } | {s.memberContact}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.memberContact ? parseFloat(s.memberContact/p.memberContact*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.memberContact ? s.memberContact/p.memberContact : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Distribution (No.)</Text>
          <Text style={styles.inner_amounts}>
          {p.distribution } | {s.distribution}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.distribution ? parseFloat(s.distribution/p.distribution*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.distribution ? s.distribution/p.distribution : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart}>Family Meeting (No.)</Text>
          <Text style={styles.inner_amounts}>
          {p.familyMeeting } | {s.familyMeeting}
          </Text>
          <View style={styles.right_amounts}>
            <Text>
            {p.familyMeeting ? parseFloat(s.familyMeeting/p.familyMeeting*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.familyMeeting ? s.familyMeeting/p.familyMeeting : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        
        </View>

        <View style={styles.row}>
          <Text style={styles.leftpart2}>Self Criticism (Days)</Text>
          <Text style={styles.inner_amounts}>
          {p.selfCriticism } | {s.selfCriticism}
          </Text>
          <View style={styles.right_amounts2}>
            <Text>
            {p.selfCriticism ? parseFloat(s.selfCriticism/p.selfCriticism*100).toFixed(fdigit)+'%' : 'No Plan'}
            </Text>
            <ProgressBar progress={p.selfCriticism ? s.selfCriticism/p.selfCriticism : 0} width={progbarW} height={progbarH} marginLeft={2}/>
          </View>
        </View>

        <View 
          style={styles.button3}
        />

      </ScrollView>
      ) : (
        <ScrollView style={styles.root}>
          <Text>
          {p ? 'Monthly Summary not available' : 'Monthly Plan not available'}
          </Text>
        </ScrollView>
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
      

    </LinearGradient>
        
  );
};
  
export default Accomplishment;
  
const rowH = 40;
const styles = StyleSheet.create({
  root:{
    flex:1,
  },
  column: {
    flex:1,
    padding: 10,
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
  daily_fields:{
    flex:2.6,
    height:20,
    textAlign: 'center'
  },
  amounts:{
    flex:1.5,
    height:20,
  },
  amounts1:{
    flex:1,
    height:20,
    textAlign: 'center'
  },
  leftpart:{
    flex:2.6,
    width:150,
    height:rowH,
    fontSize:10,
    marginRight:2,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    textAlignVertical:'center'
  },
  leftpart1:{
    flex:2.6,
    width:150,
    height:rowH,
    fontSize:10,
    marginRight:2,
    padding:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    borderTopLeftRadius:15,
    textAlignVertical:'center'
  },
  leftpart2:{
    flex:2.6,
    width:150,
    height:rowH,
    fontSize:10,
    marginRight:2,
    padding:10,
    backgroundColor:'#0070bb',
    color:'white',
    fontWeight:'bold',
    fontSize: 15,
    borderBottomLeftRadius:15,
    textAlignVertical:'center'
  },
  inner_amounts:{
    flex:1.5,
    width:100,
    height:rowH,
    padding:10,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center',
    borderWidth:0,
    marginRight:2
  },
  right_amounts:{
    flex:1,
    width:100,
    height:rowH,
    paddingRight:10,
    paddingTop:5,
    paddingLeft:2,
    backgroundColor:'white',
    textAlign:'center',
    textAlignVertical:'center',
    borderWidth:0
  },
  right_amounts1:{
    flex:1,
    width:100,
    height:rowH,
    paddingRight:10,
    paddingTop:5,
    paddingLeft:2,
    backgroundColor:'white',
    textAlign:'center',
    borderTopRightRadius:15,
    textAlignVertical:'center',
    borderWidth:0
  },
  right_amounts2:{
    flex:1,
    width:100,
    height:rowH,
    paddingRight:7,
    paddingLeft:5,
    paddingTop:5,
    backgroundColor:'white',
    textAlign:'center',
    borderBottomRightRadius:15,
    textAlignVertical:'center',
    borderWidth:0
  },
  button3:{
    flex:1,
    marginBottom:10,
    height: 5,
    width: 360,
    padding: 10,
    marginTop: 10,
  },
  button4:{
    width:180,
    height:60,
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
  reviewee_name:{
    fontSize:20,
    fontWeight:'bold',
    flexDirection:'row',
    padding: 10,
    textAlign:'center',
  },
  
});