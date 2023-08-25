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
import BassUrl from '../../BassUrl';
import Toast from "react-native-toast-message";
import { LoaderModal } from '../../Components';

const ForgetPassword = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const VerifyEmail = () => {
    console.log('verfyEmaillllllllllll');
    // return
    setIsLoader(true);

    const FormData = require('form-data');
    let data = new FormData();
    data.append('email', email);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BassUrl}/api/valid-email`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setIsLoader(false);

        if( response.data.success === true){

          navigation.navigate('Otp', {
            id: response.data.data.id
          });
          console.log(JSON.stringify(response.data));
        }else {
          showToast('error', response.data.message)
          console.log('Email not exists')
        }
      })
      .catch(error => {
        setIsLoader(false);

        console.log(error);
      });
  };
  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

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
    {isLoader ? (
      <LoaderModal/>
    ): (

        <CustomButton
          buttonText={'Submit'}
          onPress={() => {
            VerifyEmail()
          }}
        />
    )}
      </View>
    </View>
    <Toast />

    </FastImage>
  );
};

export default ForgetPassword;
