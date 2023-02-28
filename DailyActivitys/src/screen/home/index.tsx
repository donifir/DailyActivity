import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {color} from 'react-native-reanimated';
import { useAppDispatch } from '../../app/hooks';
import { postDataLogout } from '../../features/authSlice';

const Home = () => {
  const [email, setEmail] = useState<string>('doni@gmail.com')

  const dispatch = useAppDispatch();

  const handleLogout =async()=>{
  await  dispatch(postDataLogout(email))
  }

  return (
    <View style={styles.wrapper}>
      <Text>Home</Text>
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
