import React from 'react';
import {Alert} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from '../aseets/Icons';

//AuthNavigator
import LoginScreen from '../screens/Global/Auth/LoginScreen';
import SignupScreen from '../screens/Global/Auth/SignupScreen';
import TermsScreen from '../screens/Global/Auth/TermsScreen';

//HospitalNavigator_NormalUser
import HospitalHomeScreen from '../screens/NormalUser/Hospital/HospitalHomeScreen';
import BodyPartScreen from '../screens/NormalUser/Hospital/BodyPartScreen';
import MedicalDepartmentScreen from '../screens/NormalUser/Hospital/MedicalDepartmentScreen';

//HelathNavigator_NormalUser
import HealthScreen from '../screens/NormalUser/Health/HealthScreen';

//UserInfoNavigator_NormalUser
import UserInfoScreen from '../screens/NormalUser/UserInformation/UserInfoScreen';

//UserInfoNavigator_HospitalOwner
import HospitalRegistHomeScreen from '../screens/HospitalOwner/HospitalRegist/HospitalRegistHomeScreen';
import HospitalRegistScreen from '../screens/HospitalOwner/HospitalRegist/HospitalRegistScreen';

const patientColor = 'rgb(136,95,255)';
const hospitalOwnerColor = 'rgb(66,153,174 )';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//AuthNavigator
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

//HelathNavigator_NormalUser
const HealthNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="health"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="health" component={HealthScreen} />
    </Stack.Navigator>
  );
};

//UserInfoNavigator_NormalUser
const UserInfoNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="userInfo"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="userInfo" component={UserInfoScreen} />
    </Stack.Navigator>
  );
};

//HospitalNavigator_NormalUser
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

//UserInfoNavigator_HospitalOwner
const HospitalRegistNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName="hospitalRegistHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="hospitalRegistHome"
        component={HospitalRegistHomeScreen}
      />
      <Stack.Screen name="hospitalRegist" component={HospitalRegistScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = props => {
  //추후 redux에서 전달 받은 userClass로 바꿔야할듯..?
  console.log(
    '로그인 스크린에서 받은 userId : ' + props.route.params.userId,
    '로그인 스크린에서 받은 userClass : ' + props.route.params.userClass,
  );

  //비로그인 혹은 로그인한 userClass가 일반사용자(환자)인 경우
  if (
    props.route.params.userClass === 'normalUser' ||
    props.route.params.userClass === 'null'
  ) {
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
          //(비로그인 로그인화면 안내) --> 지금은 바로 안내되는 문제 & 로그인 스크린 진입 시 바텀탭 보이는 문제 있음
          //추후 redux관리로 바꾸면 사용자에게 "로그인을 해야합니다. 하시러 가겠어요?" 라는 Alert창 보여주기
          /*component={
            props.route.params.userClass === null
              ? LoginScreen
              : HealthNavigator
          }*/
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
          //(비로그인 로그인화면 안내) --> 지금은 바로 안내되는 문제 & 로그인 스크린 진입 시 바텀탭 보이는 문제 있음
          //추후 redux관리로 바꾸면 사용자에게 "로그인을 해야합니다. 하시러 가겠어요?" 라는 Alert창 보여주기
          /*component={
            props.route.params.userClass === null
              ? LoginScreen
              : UserInfoNavigator
          }*/
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
  }
  //로그인한 userClass가 병원소유자인 경우
  else if (props.route.params.userClass === 'hospitalOwner') {
    return (
      <Tab.Navigator
        initialRouteName="병원 등록하기"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: hospitalOwnerColor, //바텀탭 Icon focus색상
          tabBarInactiveTintColor: 'black', //바텀탭 Icon unFocus색상
        }}>
        <Tab.Screen
          name="병원 등록하기"
          component={HospitalRegistNavigator}
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
  }
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
