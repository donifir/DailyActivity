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
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle, faMusic, faSearch} from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../../componen/ButtonComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<RootStackParamList, 'intro1'>;

const Intro1 = ({route, navigation}: Props) => {
  const [stateNumber, setStateNumber] = useState<number>(1);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.contentSlide}>
        {stateNumber === 1 ? (
          <Slide1 />
        ) : stateNumber === 2 ? (
          <Slide2 />
        ) : (
          <Slide3 />
        )}
      </View>

      <View style={styles.wrapperDot}>
        <FontAwesomeIcon
          icon={faCircle}
          color={stateNumber === 1 ? '#57419D' : '#cbcfd1'}
          size={10}
          style={styles.dot}
        />
        <FontAwesomeIcon
          icon={faCircle}
          color={stateNumber === 2 ? '#57419D' : '#cbcfd1'}
          size={10}
          style={styles.dot}
        />
        <FontAwesomeIcon
          icon={faCircle}
          color={stateNumber === 3 ? '#57419D' : '#cbcfd1'}
          size={10}
          style={styles.dot}
        />
        {/* <FontAwesomeIcon icon={faCircle} color={'#cbcfd1'} size={ 10 } style={styles.dot}/> */}
      </View>

      <TouchableOpacity
        onPress={
          stateNumber === 3
            ? () => navigation.navigate('welcomeScreen')
            : () => setStateNumber(stateNumber + 1)
        }
        style={styles.wrapperButton}>
        <ButtonComponent label={stateNumber === 3 ? 'Finis' : 'Next'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Intro1;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  contentSlide: {
    width: windowWidth,
    height: windowHeight * 0.7,
  },
  box1: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperImage: {
    backgroundColor: '#181b21',
    width: windowWidth,
    height: windowHeight * 0.6,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  subText: {
    fontSize: 16,
    color: '#828282',
    textAlign: 'center',
    width: windowWidth * 0.85,
    marginTop: 10,
    marginBottom: 40,
  },
  wrapperDot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  wrapperButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  dot: {
    marginHorizontal: 3,
  },
  wrapperTextH1:{
    marginHorizontal:windowWidth*0.1,
    width:windowWidth,
    color:'white',
    fontSize:25,
    fontWeight:'600'
  },
  wrapperTextH2:{
    marginHorizontal:windowWidth*0.1,
    width:windowWidth,
    // color:'white',
    fontSize:24,
    color: '#828282',
    fontWeight:'500'

  }
});

const Slide1 = () => {
  return (
    <View>
      <Animated.View
        entering={FadeIn.duration(1500)}
        exiting={FadeOut.duration(1500)}
        style={[styles.box1]}>
        <View style={styles.wrapperImage}>
          <View >
            <Text style={styles.wrapperTextH1}>Search</Text>
            <Text style={styles.wrapperTextH2}>Your Movie</Text>
          </View>

          <FontAwesomeIcon
            icon={faSearch}
            size={windowWidth * 0.5}
            color="#fcfcfc"
          />
          {/* <Image
            source={require('./../../assets/image/Animal-removebg-preview.png')}
          /> */}
        </View>
        <View>
          <Text style={styles.text}>My Pets</Text>
          <Text style={styles.subText}>
            Taking care of a pet is my favorite, it helps me to gaimr stress and
            fatigue.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const Slide2 = () => {
  return (
    <View>
      <Animated.View
        entering={FadeIn.duration(1500)}
        exiting={FadeOut.duration(1500)}
        style={[styles.box1]}>
        <View style={styles.wrapperImage}>
          <Image
            source={require('./../../assets/image/Animal-removebg-preview.png')}
          />
        </View>
        <View>
          <Text style={styles.text}>Slide 2</Text>
          <Text style={styles.subText}>
            Taking care of a pet is my favorite, it helps me to gaimr stress and
            fatigue.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const Slide3 = () => {
  return (
    <View>
      <Animated.View
        entering={FadeIn.duration(1500)}
        exiting={FadeOut.duration(1500)}
        style={[styles.box1]}>
        <View style={styles.wrapperImage}>
          <Image
            source={require('./../../assets/image/Animal-removebg-preview.png')}
          />
        </View>
        <View>
          <Text style={styles.text}>Slide 3</Text>
          <Text style={styles.subText}>
            Taking care of a pet is my favorite, it helps me to gaimr stress and
            fatigue.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};
