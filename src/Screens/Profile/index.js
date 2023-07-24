import {View, Text, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import {styles} from './index.style';
import BackButton from '../../Components/Back Button';
import CustomText from '../../Components/Text';
import CustomButton from '../../Components/Button';

const Profile = ({navigation}) => {
  return (
    <FastImage source={images.Background} style={{flex: 1}}>
      <View style={styles.main_container}>
        <BackButton onPressBack={() => navigation.goBack()} />
        <View style={{marginHorizontal: 20, marginTop:30}}>
            <Image source={images.logo} style={{height:70, width:70, alignSelf:'center'}}/>
          <CustomText text={'Profile'} style={styles.title} />
          <View style={styles.name_view}>
            <CustomText text={'Name'} />
          </View>
          <View style={styles.name_view}>
            <CustomText text={'Example@gmail.com'} />
          </View>
        <CustomButton buttonText={'Edit Profile'} onPress={()=> navigation.navigate('EditProfile')}/>
        <CustomButton buttonText={'LogOut'} onPress={()=>navigation.navigate('Login')}/>
 
        </View>
      </View>
    </FastImage>
  );
};

export default Profile;
