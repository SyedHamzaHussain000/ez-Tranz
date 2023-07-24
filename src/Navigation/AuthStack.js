import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import GoThrough from '../Screens/GoThrough';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/LogIn';
import ForgetPassword from '../Screens/ForgetPassword';
import ResetPassword from '../Screens/Resetpassword';
import Otp from '../Screens/Otp';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="GoThrough">
      <Stack.Screen name="GoThrough" component={GoThrough} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
