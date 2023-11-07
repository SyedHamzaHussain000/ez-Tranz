import {View, Text, Image, Alert} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import {styles} from './index.style';
import BackButton from '../../Components/Back Button';
import CustomText from '../../Components/Text';
import CustomButton from '../../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Redux/authSlice';
import Toast from "react-native-toast-message";
import axios from 'axios';
import BassUrl from '../../BassUrl';

const Profile = ({navigation}) => {
  const userData = useSelector((state) => state.data.user);
  const {token} = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const deleteAccount = () => {
    Alert.alert(
      "Delete Accountn",
      "Are you sure, you want to delete your account?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Yes", onPress: () => accountDeletionRequest()}
      ]
    );
  }


  const accountDeletionRequest = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BassUrl}/api/delete-user/${userData.id}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    };
    
    axios.request(config)
    .then((response) => {
      if(response.data.success){
        dispatch(logOut())
        Toast.show({
          type: 'success',
          text1: 'Your account deleted successfully'
      })
      }else {
        Toast.show({
          type: 'error',
          text1: response.data.message
      })
      }
    })
    .catch((error) => {
      Toast.show({
        type: 'error',
        text1: error.message
      })
    });
  }

  return (
    <FastImage source={images.Background} style={{flex: 1}}>
      <View style={styles.main_container}>
        <BackButton onPressBack={() => navigation.goBack()} />
        <View style={{marginHorizontal: 20, marginTop:30}}>
            <Image source={images.logo} style={{height:70, width:70, alignSelf:'center'}}/>
          <CustomText text={'Profile'} style={styles.title} />
          <View style={styles.name_view}>
            <CustomText text={userData.name} />
          </View>
          <View style={styles.name_view}>
            <CustomText text={userData.email} />
          </View>
        <CustomButton buttonText={'Edit Profile'} textStyle={{fontWeight: 'bold'}} onPress={()=> navigation.navigate('EditProfile')}/>
        <CustomButton buttonText={'LogOut'} textStyle={{fontWeight: 'bold'}} onPress={()=> dispatch(logOut())}/>
        <CustomButton buttonText={'Delete Account'} style={{backgroundColor: 'red', borderWidth: 2, borderColor: 'white'}} textStyle={{fontWeight: 'bold'}} onPress={()=> deleteAccount()}/>
 
        </View>
      </View>
    </FastImage>
  );
};

export default Profile;
