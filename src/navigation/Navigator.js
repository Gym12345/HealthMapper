import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import TestScreen from '../screens/Auth/TestScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

const Stack = createStackNavigator();

export const AuthNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="test" component={TestScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};
