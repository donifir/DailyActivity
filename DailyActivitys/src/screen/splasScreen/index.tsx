import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {resetState} from '../../features/authSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SplashScreen = () => {
  const redirect = useAppSelector(state => state.auth.isRedirect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (redirect === true) {
      setTimeout(() => {
        dispatch(resetState());
      }, 1700);
    }
    
  }, [redirect]);

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
