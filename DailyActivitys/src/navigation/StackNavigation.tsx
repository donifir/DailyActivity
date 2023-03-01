import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../screen/intro/Intro';
import Home from '../screen/home';
import WelcomeScreen from '../screen/welcomeScreen';
import LoginScreen from '../screen/auth/login';
import RegisterScreen from '../screen/auth/register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppSelector} from '../app/hooks';
import SplashScreen from '../screen/splasScreen';

export type RootStackParamList = {
  intro: undefined;
  home: undefined;
  welcomeScreen: undefined;
  loginScreen: undefined;
  registerScreen: undefined;
};

const StackNavigation = () => {
  const [token, setToken] = useState<string>('');

  const RootStack = createStackNavigator<RootStackParamList>();
  const redirect = useAppSelector(state => state.auth.isRedirect);

  useEffect(() => {
    getData();
  }, [redirect, token]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log(value, 'ini value token');
        setToken(value);
      } else {
        setToken('');
      }
    } catch (e) {}
  };

  if (redirect === true) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator
      initialRouteName="intro"
      screenOptions={{headerShown: false}}>
      {token ? (
        <>
          <RootStack.Screen name="home" component={Home} />
        </>
      ) : (
        <>
          <RootStack.Screen name="intro" component={Intro} />
          <RootStack.Screen name="welcomeScreen" component={WelcomeScreen} />
          <RootStack.Screen name="loginScreen" component={LoginScreen} />
          <RootStack.Screen name="registerScreen" component={RegisterScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default StackNavigation;
