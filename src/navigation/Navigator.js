import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();

export const Navigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="test" component={TestScreen} />
    </Stack.Navigator>
  );
};
