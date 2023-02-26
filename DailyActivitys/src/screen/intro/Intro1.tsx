import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Intro1 = () => {
  const [states, setStates] = useState<Boolean>(false);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.contentSlide}>
        {states == true ? <Slide1 /> : <Slide2 />}
      </View>

      <TouchableOpacity onPress={() => setStates(!states)}>
        <Text>Ubah</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Intro1;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentSlide: {
    width: windowWidth,
    height: windowHeight * 0.7,
    backgroundColor: 'red',
  },
  box1: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'lightgray',
  },
  wrapperImage: {},
  text:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:'center',
    color:'black'
  },
  subText:{
    fontSize:16,
    color:'#828282',
    textAlign:'center',
    width:windowWidth*0.85,
    marginTop:10,
    marginBottom:40,
  }
});

const Slide1 = () => {
  return (
    <View>
      <Animated.View
        entering={FadeInLeft.duration(1500)}
        exiting={FadeOutRight.duration(1500)}
        style={[styles.box1]}>
        <View style={styles.wrapperImage}>
          <Image source={require('./../../assets/image/Animal-removebg-preview.png')} />
        </View>
        <View>
          <Text style={styles.text}>My Pets</Text>
          <Text style={styles.subText}>Taking care of a pet is my favorite, it helps me to gaimr stress and fatigue.</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const Slide2 = () => {
  return (
    <View>
      <Animated.View
        entering={FadeInLeft.duration(1500)}
        exiting={FadeOutRight.duration(1500)}
        style={[styles.box1]}>
        <Text>Slide2</Text>
      </Animated.View>
    </View>
  );
};
