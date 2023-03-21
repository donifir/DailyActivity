import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {FAB, Icon, TextInput} from '@react-native-material/core';
import ButtonComponent from '../ButtonComponent';
import ButtonbackComponent from '../buttonbackComponent';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {friendSelectors, postDeleteFriend} from '../../features/friendSlice';
import {postForgotPassword} from '../../features/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'ModalForgotPassword'>;

const ModalForgotPassword = ({route, navigation}: Props) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const submitBtn = async () => {
    if (email) {
      setLoading(true)
      await dispatch(postForgotPassword(email));
      // navigation.goBack();
      Alert.alert('email', 'link tautan sudah dikirim');
      setLoading(false)
    }
   
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <ButtonbackComponent onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.wrapperTextHeader}>
        <Text style={styles.textHeader}>Lupa Kata Sandi</Text>
        <Text style={{color: 'black', marginTop: 10}}>
          Tautan reset password akan dikirim ke email anda
        </Text>
      </View>
      <View style={styles.wrapperTextInput}>
        <TextInput
          autoCapitalize="none"
          variant="standard"
          label="Email"
          style={{margin: 16}}
          color="black"
          value={email}
          onChangeText={value => setEmail(value)}
        />
      </View>
      {loading == true ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.btn} onPress={submitBtn}>
            <ButtonComponent
              label="Kirim"
              backgroundColor="white"
              textColor="black"
              borderColor="black"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ModalForgotPassword;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 15,
  },
  wrapperTextHeader: {
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom:10,
    color:'black'
  },
  textHeader: {
    fontSize: 26,
  },
  wrapperTextInput: {
    paddingTop: 16,
  },
  btn: {
    marginTop: 30,
    marginHorizontal: 16,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
