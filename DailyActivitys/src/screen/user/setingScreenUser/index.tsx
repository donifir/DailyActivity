import {
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
import {postDataLogout} from '../../../features/authSlice';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {Avatar} from '@react-native-material/core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faMugSaucer,
  faUserCheck,
  faUsersSlash,
} from '@fortawesome/free-solid-svg-icons';
import {Divider} from 'react-native-flex-layout';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SetingSreenUser = () => {
  const isRedirect = useAppSelector(state => state.auth.isRedirect);
  const [email, setEmail] = useState<string>('');

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        setEmail(value);
        // Alert.alert('email', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('email')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  useEffect(() => {
    getToken();
  }, [isRedirect]);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    // console.log(email)
    const formData = new FormData();
    formData.append('email', email);
    await dispatch(postDataLogout(formData));
    // navigation.navigate('intro');
  };
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[styles.wrapper]}>
      {/* nama akun */}
      <View style={[styles.wrapperSetting, styles.shadow]}>
        <View style={styles.wrapperAvatar}>
          <Avatar label="Kent Dodds" autoColor />
        </View>
        <View style={styles.wrapperNamaAvatar}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>Doni Firmansyah</Text>
          <Text style={{fontSize: 16, color: '#4b5357'}}>
            didonifirmansyah@gmail.com
          </Text>
        </View>
      </View>

      {/* sub seting */}
      <View style={[styles.wrapperSub, styles.shadow]}>
        <View style={[styles.wrapperSubSetting]}>
          <View style={styles.wrapperIcon}>
            <FontAwesomeIcon icon={faUserCheck} size={29} />
          </View>
          <View style={[styles.wrapperText, styles.wrapperTextDevider]}>
            <Text style={styles.textSubSetting}>verifikasi akun</Text>
          </View>
        </View>

        <View style={styles.wrapperSubSetting}>
          <View style={styles.wrapperIcon}>
            <FontAwesomeIcon icon={faUsersSlash} size={29} />
          </View>
          <View style={[styles.wrapperText, styles.wrapperTextDevider]}>
            <Text style={styles.textSubSetting}>Blokir User</Text>
          </View>
        </View>

        <View style={styles.wrapperSubSetting}>
          <View style={styles.wrapperIcon}>
            <FontAwesomeIcon icon={faEye} size={29} />
          </View>
          <TouchableOpacity style={styles.wrapperText} onPress={()=>Alert.alert('token','Actice')}>
            <Text style={styles.textSubSetting}>Cek Token</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* hapus and logouy */}
      <TouchableOpacity style={[styles.wrapperDelete, styles.shadow, {marginTop:40}]} onPress={()=>removeValue()}>
        <Text style={styles.textSubSetting}>Hapus Akun</Text>
      </TouchableOpacity>
       {/* hapus and logouy */}
       <TouchableOpacity style={[styles.wrapperDelete, styles.shadow]} onPress={()=>handleLogout()}>
        <Text style={styles.textSubSetting}>Logout</Text>
      </TouchableOpacity>
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
  wrapperTextDevider:{
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
