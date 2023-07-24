import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import Translations from '../Screens/Translations';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/EditProfile';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Translations" component={Translations} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />

    </Stack.Navigator>
  );
};

export default MainStack;
