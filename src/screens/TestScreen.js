import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import HeaderBar from '../components/Global/HeaderBar';
import Icons from '../aseets/Icons';

const TestScreen = props => {
  return (
    <SafeAreaView>
      <HeaderBar.leftCenter
        leadingAction={() => {
          props.navigation.goBack();
        }}
        leadingIcon={<Icons.arrowBack />}
        centerTitle="TestScreen"
      />
      <Text>This is a TestScreen!</Text>
    </SafeAreaView>
  );
};

export default TestScreen;
