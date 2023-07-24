import {View, FlatList, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import BackButton from '../../Components/Back Button';
import CustomText from '../../Components/Text';
import {styles} from './index.style';
import {COLORS} from '../../Constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Translations = ({navigation}) => {
  const Data = [
    {
      id: 1,
      langTitle: 'English',
    },
    {
      id: 2,
      langTitle: 'English',
    },
    {
      id: 3,
      langTitle: 'English',
    },
    {
      id: 4,
      langTitle: 'English',
    },
    {
      id: 5,
      langTitle: 'English',
    },
  ];

  return (
    <FastImage source={images.Background} style={{flex: 1}}>
      <View style={styles.main_container}>
        <View style={styles.header}>
          <BackButton onPressBack={() => navigation.goBack()} />
          <View
            style={{backgroundColor: 'white', borderRadius: 6, marginTop: 15}}>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
              <Ionicons
                name={'globe-outline'}
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card_view}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              height: 35,
            }}>
            <CustomText text={'English'} style={{color: '#949494'}} />
            <Ionicons name={'chevron-down'} size={20} color={'#949494'} />
          </View>
          <View style={{height: 1, backgroundColor: '#949494'}}></View>
          <View style={styles.Search_field}>
            <TextInput
              placeholder="Search here to translate"
              placeholderTextColor={'#949494'}></TextInput>
            <Ionicons name={'close'} size={25} color={'#949494'} />
          </View>
          <View style={{height: 1, backgroundColor: '#949494'}}></View>
          <View
            style={{
              alignItems: 'flex-end',
              alignContent: 'center',
              justifyContent: 'center',
              height: 35,
            }}>
            <Feather name={'copy'} size={20} color={'#949494'} />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Data}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlist_container}>
                <View style={styles.card_view}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      height: 35,
                    }}>
                    <CustomText
                      text={item.langTitle}
                      style={{color: '#949494'}}
                    />
                    <Ionicons
                      name={'chevron-down'}
                      size={20}
                      color={'#949494'}
                    />
                  </View>
                  <View style={{height: 1, backgroundColor: '#949494'}}></View>
                  <View style={styles.Search_field}>
                    {/* <TextInput
                      placeholder="Search here to translate"
                      placeholderTextColor={'#949494'}></TextInput> */}
                    <CustomText
                      text={'Ei'}
                      style={{color: COLORS.text_placeholder}}
                    />
                    <Ionicons name={'close'} size={25} color={'#949494'} />
                  </View>
                  <View style={{height: 1, backgroundColor: '#949494'}}></View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      alignContent: 'center',
                      justifyContent: 'center',
                      height: 35,
                    }}>
                    <Feather name={'copy'} size={20} color={'#949494'} />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </FastImage>
  );
};

export default Translations;
