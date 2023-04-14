import React, {useCallback} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useSelector} from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect} from '@react-navigation/native';
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

//HospitalNavigator_NormalUser & Guest
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
  // authSlice에서 가져온 userClass
  const userClass = useSelector(state => state.auth.userClass);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // 게스트 사용자에게 로그인 안내 알림창. _건강기록, 내정보와 같은 탭을 눌렀을 때 필요함.
  const ShowLoginScreen = useCallback(() => {
    Alert.alert('안내', '로그인이 필요한 서비스입니다.', [
      {
        text: '취소',
        style: 'cancel',
        onPress: () => props.navigation.navigate('hospitalHome'),
      },
      {
        text: '로그인 하러가기',
        onPress: () => props.navigation.navigate('auth'),
      },
    ]);
  }, [ShowLoginScreen]);

  //게스트로그인 혹은 로그인한 userClass가 일반사용자(환자)인 경우
  if (userClass === 'normalUser' || userClass === 'guest') {
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
          component={isLoggedIn ? HealthNavigator : ShowLoginScreen}
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
          component={isLoggedIn ? UserInfoNavigator : ShowLoginScreen}
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
  else if (isLoggedIn & (userClass === 'hospitalOwner')) {
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
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    //state.auth.isLoggedIn을 통해 사용자 인증.
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'main' : 'auth'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="auth" component={AuthStackNavigator} />
      <Stack.Screen name="main" component={MainNavigator} />
    </Stack.Navigator>
  );
};
