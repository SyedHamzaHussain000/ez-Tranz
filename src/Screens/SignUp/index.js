import {View, Text, TouchableOpacity, ScrollView,Image} from 'react-native';
import React, {useState} from 'react';
import {styles} from './index.style';
import CustomText from '../../Components/Text';
import InputField from '../../Components/InputFiled';
import CustomButton from '../../Components/Button';
import {RadioButton} from 'react-native-paper';
import BackButton from '../../Components/Back Button';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import {COLORS} from '../../Constants/theme';

const SignUp = ({navigation}) => {
  const [checked, setChecked] = useState('first');

  return (
    <FastImage source={images.Background} style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <BackButton onPressBack={() => navigation.goBack()} />
        <Image source={images.logo} style={{height:70, width:70, alignSelf:'center', marginTop:20}}/>

        <View style={styles.main_container}>
          <View style={styles.container}>
            <CustomText
              text={'Create an account'}
              style={styles.screen_title}
            />
            <InputField
              placeholder={'Full Name'}
              // value={name}
            />
            <InputField
              placeholder={'Email Address'}
              // value={email}
            />
            <InputField
              placeholder={'password'}
              // value={password}

              secureTextEntry
            />
            <InputField
              placeholder={'Re-type Password'}
              // value={confirmPassword}

              secureTextEntry
            />
            <View style={styles.checkView}>
              <RadioButton
                value="first"
                color={COLORS.primary}
                uncheckedColor="#949494"
                status={checked === 'first' ? 'checked' : 'unchecked'}
              />
              <CustomText
                text={'I have read and accept the '}
                style={styles.termsText}
              />
              <TouchableOpacity>
                <CustomText
                  text={'terms and conditions'}
                  style={styles.termsTxt}
                />
              </TouchableOpacity>
            </View>
            <CustomButton onPress={()=> navigation.navigate('Login')} buttonText={'Create an account'} />
          </View>
        </View>
      </ScrollView>
    </FastImage>
  );
};

export default SignUp;
