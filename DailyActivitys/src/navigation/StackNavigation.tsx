import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../screen/intro/Intro';
import Home from '../screen/home';
import WelcomeScreen from '../screen/welcomeScreen';
import LoginScreen from '../screen/auth/login';

export type RootStackParamList = {
  intro: undefined;
  home: undefined;
  welcomeScreen: undefined;
  loginScreen:undefined
};

const StackNavigation = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  return (
    <RootStack.Navigator initialRouteName="intro" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="intro" component={Intro} />
      <RootStack.Screen name="home" component={Home} />
      <RootStack.Screen name="welcomeScreen" component={WelcomeScreen} />
      <RootStack.Screen name="loginScreen" component={LoginScreen} />
    </RootStack.Navigator>
  );
};

export default StackNavigation;
