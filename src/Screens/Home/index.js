import {View, Text, TextInput, FlatList, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import BackButton from '../../Components/Back Button';
import CustomText from '../../Components/Text';
import {styles} from './index.style';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {COLORS} from '../../Constants/theme';

const Home = ({navigation}) => {
  const FlagsData = [
    {
      id: 1,
      image: images.Flag_of_United_States_Flat_Round,
    },
    {
      id: 2,
      image: images.Flag_of_Argentina_Flat_Round,
    },
    {
      id: 3,
      image: images.Flag_of_Australia_Flat_Round,
    },
    {
      id: 4,
      image: images.Flag_of_Brazil_Flat_Round,
    },
    {
      id: 5,
      image: images.Flag_of_Canada_Flat_Round,
    },
    {
      id: 6,
      image: images.Flag_of_England_Flat_Round,
    },
    {
      id: 7,
      image: images.Flag_of_Germany_Flat_Round,
    },
    {
      id: 8,
      image: images.Flag_of_Finland_Flat_Round,
    },
    {
      id: 7,
      image: images.Flag_of_Argentina_Flat_Round,
    },
    {
      id: 8,
      image: images.Flag_of_United_States_Flat_Round,
    },
  
  ];

  return (
    <FastImage source={images.Background} style={{flex: 1}}>

      <BackButton onPressBack={() => navigation.goBack()} />
      <View style={styles.main_container}>
        <CustomText
          text={'Choose Mother Language'}
          style={styles.screen_title}
        />
        <View style={styles.Search_field}>
          <TextInput
            placeholder="Search here.."
            placeholderTextColor={'#949494'}></TextInput>
          <EvilIcons name={'search'} size={25} color={'#949494'} />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={FlagsData}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View style={styles.flatlist_container}>
                <View style={styles.card}>
                  <TouchableOpacity onPress={()=> navigation.navigate('Translations')}>

                  <Image source={item.image} style={styles.flag_container} />
                  </TouchableOpacity>
            
                </View>
              </View>
            );
          }}
        />
      </View>
    </FastImage>
  );
};

export default Home;
