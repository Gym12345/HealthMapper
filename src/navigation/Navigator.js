import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from '../aseets/Icons';

//AuthNavigator
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import TermsScreen from '../screens/Auth/TermsScreen';

//HospitalNavigator
import HospitalHomeScreen from '../screens/Hospital/HospitalHomeScreen';
import BodyPartScreen from '../screens/Hospital/BodyPartScreen';
import MedicalDepartmentScreen from '../screens/Hospital/MedicalDepartmentScreen';

//HelathNavigator
import HealthScreen from '../screens/Health/HealthScreen';

//UserInfoNavigator
import UserInfoScreen from '../screens/UserInformation/UserInfoScreen';

const patientColor = 'rgb(136,95,255)';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="terms" component={TermsScreen} />
    </Stack.Navigator>
  );
};

const HealthNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="health"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="health" component={HealthScreen} />
    </Stack.Navigator>
  );
};

const UserInfoNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="userInfo"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="userInfo" component={UserInfoScreen} />
    </Stack.Navigator>
  );
};

const HospitalNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="hospitalHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="hospitalHome" component={HospitalHomeScreen} />
      <Stack.Screen name="bodyPart" component={BodyPartScreen} />
      <Stack.Screen
        name="medicalDepartment"
        component={MedicalDepartmentScreen}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName="병원 추천받기"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: patientColor, //바텀탭 Icon focus색상
        tabBarInactiveTintColor: 'black', //바텀탭 Icon unFocus색상
      }}>
      <Tab.Screen
        name="병원 추천받기"
        component={HospitalNavigator}
        options={{
          tabBarIcon: ({focused, color}) => {
            return focused ? (
              <Icons.hospital color={color} />
            ) : (
              <Icons.hospital color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="건강기록"
        component={HealthNavigator}
        options={{
          tabBarIcon: ({focused, color}) => {
            return focused ? (
              <Icons.health color={color} />
            ) : (
              <Icons.health color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="내 정보"
        component={UserInfoNavigator}
        options={{
          tabBarIcon: ({focused, color}) => {
            return focused ? (
              <Icons.userInfo color={color} />
            ) : (
              <Icons.userInfo color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="auth"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="auth" component={AuthStackNavigator} />
      <Stack.Screen name="main" component={MainNavigator} />
    </Stack.Navigator>
  );
};
