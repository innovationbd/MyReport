import { StyleSheet, Text, View,SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { LinearGradient } from "expo-linear-gradient";

const headertext = "Privacy Policy"
const longText1="\t\t\t\t smsamfund built the My Report app as a Free app. This SERVICE is provided by smsamfund at no cost and is intended for use as is.";
const longText2="\t\t\t\t This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.";

const longText3 = "\t\t\t\t If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.";
const longText4 = "\t\t\t\t The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at My Report unless otherwise defined in this Privacy Policy.";
const header1 = "Information Collection and Use";
const longText5 = "\t\t\t\t For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.";
const longText6 = "\t\t\t\t The app does use third-party services that may collect information used to identify you.";
const header2 = "Log Data";
const longText7 = "\t\t\t\t We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.";

const header3 = "Cookies";
const longText8 = "\t\t\t\t Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.";

const longText9 = "\t\t\t\t This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.";
const header4 = "Service Providers";
const longText10 = "\t\t\t\t We may employ third-party companies and individuals due to the following reasons:";

const longText11 = "To facilitate our Service, \n To provide the Service on our behalf, \n To perform Service-related services, \n or To assist us in analyzing how our Service is used.";

const longText12 = "\t\t\t\t We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose."

const header5 = "Security";
const longText13 = "\t\t\t\t We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.";

const header6 = "Links to Other Sites";
const longText14 = "\t\t\t\t This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.";

const header7 = "Children’s Privacy";
const longText15 = "\t\t\t\t These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.";
const header8 = "Changes to This Privacy Policy";
const longText16 = "\t\t\t\t We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. \n This policy is effective as of 2023-05-01";
const header9 = "Contact Us";
const longText17 = "\t\t\t\t If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at info@reporting.smsamfund.se";


const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.root}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#a7d49c", "#006ae3"]}
        style={styles.container}
      >
      
      <Text style={styles.headertext}>
        {headertext}
      </Text>

      <Text>
        {longText1}
        {'\n'}
      </Text> 
      <Text>
        {longText2}
        {'\n'}
      </Text> 
      <Text>
        {longText3}
        {'\n'}
      </Text> 
      <Text>
        {longText4}
        {'\n'}
      </Text> 

      <Text style={styles.headertext1}>
        {header1}
      </Text>

      <Text>
        {longText5}
        {'\n'}
      </Text>

      <Text>
        {longText6}
        {'\n'}
      </Text>  

      <Text style={styles.headertext1}>
        {header2}
      </Text>

      <Text>
        {longText7}
        {'\n'}
      </Text> 

      <Text style={styles.headertext1}>
        {header3}
      </Text>

      <Text>
        {longText8}
        {'\n'}
      </Text> 
      <Text>
        {longText9}
        {'\n'}
      </Text> 

      <Text style={styles.headertext1}>
        {header4}
      </Text>

      <Text>
        {longText10}
        {'\n'}
      </Text> 
      <Text>
        {longText11}
        {'\n'}
      </Text> 
      <Text>
        {longText12}
        {'\n'}
      </Text> 

      <Text style={styles.headertext1}>
        {header5}
      </Text>

      <Text>
        {longText13}
        {'\n'}
      </Text> 

      <Text style={styles.headertext1}>
        {header6}
      </Text>

      <Text>
        {longText14}
        {'\n'}
      </Text> 

      <Text style={styles.headertext1}>
        {header7}
      </Text>

      <Text>
        {longText15}
        {'\n'}
      </Text> 

      <Text style={styles.headertext1}>
        {header8}
      </Text>

      <Text>
        {longText16}
        {'\n'}
      </Text> 


      <Text style={styles.headertext1}>
        {header9}
      </Text>

      <Text>
        {longText17}
        {'\n'}
      </Text> 

        
        
        

      </LinearGradient>
    </ScrollView>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
  },
  headertext:{
    fontSize:30,
    fontWeight:'bold'
  },
  headertext1:{
    fontSize:20,
    fontWeight:'bold'
  }
})