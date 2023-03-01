import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {postDataLogout} from '../../features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'home'>;
const Home = ({route, navigation}: Props) => {
  const [email, setEmail] = useState<string>('');

  const isRedirect = useAppSelector(state => state.auth.isRedirect);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        // value previously stored
        setEmail(value);
        Alert.alert('email', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getToken()
  }, [isRedirect])
  

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    // console.log(email)
    const formData = new FormData();
    formData.append('email', email);
    await dispatch(postDataLogout(formData));
    // navigation.navigate('intro');
  };

  return (
    <View style={styles.wrapper}>
      <Text>Home</Text>
      <TouchableOpacity onPress={getToken}>
        <Text style={{color: 'blue', margin: 20}}>cek token</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{color: 'red'}}>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
