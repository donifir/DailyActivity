import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getVerifikasiAkun, postDataLogout} from '../../../features/authSlice';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {Avatar} from '@react-native-material/core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faLockOpen,
  faMugSaucer,
  faUnlockAlt,
  faUserCheck,
  faUsersSlash,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';
import {Divider} from 'react-native-flex-layout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/StackNavigation';
import {string} from 'prop-types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SetingSreenUser = () => {
  const isRedirect = useAppSelector(state => state.auth.isRedirect);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [verified, setVerified] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const getToken = async () => {
    try {
      const valueEmail = await AsyncStorage.getItem('email');
      const valueName = await AsyncStorage.getItem('name');
      const valueVerified = await AsyncStorage.getItem('email_verified_at');
      if (valueEmail !== null && valueName !== null) {
        setEmail(valueEmail);
        setName(valueName);
        setVerified(valueVerified);
        // Alert.alert('email', value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const verifikasiHandler = async () => {
    setLoading(true)
    await dispatch(getVerifikasiAkun(email));
    Alert.alert('Sukses', `Link Verifikasi Telah Dikirim ke email ${email}`);
    setLoading(false)
  };

  useEffect(() => {
    getToken();
  }, [isRedirect, email]);

  const handleLogout = async () => {
    // console.log(email)
    const formData = new FormData();
    formData.append('email', email);
    await dispatch(postDataLogout(formData));
    // navigation.navigate('intro');
   
  };

  const cekverifikasi = () => {
    Alert.alert('verified', String(verified));
  };
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[styles.wrapper]}>
      {/* nama akun */}
      {/* <Text>haha:{verified}</Text> */}
      <View style={[styles.wrapperSetting, styles.shadow]}>
        <View style={styles.wrapperAvatar}>
          <Avatar label={name} autoColor />
        </View>
        <View style={styles.wrapperNamaAvatar}>
          <Text style={{fontSize: 20, fontWeight: '500', color:'black'}}>{name}</Text>
          <Text style={{fontSize: 16, color: '#4b5357'}}>{email}</Text>
        </View>
      </View>

      {/* sub seting */}
      <View style={[styles.wrapperSub, styles.shadow]}>
        <TouchableOpacity
          style={styles.wrapperSubSetting}
          onPress={() => navigation.navigate('ModalUbahPassword', {email})}>
          <View style={styles.wrapperIcon}>
            <FontAwesomeIcon icon={faUnlockAlt} size={28} />
          </View>
          <View style={[styles.wrapperText, styles.wrapperTextDevider]}>
            <Text style={styles.textSubSetting}>Ganti Password</Text>
          </View>
        </TouchableOpacity>
        { String(verified)==='null' || String(verified)==='' ? (
          <View style={[styles.wrapperSubSetting]}>
            <View style={styles.wrapperIcon}>
              <FontAwesomeIcon icon={faUserTimes} size={29} />
            </View>
            <View style={[styles.wrapperText]}>
              <TouchableOpacity
                onPress={verifikasiHandler}
                style={{flexDirection: 'row'}}>
                <Text style={[styles.textSubSetting]}>Verifikasi Akun</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.wrapperSubSetting]}>
            <View style={styles.wrapperIcon}>
              <FontAwesomeIcon icon={faUserCheck} size={29} />
            </View>
            <View style={[styles.wrapperText]}>
              <Text style={styles.textSubSetting}>Akun Terverifikasi</Text>
            </View>
          </View>
        )}
      </View>

      {loading == false ? (
        <TouchableOpacity
          style={[styles.wrapperDelete, styles.shadow, {marginTop: 40}]}
          onPress={() => handleLogout()}>
          <Text style={styles.textSubSetting}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.wrapperDelete, styles.shadow, {marginTop: 40}]}>
          <View>
            <ActivityIndicator size="large" />
          </View>
        </TouchableOpacity>
      )}
      
      {/* <TouchableOpacity
          style={[styles.wrapperDelete, styles.shadow, {marginTop: 40}]} onPress={cekverifikasi}>
          <View>
            <ActivityIndicator size="large" />
          </View>
        </TouchableOpacity> */}
    </Animated.View>
  );
};

export default SetingSreenUser;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5FA',
  },
  wrapperSetting: {
    marginTop: 20,
    width: windowWidth * 0.95,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrapperAvatar: {
    paddingHorizontal: 16,
    flex: 1,
    // backgroundColor: 'blue',
  },
  wrapperNamaAvatar: {
    paddingHorizontal: 16,
    flex: 5,
  },
  shadow: {
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  wrapperIcon: {
    flex: 1,
    margin: 16,
  },
  wrapperText: {
    justifyContent: 'center',
    // alignItems:'center',
    flex: 9,

    // backgroundColor:'blue',
    height: '100%',
    // margin: 15,
  },
  wrapperTextDevider: {
    borderBottomColor: '#4b5357',
    borderBottomWidth: 1,
  },
  wrapperSubSetting: {
    width: '100%',
    height: 50,
    // padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  textSubSetting: {
    fontSize: 18,
    fontWeight: '400',
    color:'black'
  },
  wrapperSub: {
    marginTop: 20,
    width: windowWidth * 0.95,
    // paddingBottom: 29,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  wrapperDelete: {
    marginTop: 10,
    width: windowWidth * 0.95,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
