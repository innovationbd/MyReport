import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomDrawer from "../navigation/CustomDrawer"
import PageHome from "../screens/PageHome"; 
import Home from "../screens/Home";
import PageLogin from '../screens/PageLogin';
import DailyReport from '../screens/DailyReport';
import MonthlySummary from '../screens/MonthlySummary';
import MonthlyPlan from '../screens/MonthlyPlan';
import Syllabus from '../screens/Syllabus';
import Accomplishment from '../screens/Accomplishment';
import Counselor from '../screens/Counselor';
import Reviewee from '../screens/Reviewee';
import Account from '../screens/Account';
import Contactus from '../screens/Contactus';
import Aboutus from '../screens/Aboutus';
import Settings from '../screens/Settings';
import storage from '../../storage';
import Dashboard from '../screens/Dashboard';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import ChangePassword from '../screens/ChangePassword';
import Notification from '../screens/Notification';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = ({navigation}) => {

  


  return (
    
      <Drawer.Navigator drawerContent={props=> <CustomDrawer{...props}/>} screenOptions={{ headerShown: true, }} initialRouteName="Home" >
        {/*<Drawer.Screen name="Home1" component={Home} options={{ drawerIcon:()=>(<FontAwesome5 name="home1" size={18} color="#489fff" />)}} /> */}
        <Drawer.Screen name="Home" component={Dashboard} options={{ drawerIcon:()=>(<FontAwesome5 name="home" size={18} color="#489fff" />)}} />
        <Drawer.Screen name="Daily Report" options={{ drawerIcon:()=>(<FontAwesome5 name="clock" size={18} color="#489fff" />)}} component={DailyReport} />
        <Drawer.Screen name="Monthly Summary" options={{ drawerIcon:()=>(<FontAwesome5 name="list" size={18} color="#489fff" />)}} component={MonthlySummary} />
        <Drawer.Screen name="Monthly Plan" options={{ drawerIcon:()=>(<FontAwesome5 name="bars" size={18} color="#489fff" />)}} component={MonthlyPlan} />
        <Drawer.Screen name="Syllabus" options={{ drawerIcon:()=>(<FontAwesome5 name="book" size={18} color="#489fff" />)}} component={Syllabus} />
        <Drawer.Screen name="Accomplishment" options={{ drawerIcon:()=>(<FontAwesome5 name="clock" size={18} color="#489fff" />)}} component={Accomplishment} />
        <Drawer.Screen name="Counselor" options={{ drawerIcon:()=>(<FontAwesome5 name="users" size={14} color="#489fff" />)}} component={Counselor} />
        <Drawer.Screen name="Reviewee" options={{ drawerIcon:()=>(<FontAwesome5 name="comment" size={18} color="#489fff" />)}} component={Reviewee} />
        <Drawer.Screen name="Account" options={{ drawerIcon:()=>(<FontAwesome5 name="user" size={18} color="#489fff" />)}} component={Account} />
        <Drawer.Screen name="Contact Us" options={{ drawerIcon:()=>(<FontAwesome5 name="address-card" size={14} color="#489fff" />)}} component={Contactus} />
        {/* 
        <Drawer.Screen name="About Us" options={{ drawerIcon:()=>(<FontAwesome5 name="address-book" size={18} color="#489fff" />)}} component={Aboutus} />
        */}
        {/*<Drawer.Screen name="Settings" options={{ drawerIcon:()=>(<FontAwesome5 name="cog" size={14} color="#489fff" />)}} component={Settings} /> */}
        <Drawer.Screen name="Notifications" options={{ drawerIcon:()=>(<Icon name="bell" size={14} color='#489fff'/>)}} component={Notification} />
        <Drawer.Screen name=" Change Password" options={{ drawerIcon:()=>(<Icon name="lock" size={14} color='#489fff'/>)}} component={ChangePassword} />
        <Drawer.Screen name="Privacy Policy" options={{ drawerIcon:()=>(<FontAwesome5 name="address-book" size={18} color="#489fff" />)}} component={PrivacyPolicy } />
        
      </Drawer.Navigator>
      
    
  );
};

export default AppStack;

const styles = StyleSheet.create({});
