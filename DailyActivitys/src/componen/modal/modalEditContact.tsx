import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {TextInput} from '@react-native-material/core';
import ButtonComponent from '../ButtonComponent';
import ButtonbackComponent from '../buttonbackComponent';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {friendSelectors, postDeleteFriend} from '../../features/friendSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'EditContactModal'>;

const ModalEditContact = ({route, navigation}: Props) => {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')

  const contactId = route.params.contactId;
  const contactDetail = useAppSelector(state =>
    friendSelectors.selectById(state, contactId),
  );

  useEffect(() => {
    if (contactDetail) {
      setEmail(contactDetail.email)
      setName(contactDetail.name)
    }
  }, [])
  
  const dispatch = useAppDispatch()
  const submitData =()=>{
   
    dispatch(postDeleteFriend(contactId))
    navigation.goBack()
  }
  
  
  return (
    <View style={styles.wrapper}>
      <View>
        <ButtonbackComponent onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.wrapperTextHeader}>
        <Text style={styles.textHeader}>Contact Detail</Text>
      </View>
      <View style={styles.wrapperTextInput}>
        <TextInput
          variant="standard"
          label="Name"
          style={{margin: 16}}
          color="black"
          value={name}
          onChangeText={(value)=>setName(value)}
        />
        <TextInput
          variant="standard"
          label="Email"
          style={{margin: 16}}
          color="black"
          value={email}
          onChangeText={(value)=>setEmail(value)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.btn} onPress={submitData}>
          <ButtonComponent
            label="Delete"
            backgroundColor="white"
            textColor="black"
            borderColor="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalEditContact;

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
    color:'black'
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
