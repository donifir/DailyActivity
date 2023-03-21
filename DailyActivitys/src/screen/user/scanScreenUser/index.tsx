import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {color, FadeIn, FadeOut} from 'react-native-reanimated';

const ScanScreenUser = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[styles.wrapper]}>
      <Text style={{color:'black'}}> Maaf Fitur Belum Tersedia</Text>

      {/* <Text>Fitur Belum Tersedia</Text> */}
    </Animated.View>
  );
};

export default ScanScreenUser;

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }})
  