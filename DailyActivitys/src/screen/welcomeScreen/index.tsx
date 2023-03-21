import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ButtonComponent from '../../componen/ButtonComponent';
import ButtonComponentTauchable from '../../componen/ButtonComponentTauchable';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<RootStackParamList, 'welcomeScreen'>;
const WelcomeScreen = ({route, navigation}: Props) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.contentImage}>
          <Image source={require('./../../assets/image/Group6812.png')} />
        </View>
        <View style={styles.wrapperText}>
          <Text style={styles.text1}>WelcomeScreen</Text>
          <Text style={styles.text2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
            maecenas mi non sed ut odio. Non, justo, sed facilisi et.
          </Text>
        </View>
        <View style={styles.wrapperBtn}>
          <ButtonComponentTauchable
            label="Login"
            backgroundColor="#407BFF"
            textColor="black"
            borderColor="black"
            onPress={() => navigation.navigate('loginScreen')}
          />
          <ButtonComponentTauchable
            label="Register"
            backgroundColor="white"
            textColor="black"
            borderColor="black"
            onPress={() => navigation.navigate('registerScreen')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentImage: {
    width: windowWidth,
    height: windowHeight * 0.55,
    // backgroundColor: '#407BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperText: {
    width: windowWidth,
    height: windowHeight * 0.2,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBtn: {
    width: windowWidth,
    height: windowHeight * 0.25,
    // backgroundColor:'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 20,
    color: 'black',
    width: windowWidth * 0.7,
    textAlign: 'center',
  },
  text2: {
    marginTop: 10,
    fontSize: 16,
    color: '#828282',
    width: windowWidth * 0.7,
    textAlign: 'center',
  },
});
