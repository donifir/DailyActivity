import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {color, FadeIn, FadeOut} from 'react-native-reanimated';
import {ListItem} from '@react-native-material/core';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ContactScreenUser = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[styles.wrapper]}>
      <>
        <View style={styles.wrapperText}>
          <Text style={styles.texth1}>Doni Firmansyah</Text>
          <Text style={styles.texth2}>donifirmansyah@gmail.com</Text>
        </View>
        <View style={styles.wrapperText}>
          <Text style={styles.texth1}>Doni Firmansyah</Text>
          <Text style={styles.texth2}>donifirmansyah@gmail.com</Text>
        </View>
        <View style={styles.wrapperText}>
          <Text style={styles.texth1}>Doni Firmansyah</Text>
          <Text style={styles.texth2}>donifirmansyah@gmail.com</Text>
        </View>
        <View style={styles.wrapperText}>
          <Text style={styles.texth1}>Doni Firmansyah</Text>
          <Text style={styles.texth2}>donifirmansyah@gmail.com</Text>
        </View>
      </>
    </Animated.View>
  );
};

export default ContactScreenUser;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperText: {
    marginTop:10,
    width: windowWidth*0.95,
    backgroundColor: 'white',
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 5,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderRadius:10,
  },
  texth1: {
    fontSize: 17,
    fontWeight: '500',
    color: '#2d3336',
  },
  texth2: {
    marginTop:3,
    fontSize: 15,
    fontWeight: '500',
    color: '#4b5357',
  },
});
