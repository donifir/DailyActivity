import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/StackNavigation';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {
  kegiatanSelectors,
  postDeleteKegiatan,
  postUpdateKegiatan,
} from '../../../features/detailKegiatanSlice';
import {TextInput} from '@react-native-material/core';
import DatePicker from 'react-native-date-picker';
import ButtonComponent from '../../../componen/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getListPengingat } from '../../../features/pengingatSlide';
import ButtonbackComponent from '../../../componen/buttonbackComponent';


type Props = NativeStackScreenProps<RootStackParamList, 'EditKegiatanScreen'>;

const EditKegiatanScreen = ({route, navigation}: Props) => {
  const [userId, setUserId] = useState<string>('')
  // const [date, setDate] = useState<Date>();
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [namaKegiatan, setNamaKegiatan] = useState<string>('');
  const [keteranganKegiatan, setKeteranganKegiatan] = useState<string>('');
  const [idPengingat, setIdPengingat] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const idKegiatan = route.params.kegiatanId
  const dispatch = useAppDispatch();

  const dataKegiatanDetail = useAppSelector(state => state.kegiatan.dataKegiatanDetail);
  const kegiatanDetail = useAppSelector(state =>
    kegiatanSelectors.selectById(state, route.params.kegiatanId),
  );

  useEffect(() => {
    if (kegiatanDetail) {
      
      if (kegiatanDetail.mulai_kegiatan) {
        setDate(new Date(kegiatanDetail.mulai_kegiatan))
      }
      setIdPengingat(kegiatanDetail.id_pengingat)
      setNamaKegiatan(kegiatanDetail.nama_kegiatan)
      setKeteranganKegiatan(kegiatanDetail.keterangan_kegiatan)
    }
    if (dataKegiatanDetail && isSubmit) {
      navigation.push('ListPengingat',{kegiatanId:kegiatanDetail?.id_pengingat})
      setIsSubmit(false)
    }
  }, [dispatch, isSubmit, kegiatanDetail])
  

 
  const handlePost = () => {
    const  formatDate =date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    const formData = new FormData();
    formData.append('id_pengingat', idPengingat);
    formData.append('nama_kegiatan', namaKegiatan);
    formData.append('keterangan_kegiatan', keteranganKegiatan);
    formData.append('mulai_kegiatan', formatDate);

    dispatch(postUpdateKegiatan({formData, idKegiatan}));

    setIsSubmit(true)
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id')
      if(value !== null) {
        // value previously stored
        setUserId(value)
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
    dispatch(getListPengingat(userId));
  }, [dispatch,userId,userId]);

  const handleDelete=()=>{
    dispatch(postDeleteKegiatan(idKegiatan))
     navigation.navigate('home')
    // Alert.alert('id',String(idKegiatan))
  }

  return (
    <View style={styles.wrapper}>
      <View>
          <ButtonbackComponent onPress={() => navigation.goBack()} />
        </View>

      <TextInput
        editable={false}
        variant="standard"
        label="Nama Pengingat"
        style={{margin: 16}}
        color="black"
        // value={}
      />
      <TextInput
        variant="standard"
        label="Nama Kegiatan"
        style={{margin: 16}}
        color="black"
        value={namaKegiatan}
        onChangeText={value => setNamaKegiatan(value)}
      />
      <TextInput
        variant="standard"
        label="Keterangan Kegiatan"
        style={{margin: 16}}
        color="black"
        value={keteranganKegiatan}
        onChangeText={value => setKeteranganKegiatan(value)}
      />
      <>
        {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
        <TextInput
          // editable={false}
          onMouseEnter={() => setOpen(true)}
          variant="standard"
          label="Keterangan Kegiatan"
          style={{margin: 16}}
          color="black"
          value={date.toLocaleString()}
          onPressIn={() => setOpen(true)}
        />
        <DatePicker
          modal
          minimumDate	={new Date()}
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          onDateChange={setDate}
        />
      </>

      <TouchableOpacity style={styles.wrapperBtn} onPress={handlePost}>
        <ButtonComponent
          label={'submit'}
          backgroundColor="white"
          textColor="black"
          borderColor="black"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.wrapperBtn} onPress={handleDelete}>
        <ButtonComponent
          label={'Detele'}
          backgroundColor="white"
          textColor="red"
          borderColor="red"
        />
      </TouchableOpacity>
    </View>
  );
}

export default EditKegiatanScreen;

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    flex: 1,
  },
  wrapperBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
