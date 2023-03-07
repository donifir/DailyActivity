import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '../screen/intro/Intro';
import Home from '../screen/home';
import WelcomeScreen from '../screen/welcomeScreen';
import LoginScreen from '../screen/auth/login';
import RegisterScreen from '../screen/auth/register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import SplashScreen from '../screen/splasScreen';
import ModalCreate from '../componen/modal/modalCreate';
import ListPengingat from '../screen/detailPengingat/list';
import EditKegiatanScreen from '../screen/detailPengingat/edit';
import ModalEditPengingat from '../componen/modal/modalEditPengingat';

export type RootStackParamList = {
  intro: undefined;
  home: undefined;
  welcomeScreen: undefined;
  loginScreen: undefined;
  registerScreen: undefined;
  ModalForm: undefined;
  ListPengingat:{kegiatanId:any};
  EditKegiatanScreen:{kegiatanId:string};
  EditPengingatScreen:{pengingatId:string};
};

const StackNavigation = () => {
  const [token, setToken] = useState<string>('');

  const RootStack = createStackNavigator<RootStackParamList>();
  const redirect = useAppSelector(state => state.auth.isRedirect);
  const dispatch = useAppDispatch()

  const getData = async () => {
    try {
      const valueToken = await AsyncStorage.getItem('token');
      if (valueToken !== null) {
        console.log(valueToken, 'ini value token');
        setToken(valueToken);

      } else {
        setToken('');
      }
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, [redirect, token]);

  if (redirect === true) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator
      initialRouteName="intro"
      screenOptions={{headerShown: false}}>
      {token ? (
        <>
          <RootStack.Group>
            <RootStack.Screen name="home" component={Home} />
            <RootStack.Screen name="ListPengingat" component={ListPengingat} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{presentation: 'modal'}}>
            <RootStack.Screen name="ModalForm" component={ModalCreate} />
            <RootStack.Screen name="EditKegiatanScreen" component={EditKegiatanScreen} />
            <RootStack.Screen name="EditPengingatScreen" component={ModalEditPengingat} />
          </RootStack.Group>
        </>
      ) : (
        <>
          <RootStack.Group>
            <RootStack.Screen name="intro" component={Intro} />
            <RootStack.Screen name="welcomeScreen" component={WelcomeScreen} />
            <RootStack.Screen name="loginScreen" component={LoginScreen} />
            <RootStack.Screen name="registerScreen" component={RegisterScreen} />
          </RootStack.Group>
        </>
      )}
    </RootStack.Navigator>
  );
};

export default StackNavigation;
