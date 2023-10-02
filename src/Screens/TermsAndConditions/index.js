import React from "react";
import { View, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

const source = {
  html: `
  <h1 style='margin-top:12.0pt;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;font-size:21px;font-family:"Calibri Light",sans-serif;color:#2F5496;font-weight:normal;'>Terms and conditions:</h1>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>1. Acceptance of Terms: By using our translation app, you agree to be bound by the following terms and conditions.</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>2. Use of Services: The translation app provides automated translation services. You may use the app for personal and non-commercial purposes only.</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>3. Accuracy of Translations: Our translation app utilizes advanced technology, but we cannot guarantee the accuracy or reliability of translations. You acknowledge&nbsp;that translation errors may occur, and you use the app at your own risk.</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>4. Intellectual Property: All intellectual property rights in the translation app and its content are owned by us, unless otherwise stated. You may not use, copy, reproduce, modify, distribute, or transmit any part of the app without our prior&nbsp;written consent.</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>5. Limitation of Liability: We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with the use of our translation app.</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
  <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>6. Modifications: We reserve the right to modify or discontinue the translation app, with or without notice to users. we shall not be liable to you or any third party for any modification, suspension, or discontinuation of the app.</p>
  <p><a href="blob:https%3A//wordtohtml.net/5a98818a-8fb5-441f-8164-a78973cf822f" class="fr-file"></a><br></p>`,
};

const privacyPolicy = {
  html: `
    <h1 style='margin-top:12.0pt;margin-right:0cm;margin-bottom:0cm;margin-left:0cm;font-size:21px;font-family:"Calibri Light",sans-serif;color:#2F5496;font-weight:normal;'>Privacy Policy:</h1>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>1. Information collection: We may collect personal information, such as your name, email address, and device information, to provide you with translation services and improve the app&apos;s performance.</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>2. Use of Information: Personal information collected by us will be used for the purpose of providing translation services, enhancing user experience, and communicating with you about app updates and features.</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>3. Data Security: We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or alteration. However we cannot guarantee the absolute security of your information.</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>4. Third-Party Services: Our translation app may integrate with third-party services, such as language databases or cloud storage providers. Your use of such services may be subject to their respective privacy policies and terms of use.</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>&nbsp;</p>
    <p style='margin:0cm;font-size:15px;font-family:"Calibri",sans-serif;'>5. Data Retention: We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected or as required by applicable laws.</p>
    `,
};
const TermsAndConditions = ({route}) => {
    const navigatedFrom = route.params?.navigatedFrom

  const { width } = useWindowDimensions();

  return (<>
    {navigatedFrom === 'TermsAndConditions' ? (

    <View style={{ padding: 15 }}>
      <RenderHtml contentWidth={width} source={source} />
    </View>
    ): (

     <View style={{ padding: 15 }}>
     <RenderHtml contentWidth={width} source={privacyPolicy} />
   </View>
    )}
  </>
  );
};

export default TermsAndConditions;
