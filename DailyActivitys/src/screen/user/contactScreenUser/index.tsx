import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {color, FadeIn, FadeOut} from 'react-native-reanimated';
import {ListItem} from '@react-native-material/core';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  friendSelectors,
  getListFriend,
  postCreateFriend,
} from '../../../features/friendSlice';
import ButtonCreatePengingat from '../../../componen/ButtonCreatePengingat';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAddressCard,
  faPlus,
  faSearch,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/StackNavigation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ContactScreenUser = () => {
  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmiting, setSubmiting] = useState<boolean>(false);
  const [asyncEmail, setAsyncEmail] = useState<any>('');

  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isSuccess = useAppSelector(state => state.friend.isSuccess);
  const dataError = useAppSelector(state => state.friend.dataError);
  const listFriend = useAppSelector(friendSelectors.selectAll); //c
  const dispatch = useAppDispatch();

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      const valueEmail = await AsyncStorage.getItem('email');
      if (value !== null) {
        setUserId(value);
        setAsyncEmail(valueEmail);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getUserId();
    if (userId) {
      dispatch(getListFriend(userId));
    }
    if (!dataError && isSubmiting == true) {
      Alert.alert('succes', 'email berhasil ditambahkan');
      setSubmiting(false)
    }
    if (dataError && isSubmiting == true) {
      Alert.alert('maaf', String(dataError));
      setSubmiting(false)
    }
  }, [dispatch, userId, dataError, isSubmiting]);

  const setHandleSearch = () => {
    if (asyncEmail === email) {
      Alert.alert('maaf', 'tidak bisa menambahkan email sendiri');
    } else {
      dispatch(postCreateFriend({email, userId}));
      setSubmiting(true);
    }
  };

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[styles.wrapper]}>
      <>
        <View style={styles.wrapperCari}>
          <View style={{flex: 4}}>
            <TextInput
              style={styles.input}
              placeholder="tambahkan teman dengan email"
              placeholderTextColor="grey" 
              onChangeText={value => setEmail(value)}
              value={email}
              autoCapitalize='none'
            />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.wrapperBtn}
              onPress={setHandleSearch}>
              {!email ? (
                <FontAwesomeIcon icon={faSearch} size={21} color={'#D6D6D6'} />
              ) : (
                <FontAwesomeIcon
                  icon={faUserPlus}
                  size={21}
                  color={'#D6D6D6'}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {listFriend.map((friend, index) => (
          <TouchableOpacity style={styles.wrapperText} key={index} onPress={() => navigation.navigate('EditContactModal',{contactId:friend.id})}>
            <Text style={styles.texth1}>{friend.name}</Text>
            <Text style={styles.texth2}>{friend.email}</Text>
          </TouchableOpacity>
        ))}
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
    marginTop: 10,
    width: windowWidth * 0.95,
    backgroundColor: 'white',
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 5,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 10,
  },
  texth1: {
    fontSize: 17,
    fontWeight: '500',
    color: '#2d3336',
  },
  texth2: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: '500',
    color: '#4b5357',
  },
  wrapperCari: {
    marginTop:10,
    width: windowWidth,
    height: 50,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    backgroundColor: 'white',
    // borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    color: 'black',
    // backgroundColor:'white'
  },
  wrapperBtn: {
    width: 50,
    height: 35,
    backgroundColor: '#42A8C3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
});
