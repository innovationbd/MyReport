import React from 'react';
import { StyleSheet,Text,ScrollView,View, SafeAreaView } from 'react-native';
import Header from "../components/Header";
//import { Card } from 'react-bootstrap';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';


  
const Dashboard = (props) => {

  PageDaily = (pageName) => {
    props.navigation.navigate(pageName, {name: pageName});
  }

  return (
    <ScrollView style={styles.root}
    showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
    <SafeAreaView style={styles.container}>
      <Header/>
      <TouchableOpacity onPress={() => {
            this.PageDaily('DailyReport');
         }}
         style={styles.box1}
      >         
         <Icon name="clock" size={30} color='#5b97f1'/>
         <Text style={styles.text}>Daily Report</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
            this.PageDaily('MonthlySummary');
         }}>
      <View style={styles.box1}>
         <Icon name="list" size={30} color='#5b97f1'/>
         <Text style={styles.text} >Monthly Summary</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
            this.PageDaily('MonthlyPlan');
         }}>
      <View style={styles.box1}>
         <Icon name="bars" size={30} color='#5b97f1'/>
         <Text style={styles.text} >Monthly Plan</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
            this.PageDaily('Accomplishment');
         }}>
      <View style={styles.box1}>
         <Icon name="clock" size={30} color='#5b97f1'/>
         <Text style={styles.text} >Plan vs. Accomplishment</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
            this.PageDaily('Syllabus');
         }}>
      <View style={styles.box1}>
         <Icon name="book" size={30} color='#5b97f1'/>
         <Text style={styles.text} >Syllabus</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
            this.PageDaily('Counselor');
         }}>
      <View style={styles.box1}>
         <Icon name="users" size={30} color='#5b97f1'/>
         <Text style={styles.text} >Counselor</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
            this.PageDaily('Reviewee');
         }}>
      <View style={styles.box1}>
         <Icon name="comment" size={30} color='#5b97f1'/>
         <Text style={styles.text} >Reviewee</Text>
      </View>
      </TouchableOpacity>
      
      {/* 
      <View style={{marginTop: 16, marginBottom: 16}}>
            
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              onPress={() => alert('Login with Facebook')}>
              Login with Facebook
            </Icon.Button>
      </View>
      */}
    </SafeAreaView>
    </ScrollView>
  
  );
};
  
export default Dashboard;
  
const styles = StyleSheet.create({
  root:{
   flex:1,
   backgroundColor:'#5b97f1'
   },
    box1:{
      flex:0.25,
        flexDirection:'row',
        marginTop:10,
        padding:10,
        backgroundColor:'white',
        fontWeight:'bold',
        textAlignVertical:'center',
        alignItems:'center',
        alignSelf:'center',
        textAlign:'center',
        borderRadius:50,
   },
   
    text:{
      flex:0.5,
      padding:10,
      flexDirection:'row',
      color:'black',
      fontWeight:'bold',
      textAlignVertical:'center',
      alignItems:'center',
      alignSelf:'center',
      textAlign:'center',
      fontSize:15,
      },
  
  
});