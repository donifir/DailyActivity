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
import {RootStackParamList} from '../../../navigation/StackNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {postDataRegister} from './../../../features/authSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
type Props = NativeStackScreenProps<RootStackParamList, 'registerScreen'>;

const RegisterScreen = ({route, navigation}: Props) => {
  const [nama, setNama] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [submiting, setSubmiting] = useState<boolean>(false)

  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);

    dispatch(postDataRegister(formData));
    setSubmiting(true)
  };

  const dataError = useAppSelector(state => state.auth.dataError);
  const isRedirect = useAppSelector(state => state.auth.isRedirect);

  useEffect(() => {
    if (isRedirect==true && submiting==true) {
      navigation.push('home')
    }
  }, [isRedirect,submiting])
  


  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapperText}>
        <Text style={styles.textH1}>Create Account</Text>
        <Text style={styles.textH2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>
      <View style={styles.wrapperForm}>
        <TextInput
          autoCapitalize='none'
          variant="outlined"
          label="Name"
          style={{margin: 16}}
          color="black"
          value={nama}
          onChangeText={value => setNama(value)}
        />
        {dataError.nama ? <Text style={styles.dataError}>{dataError.nama}</Text> : <></>}
        <TextInput
          autoCapitalize='none'
          variant="outlined"
          label="Email"
          style={{margin: 16}}
          color="black"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        {dataError.email ? <Text style={styles.dataError}>{dataError.email}</Text> : <></>}
        <TextInput
          autoCapitalize='none'
          variant="outlined"
          label="Password"
          style={{margin: 16}}
          color="black"
          value={password}
          onChangeText={value => setPassword(value)}
        />
        {dataError.password ? <Text style={styles.dataError}>{dataError.password}</Text> : <></>}
        <TextInput
          autoCapitalize='none'
          variant="outlined"
          label="Confirm Password"
          style={{margin: 16}}
          color="black"
          value={confirmPassword}
          onChangeText={value => setConfirmPassword(value)}
        />
        {dataError.confirm_password ? <Text style={styles.dataError}>{dataError.confirm_password}</Text> : <></>}
        <TouchableOpacity style={styles.wrapperBtn} onPress={handleSubmit}>
          <ButtonComponent
            label="Sign Up"
            backgroundColor="#407BFF"
            textColor="white"
            borderColor="black"
          />
        </TouchableOpacity>
        <View style={styles.wrapperSignUp}>
          <Image source={require('./../../../assets/image/Rectangle29.png')} />
          <TouchableOpacity onPress={() => navigation.push('loginScreen')}>
            <Text style={styles.signup}>Or Sign In</Text>
          </TouchableOpacity>
          <Image source={require('./../../../assets/image/Rectangle30.png')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapperText: {
    paddingTop: 35,
    width: windowWidth,
    height: windowHeight * 0.18,
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
  },
  dataError:{
    marginHorizontal:16,
    color:'red',
    fontSize:14,
  }
});
