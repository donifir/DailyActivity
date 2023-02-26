import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro1 from '../screen/intro/Intro1';

export type RootStackParamList = {
  intro1: undefined;
};

const StackNavigation = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  return (
    <RootStack.Navigator initialRouteName="intro1" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="intro1" component={Intro1} />
    </RootStack.Navigator>
  );
};

export default StackNavigation;
