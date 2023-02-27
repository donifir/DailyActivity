import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOut,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import NormalButton from '../../componen/NormalButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Intro1 = () => {
  const [stateNumber, setStateNumber] = useState<number>(1);


  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.subWrapper}>
        <View style={styles.wrapperHeadContent}>
          {stateNumber===1?<Slide1 />:<Slide2 />}
        </View>
        <View style={styles.wrapperButton}>
          <View style={styles.wrapperDot}>
            <FontAwesomeIcon
              icon={faCircle}
              color={stateNumber === 1 ? '#2b2e33' : '#cbcfd1'}
              size={10}
              style={{marginHorizontal: 6}}
            />
            <FontAwesomeIcon
              icon={faCircle}
              color={stateNumber === 2 ? '#2b2e33' : '#cbcfd1'}
              size={10}
              style={{marginHorizontal: 6}}
            />
            <FontAwesomeIcon
              icon={faCircle}
              color={stateNumber === 3 ? '#2b2e33' : '#cbcfd1'}
              size={10}
              style={{marginHorizontal: 6}}
            />
            <FontAwesomeIcon
              icon={faCircle}
              color={stateNumber === 4 ? '#2b2e33' : '#cbcfd1'}
              size={10}
              style={{marginHorizontal: 6}}
            />
          </View>
          <TouchableOpacity onPress={()=>setStateNumber(stateNumber+1)}>
            <NormalButton/>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Intro1;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#2b2e33',
  },
  subWrapper: {
    backgroundColor: 'white',
    height: windowHeight,
  },
  wrapperHeadContent: {
    width: windowWidth,
  },
  bgBlack: {
    backgroundColor: '#2b2e33',
    borderBottomRightRadius: 50,
    height: windowHeight * 0.62,
    borderBottomColor:'gold',
    borderRightColor:'gold',
    borderLeftColor:'#2b2e33',
    borderTopColor:'#2b2e33',
    borderWidth:6,
  },
  wrapperTextHeadContent: {
    marginHorizontal: windowWidth * 0.1,
    paddingTop: 20,
    height:'25%',
  },
  textHead1: {
    color: 'white',
    fontSize: 32,
    fontWeight: '400',
  },
  textHead2: {
    fontSize: 30,
    fontWeight: '400',
    color: '#828282',
  },
  wrapperImageHeadContent: {
    // marginVertical: 35,
    width: '100%',
    height:'75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperImageHeadContentWhite: {
    marginVertical: 20,
    width: '90%',
    height:'75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    borderTopRightRadius:50,
    borderTopColor:'gold',
    borderRightColor:'gold',
    borderBottomColor:'gold',
    borderLeftColor:'white',
    borderWidth:6,
  },
  bgBlackWhite: {
    backgroundColor: '#2b2e33',
    // borderBottomRightRadius: 50,
    height: windowHeight * 0.62,
  },
  bgWhite: {
    marginHorizontal: windowWidth * 0.1,
    marginTop: 20,
    width: windowWidth * 0.7,
  },
  wrapperButton: {
    width: windowWidth * 0.8,
    // backgroundColor: 'yellow',
    position: 'absolute',
    bottom: windowWidth * 0.1,
    flexDirection: 'row',
    marginHorizontal: windowWidth * 0.1,
  },
  wrapperDot: {
    flexDirection:'row',
    flex: 1,
    alignItems:'center'
  },
});


const Slide1 = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(1500)}
      exiting={FadeOut.duration(1500)}
      // style={[styles.box1]}
    >
      <View style={styles.bgBlack}>
        <View style={styles.wrapperTextHeadContent}>
          <Text style={styles.textHead1}>Search</Text>
          <Text style={styles.textHead2}>your movie</Text>
        </View>
        <View style={styles.wrapperImageHeadContent}>
          <FontAwesomeIcon
            icon={faSearch}
            size={windowWidth * 0.5}
            color="#fcfcfc"
          />
        </View>
      </View>
      <View style={styles.bgWhite}>
        <Text style={{fontSize: 16, color: '#828282'}}>
          Taking care of a pet is my favorite, it helps me to gaimr stress and
          fatigue.
        </Text>
      </View>
    </Animated.View>
  );
};


const Slide2 = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(1500)}
      exiting={FadeOut.duration(1500)}
      // style={[styles.box1]}
    >
      <View style={styles.bgBlackWhite}>
        <View style={styles.wrapperTextHeadContent}>
          <Text style={styles.textHead1}>Welcome To </Text>
          <Text style={styles.textHead2}>your movie</Text>
        </View>
        <View style={styles.wrapperImageHeadContentWhite}>
          <FontAwesomeIcon
            icon={faSearch}
            size={windowWidth * 0.5}
            color="#181b21"
          />
        </View>
      </View>
      <View style={styles.bgWhite}>
        <Text style={{fontSize: 16, color: '#828282'}}>
          awdawdawd care of a pet is my favorite, it helps me to gaimr stress and
          fatigue.
        </Text>
      </View>
    </Animated.View>
  );
};

const Slide3 = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(1500)}
      exiting={FadeOut.duration(1500)}
      // style={[styles.box1]}
    >
      <View style={styles.bgBlack}>
        <View style={styles.wrapperTextHeadContent}>
          <Text style={styles.textHead1}>Search</Text>
          <Text style={styles.textHead2}>your movie</Text>
        </View>
        <View style={styles.wrapperImageHeadContent}>
          <FontAwesomeIcon
            icon={faSearch}
            size={windowWidth * 0.5}
            color="#fcfcfc"
          />
        </View>
      </View>
      <View style={styles.bgWhite}>
        <Text style={{fontSize: 16, color: '#828282'}}>
          Taking care of a pet is my favorite, it helps me to gaimr stress and
          fatigue.
        </Text>
      </View>
    </Animated.View>
  );
};


const Slide4 = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(1500)}
      exiting={FadeOut.duration(1500)}
      // style={[styles.box1]}
    >
      <View style={styles.bgBlackWhite}>
        <View style={styles.wrapperTextHeadContent}>
          <Text style={styles.textHead1}>Welcome To </Text>
          <Text style={styles.textHead2}>your movie</Text>
        </View>
        <View style={styles.wrapperImageHeadContentWhite}>
          <FontAwesomeIcon
            icon={faSearch}
            size={windowWidth * 0.5}
            color="#181b21"
          />
        </View>
      </View>
      <View style={styles.bgWhite}>
        <Text style={{fontSize: 16, color: '#828282'}}>
          awdawdawd care of a pet is my favorite, it helps me to gaimr stress and
          fatigue.
        </Text>
      </View>
    </Animated.View>
  );
};