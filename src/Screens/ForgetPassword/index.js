import {View,Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './index.style';
import CustomText from '../../Components/Text';
import InputField from '../../Components/InputFiled';
import CustomButton from '../../Components/Button';
import BackButton from '../../Components/Back Button';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';

const ForgetPassword = ({navigation, route}) => {
  const [email, setEmail] = useState('');

  const VerifyEmail = () => {
    console.log('gggggggg');
    // return
    const FormData = require('form-data');
    let data = new FormData();
    data.append('email', email);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://customdemo.website/apps/recon-security/public/api/valid-email',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        navigation.navigate('Otp', {
          itemId: 1,
          id: response.data.data.id
        });
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const emptyStats =()=>{
  
  }
  return (
    <FastImage source={images.Background} style={{flex: 1}}>

    <View style={styles.main_container}>
      <BackButton onPressBack={() => navigation.goBack()} />
      <Image source={images.logo} style={{height:70, width:70, alignSelf:'center', marginTop:40}}/>

      <View style={{height: 80}}></View>
      <View style={styles.container}>
        <CustomText text={'Enter Your Email'} style={styles.screen_title} />
        <InputField
          placeholder={'Email'}
          value={email}
          onChangeText={setEmail}
          keyboardType={'email-address'}
        />

        <CustomButton
          buttonText={'Submit'}
          onPress={() => {
      
            navigation.navigate('Otp')
          }}
        />
      </View>
    </View>
    </FastImage>
  );
};

export default ForgetPassword;
