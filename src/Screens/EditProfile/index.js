import {View, Text, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import {styles} from './index.style';
import BackButton from '../../Components/Back Button';
import CustomText from '../../Components/Text';
import CustomButton from '../../Components/Button';
import InputField from '../../Components/InputFiled';


const EditProfile = ({navigation}) => {
  return (
    <FastImage source={images.Background} style={{flex: 1}}>
    <View style={styles.main_container}>
      <BackButton onPressBack={() => navigation.goBack()} />
      <View style={{marginHorizontal: 20, marginTop:30}}>
          <Image source={images.logo} style={{height:70, width:70, alignSelf:'center'}}/>
        <CustomText text={'Edit Profile'} style={styles.title} />
        <View style={styles.name_view}>
          <InputField placeholder={'Name'}/>
        </View>
        <View style={styles.name_view}>
        <InputField placeholder={'Email'}/>

        </View>
      <CustomButton buttonText={'Submit'} onPress={()=> navigation.navigate('Profile')}/>

      </View>
    </View>
  </FastImage>
  )
}

export default EditProfile