import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Image
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './index.style';
import CustomText from '../../Components/Text';
import InputField from '../../Components/InputFiled';
import CustomButton from '../../Components/Button';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';

const Login = ({navigation}) => {
  //stats
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);
  //  const dispatch = useDispatch();

  return (
    <>
      <FastImage source={images.Background} style={{flex: 1}}>
      <Image source={images.logo} style={{height:70, width:70, alignSelf:'center', marginTop:40}}/>

        <ScrollView style={{flex: 1}}>

          <View style={styles.main_container}>
            <View style={styles.container}>
              <CustomText
                text={'Sign In with email or username'}
                style={styles.screen_title}
              />
              <InputField
                placeholder={'username or email'}
                // value={email}
                // onChangeText={setEmail}
                keyboardType={'email-address'}
              />
              <InputField
                placeholder={'password'}
                // value={password}
                // onChangeText={text => setPassword(text)}
                secureTextEntry
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgetPassword');
                }}
                style={{alignSelf: 'flex-end', marginTop: 10}}>
                <CustomText text={'forgot password?'} style={{fontSize: 14}} />
              </TouchableOpacity>

              <CustomButton
                buttonText={'Sign In'}
                onPress={() => {
                  navigation.navigate('MainStack')
                  //   loginUser();
                }}
                // isDisabled={isLoading}
              />

              {/* {isLoading && <ActivityIndicator size={80} color="gray" />} */}
              <View style={styles.devider_View} />

              <TouchableOpacity style={{alignSelf: 'center', marginTop: 10}}>
                <CustomText
                  text={'Dont have an account?'}
                  style={{fontSize: 14}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={[styles.container_create, {marginTop: 30}]}>
                <CustomText style={styles.txt} text={'Create an account'} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </FastImage>
      {/* <Toast /> */}
    </>
  );
};

export default Login;
