import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Route from './src/Navigation/Route';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

const App = () => {
  let persistor = persistStore(store);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Route />
          <Toast />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
