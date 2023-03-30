import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import TestScreen from '../screens/Auth/TestScreen';

const Stack = createStackNavigator();

export const AuthNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="test" component={TestScreen} />
    </Stack.Navigator>
  );
};
