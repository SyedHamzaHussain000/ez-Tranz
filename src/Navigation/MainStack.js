import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import Translations from '../Screens/Translations';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Translations" component={Translations} />

    </Stack.Navigator>
  );
};

export default MainStack;
