import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {cekLogin, resetState} from '../../features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SplashScreen = () => {
  const redirect = useAppSelector(state => state.auth.isRedirect);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('')

  // getEmail
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email')
      if(value !== null) {
        setEmail(value)
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
    if (email) {
    console.log('dataaa use efect')
      dispatch(cekLogin(email))
    }
    if (redirect === true) {
      setTimeout(() => {
        dispatch(resetState());
      }, 1700);
    }
    
  }, [redirect,email]);

  return (
    <Animated.View
      entering={FadeIn.duration(1500)}
      exiting={FadeOut.duration(1500)}
      style={[styles.wrapper]}>
      <Image
        source={require('./../../assets/image/Group6815.png')}
        style={styles.image}
      />
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth*0.8,
    height: windowWidth*0.55,
  },
});
