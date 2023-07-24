import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './index.style';
import CustomText from '../../Components/Text';
import InputField from '../../Components/InputFiled';
import CustomButton from '../../Components/Button';
import BackButton from '../../Components/Back Button';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';

const ResetPassword = ({navigation, route}) => {
  const {ids} = route.params;
  console.log('iddddd', ids);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const AddNewPassword = () => {
    let data = new FormData();
    data.append('id', ids);
    data.append('password', password);
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://customdemo.website/apps/recon-security/public/api/update-forget-password',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        handleSubmit();
        navigation.navigate('Login');

        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
  };
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  return (
    <FastImage source={images.Background} style={{flex: 1}}>
      <BackButton onPressBack={() => navigation.goBack()} />

      <View style={{height: 100}}></View>
      <View style={styles.container}>
        <CustomText text={'Reset Your Password'} style={styles.screen_title} />
        <InputField
          placeholder={'NewPassword'}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <InputField
          placeholder={'ReEnter Password'}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {passwordError && <CustomText text={setPasswordError()} />}

        <CustomButton
          buttonText={'Submit'}
          onPress={() => {
            AddNewPassword();
          }}
        />
      </View>
    </FastImage>
  );
};

export default ResetPassword;
