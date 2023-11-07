import {View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import CustomText from '../../Components/Text';
import {styles} from './index.style';
import {COLORS} from '../../Constants/theme';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import BassUrl from '../../BassUrl';
import {useDispatch} from 'react-redux';
import {UserLogin, turnSneakPeekState} from '../../Redux/authSlice';
import axios from 'axios';
import {LoaderModal} from '../../Components';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import Fontisto from 'react-native-vector-icons/Fontisto';

const GoThrough = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = async () => {
    try {
      GoogleSignin.configure({
        // webClientId: "6466219219",
        webClientId:
          '935651938156-05f6v7u8ik2hkef60qu4h571a6jb8cdp.apps.googleusercontent.com',
        androidClientId:
          '569166938062-q8i4085vs3jh08mcb4ue3t7u2n6ubo0v.apps.googleusercontent.com',
        offlineAccess: true,
        // scopes: ['profile', 'email']
      });
    } catch (error) {
      setIsLoader(false);

      console.error('Google Sign-In Configuration Error:', error);
    }
  };

  const googleLogIn = async () => {
    setIsLoader(true);

    try {
      setIsLoader(true);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user info >>>>>>>>>', userInfo);
      await setIsLoader(false);

      let data = new FormData();
      data.append('email', userInfo.user.email);
      data.append('name', userInfo.user.name);
      data.append('profile_image', {
        name: 'image',
        type: 'png',
        uri: userInfo.user.photo,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${BassUrl}/api/social-media-register`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
      setIsLoader(true);

      dispatch(UserLogin(config));
    } catch (error) {
      setIsLoader(false);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google Sign-In Cancelled', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign-In in Progress', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available', error);
      } else {
        console.log('Error', error);
      }
    }
  };

  const onFacebookButtonPress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
        'openid',
      ]);
      setIsLoader(true);

      console.log('resultlll >>>>>>>>', result.grantedPermissions);
      const firstPermission = result.grantedPermissions[2];
      console.log('resultlll >>>>>>>>', firstPermission);

      if (result.isCancelled) {
        setIsLoader(false);
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        setIsLoader(false);
        throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log(' facebookCredential >>>>>>>', facebookCredential.token);

      await auth()
        .signInWithCredential(facebookCredential)
        .then(res => {
          setIsLoader(false);
          console.log(res.user.photoURL);

          fetchUserData(facebookCredential?.token, res.user.photoURL);
        })
        .catch(() => {
          setIsLoader(false);
        });
    } catch (error) {
      setIsLoader(false);
      console.error('=============>>   ', error);
    }
  };

  const fetchUserData = async accessToken => {
    setIsLoader(true);
    try {
      const response = await axios.get(`https://graph.facebook.com/v15.0/me`, {
        params: {
          fields: 'id,name,email', // Specify the fields you want to retrieve
          access_token: accessToken,
        },
      });

      if (response.status === 200) {
        setIsLoader(true);

        const userData = response.data;
        const {id, name, email} = userData;
        console.log(`User ID: ${id}`);
        console.log(`User Name: ${name}`);
        console.log(`User Email: ${email}`);

        // console.log(
        //   "............................===============...................",
        //   userData.email
        // );

        if (userData.email) {
          setIsLoader(true);

          let data = new FormData();
          data.append('email', userData?.email);
          data.append('name', userData?.name);

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://eztrans.co/public/api/social-media-register',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: data,
          };
          dispatch(UserLogin(config));

          axios
            .request(config)
            .then(response => {
              setIsLoader(true);
              console.log(JSON.stringify(response.data));
            })
            .catch(error => {
              setIsLoader(false);

              console.log(error);
            });
        }
      } else {
        throw new Error(
          `Failed to fetch user data. Status code: ${response.status}`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchUserData = async (accessToken, imageUrl) => {
  //   try {
  //     const response = await axios.get(`https://graph.facebook.com/v15.0/me`, {
  //       params: {
  //         fields: "id,name,email", // Specify the fields you want to retrieve
  //         access_token: accessToken,
  //       },
  //     });

  //     if (response.status === 200) {
  //       const userData = response.data;

  //       const { id, name, email, photoURL } = userData;
  //       console.log(`User ID: ${id}`);
  //       console.log(`User Name: ${name}`);
  //       console.log(`User Email: ${email}`);
  //       console.log(`User photoURL: ${imageUrl}`);

  //       // Create FormData and append user data
  //       const data = new FormData();
  //       data.append("email", email);
  //       data.append("name", name);
  //       data.append("profile_image", imageUrl); // Include the profile image URL

  //       const config = {
  //         method: "post",
  //         maxBodyLength: Infinity,
  //         url:
  //           "https://eztrans.co/public/api/social-media-register",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         data: data,
  //       };

  //       // Dispatch your Redux action here if needed
  //       dispatch(UserLogin(config));

  //       axios
  //         .request(config)
  //         .then((response) => {
  //           console.log(JSON.stringify(response.data));
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } else {
  //       console.error(
  //         `Failed to fetch profile picture. Status code: ${profilePictureResponse.status}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onAppleButtonPress = async () => {
    try {
      // performs login request
      setIsLoader(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        let data = new FormData();
        data.append('apple_id', appleAuthRequestResponse.user);
        data.append('email', appleAuthRequestResponse.email);
        data.append(
          'name',
          `${appleAuthRequestResponse.fullName.givenName} ${appleAuthRequestResponse.fullName.familyName}`,
        );

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${BassUrl}/api/social-auth`,
          data: data,
        };

        setIsLoader(false);
        dispatch(UserLogin(config));
      } else {
        setIsLoader(false);
      }
    } catch (err) {
      setIsLoader(false);
      console.log('Error with Apple Sign In  ------->>      ', err);
    }
  };

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

          {isLoader ? (
            <LoaderModal />
          ) : (
            <View>
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: '100%',
                  height: 45,
                  marginTop: 25,
                }}
                onPress={() => onAppleButtonPress()}
              />
            </View>
          )}

          {isLoader ? (
            <LoaderModal />
          ) : (
            <TouchableOpacity
              onPress={() => googleLogIn()}
              style={styles.container}>
              <Image source={images.Google_Icon} style={{marginRight: 6, width: 20, objectFit: 'contain'}} />
              <CustomText style={styles.txt} text={'Sign in with google'} />
            </TouchableOpacity>
          )}
          {isLoader ? (
            <LoaderModal />
          ) : (
            <TouchableOpacity
              onPress={() => onFacebookButtonPress()}
              style={styles.container}>
              <Image source={images.Facebook_Logo} style={{marginRight: 6, width: 20, objectFit: 'contain'}} />
              <CustomText style={styles.txt} text={'Sign in with facebook'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.container_Email}>
            <CustomText
              style={{color: COLORS.text_white}}
              text={'Continue with email'}
            />
          </TouchableOpacity>
          <View style={styles.devider_View} />
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[styles.container, {marginTop: 30}]}>
            <CustomText style={styles.txt} text={'Create an account'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(turnSneakPeekState(true))}
            style={[styles.container, {marginTop: 10}]}>
            <CustomText style={styles.txt} text={'Take a sneak peak'} />
            <Fontisto
              name="eye"
              size={17}
              color={'black'}
              style={{marginLeft: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </FastImage>
  );
};

export default GoThrough;
