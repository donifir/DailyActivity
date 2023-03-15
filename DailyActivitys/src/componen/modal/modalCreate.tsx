import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {color, FadeIn, FadeOut} from 'react-native-reanimated';
import ButtonCreatePengingat from '../ButtonCreatePengingat';
import ButtonComponent from '../ButtonComponent';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {postCreatePengingat} from '../../features/pengingatSlide';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonbackComponent from '../buttonbackComponent';
import {TextInput} from '@react-native-material/core';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<RootStackParamList, 'ModalForm'>;

const ModalCreate = ({route, navigation}: Props) => {
  const [nama, setNama] = useState<string>('');
  const [keterangan, setKeterangan] = useState<string>('');
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const dataAuth = useAppSelector(state => state.auth.dataAuth);

  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      if (value !== null) {
        // value previously stored
        setUserId(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const handleSubmit = async () => {
    // Alert.alert('user_id',dataAuth.user_id)
    const formData = new FormData();
    formData.append('nama_pengingat', nama);
    formData.append('keterangan_pengingat', keterangan);
    formData.append('user_id', userId);

    await dispatch(postCreatePengingat(formData));

    setSubmiting(true);
  };

  const isSuccess = useAppSelector(state => state.pengingat.isSuccess);
  useEffect(() => {
    getData();
    if (isSuccess == true && submiting == true) {
      setSubmiting(false);
      navigation.navigate('home');
    }
  }, [submiting, isSuccess, userId]);

  return (
    <ImageBackground
      source={require('./../../assets/image/Union.png')}
      style={styles.wrapper}>
      <View>
        <ButtonbackComponent onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.wrapperTextHeader}>
        <Text style={styles.textHeader}>Tambah Pengingat</Text>
      </View>
      <View>
        <TextInput
          variant="standard"
          label="Nama Kegiatan"
          style={{margin: 16}}
          color="black"
          value={nama}
          onChangeText={value => setNama(value)}
        />

        <TextInput
          variant="standard"
          label="Keterangan Kegiatan"
          style={{margin: 16}}
          color="black"
          value={keterangan}
            onChangeText={value => setKeterangan(value)}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <ButtonComponent
          label="submit"
          backgroundColor="white"
          textColor="black"
          borderColor="black"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ModalCreate;

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
  text: {
    marginVertical: 10,
    fontSize: 15,
    color: 'black',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  wrapperForm: {
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 16,
  },
  btn: {
    marginTop: 18,
    marginHorizontal: 16,
    // alignItems:'flex-end'
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
  },
});
