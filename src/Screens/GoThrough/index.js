import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import CustomButton from '../../Components/Button';
import CustomText from '../../Components/Text';
import {styles} from './index.style';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../../Constants/theme';
const GoThrough = ({navigation}) => {
  return (
    <FastImage source={images.Background} style={{flex: 1}}>
      <View style={{marginHorizontal: 25}}>
        <View style={{height: 120}} />
        <View>
          <CustomText
            text={'The Magic of Instant Translation at Your Fingertips!'}
            style={styles.App_title_txt}
          />
          <CustomText
            text={'Sign In to your account'}
            style={styles.title_txt}
          />
          <TouchableOpacity style={[styles.container,{marginTop:25}]}>
            <Image source={images.Google_Icon} style={{marginRight: 20}} />
            <CustomText style={styles.txt} text={'Sign in with google'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <Image source={images.Facebook_Logo} style={{marginRight: 20}} />
            <CustomText style={styles.txt} text={'Sign in with facebook'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={styles.container_Email}>
            <CustomText style={{color:COLORS.text_white}} text={'Continue with email'} />
          </TouchableOpacity>
          <View style={styles.devider_View}/>
          <TouchableOpacity
          onPress={()=> navigation.navigate('SignUp')}
          style={[styles.container,{marginTop:30}]}>
            <CustomText style={styles.txt} text={'Create an account'} />
          </TouchableOpacity>
        </View>
      </View>
    </FastImage>
  );
};

export default GoThrough;
