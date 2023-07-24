import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Route from './src/Navigation/Route';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer >
      {/* <StatusBar animated={true} backgroundColor="#E21A18" /> */}
      <Route />
    </NavigationContainer>
  );
};

export default App;
