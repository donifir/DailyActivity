import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {TextInput} from '@react-native-material/core';
import ButtonComponent from '../ButtonComponent';
import ButtonbackComponent from '../buttonbackComponent';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {friendSelectors, postDeleteFriend} from '../../features/friendSlice';
import { postUpdatePassword } from '../../features/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'ModalUbahPassword'>;
const ModalUbahPassword = ({route, navigation}: Props) => {
  const [password, setPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [submiting, setSubmiting] = useState<boolean>(false)
  
  const email = route.params.email;
  const dataUpdateError = useAppSelector(state => state.auth.dataUpdateError);
  const isSuccess = useAppSelector(state => state.auth.isSuccess);
  
  const dispatch = useAppDispatch()

  const btnUpdatePassword=()=>{
    const formData = new FormData()
    formData.append('email',email)
    formData.append('password',password)
    formData.append('new_password',newPassword)
    formData.append('confirm_new_password',confirmNewPassword)

    dispatch(postUpdatePassword(formData))
    setSubmiting(true)
  }
  
  useEffect(() => {
    if (submiting==true) {
      if (isSuccess ==true  ) {
        navigation.goBack()
        Alert.alert('success','password berhasil diubah')
      }else if (dataUpdateError.password) {
        Alert.alert('maaf',String(dataUpdateError.password))
      }else if (dataUpdateError.new_password) {
        Alert.alert('maaf',String(dataUpdateError.new_password))
      }else if (dataUpdateError.confirm_new_password) {
        Alert.alert('maaf',String(dataUpdateError.confirm_new_password))
      }
    }
    // setTimeout(() => {
    //   setSubmiting(false)
    // }, 1000);
  }, [dispatch,submiting, JSON.stringify(dataUpdateError)])
  
  
  
  return (
    <View style={styles.wrapper}>
      <View>
        <ButtonbackComponent onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.wrapperTextHeader}>
        <Text style={styles.textHeader}>Ubah Password{email}</Text>
      </View>
      <View style={styles.wrapperTextInput}>
        <TextInput
         autoCapitalize='none'
          variant="standard"
          label="Password Lama"
          style={{margin: 16}}
          color="black"
          value={password}
          onChangeText={(value)=>setPassword(value)}
        />
        <TextInput
         autoCapitalize='none'
          variant="standard"
          label="Password Baru"
          style={{margin: 16}}
          color="black"
          value={newPassword}
          onChangeText={(value)=>setNewPassword(value)}
        />
        <TextInput
         autoCapitalize='none'
          variant="standard"
          label="Ulangi Password Baru"
          style={{margin: 16}}
          color="black"
          value={confirmNewPassword}
          onChangeText={(value)=>setConfirmNewPassword(value)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.btn} onPress={btnUpdatePassword}>
          <ButtonComponent
            label="Submit"
            backgroundColor="white"
            textColor="black"
            borderColor="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalUbahPassword;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 15,
  },
  wrapperTextHeader: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  textHeader: {
    fontSize: 26,
  },
  wrapperTextInput:{
    paddingTop: 16,
  },
  btn: {
    marginTop: 30,
    marginHorizontal: 16,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
