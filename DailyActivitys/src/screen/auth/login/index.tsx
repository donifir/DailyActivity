import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from '@react-native-material/core';
import ButtonComponent from '../../../componen/ButtonComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/StackNavigation';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {postDataLogin, resetState} from '../../../features/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'loginScreen'>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({route, navigation}: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submiting, setSubmiting] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function handleSubmit() {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    dispatch(postDataLogin(formData));
    setSubmiting(true);
  }

  const dataError = useAppSelector(state => state.auth.dataError);
  const isRedirect = useAppSelector(state => state.auth.isRedirect);

  useEffect(() => {
    if (dataError === 'invalid credensial' && submiting === true) {
      Alert.alert('Gagal', 'invalid credensial');
      dispatch(resetState());
    }
  }, [isRedirect, submiting, dataError]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapperText}>
        <Text style={styles.textH1}>Welcome Back</Text>
        <Text style={styles.textH2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam maecenas
          mi non sed ut odio. Non, justo, sed facilisi et.
        </Text>
      </View>
      <View style={styles.wrapperForm}>
        <TextInput
          autoCapitalize="none"
          variant="outlined"
          label="Email"
          style={{margin: 16}}
          color="black"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        {dataError.email && submiting == true ? (
          <Text style={styles.dataError}>{dataError.email}</Text>
        ) : (
          <></>
        )}
        <TextInput
          autoCapitalize="none"
          variant="outlined"
          label="Password"
          style={{margin: 16}}
          color="black"
          value={password}
          onChangeText={value => setPassword(value)}
        />
        {dataError.password && submiting == true ? (
          <Text style={styles.dataError}>{dataError.password}</Text>
        ) : (
          <></>
        )}
        {/* {dataError==='invalid credensial' && submiting==true?[Alert.alert('gagal',dataError), setSubmiting(false)]:<></>} */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ModalForgotPassword')}>
          <Text
            style={{marginHorizontal: 16, textAlign: 'right', fontSize: 15, color:'black'}}>
            Forgot Password. ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperBtn} onPress={handleSubmit}>
          <ButtonComponent
            label="Sign In"
            backgroundColor="#407BFF"
            textColor="white"
            borderColor="black"
          />
        </TouchableOpacity>
        <View style={styles.wrapperSignUp}>
          <Image source={require('./../../../assets/image/Rectangle29.png')} />
          <TouchableOpacity onPress={() => navigation.push('registerScreen')}>
            <Text style={styles.signup}>Or Sign Up</Text>
          </TouchableOpacity>
          <Image source={require('./../../../assets/image/Rectangle30.png')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapperText: {
    paddingTop: 35,
    width: windowWidth,
    height: windowHeight * 0.25,
    // backgroundColor:'red',
    // justifyContent:'center',
    alignItems: 'center',
  },
  textH1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#464444',
  },
  textH2: {
    fontSize: 15,
    paddingTop: 10,
    // fontWeight:'bold',
    width: windowWidth * 0.8,
    textAlign: 'center',
    color: '#828282',
  },
  wrapperForm: {
    width: windowWidth,
    height: windowHeight * 0.5,
    // backgroundColor: 'blue',
  },
  wrapperBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  wrapperSignUp: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  signup: {
    marginHorizontal: 10,
    fontSize: 15,
    color:'black'
  },
  dataError: {
    color: 'red',
    marginHorizontal: 16,
  },
});
