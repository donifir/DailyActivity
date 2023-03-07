import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonbackComponent from '../buttonbackComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {ListItem, TextInput} from '@react-native-material/core';
import ButtonComponent from '../ButtonComponent';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {
  pengingatSelectors,
  postUpdatePengingat,
} from '../../features/pengingatSlide';
import {useAppDispatch, useAppSelector} from '../../app/hooks';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<RootStackParamList, 'EditPengingatScreen'>;

const ModalEditPengingat = ({route, navigation}: Props) => {
  const [namaPengingat, setNamaPengingat] = useState<any>('');
  const [ketaranganPengingat, setKetaranganPengingat] = useState<any>('');
  const [isSubmiting, setIsSubmiting] = useState<boolean>();

  const dispatch = useAppDispatch();
  const pengingatDetail = useAppSelector(state =>
    pengingatSelectors.selectById(state, route.params.pengingatId),
  );

  useEffect(() => {
    setNamaPengingat(pengingatDetail?.nama_pengingat);
    setKetaranganPengingat(pengingatDetail?.keterangan_pengingat);
  }, []);

  const SubmitData = async () => {
    if (!namaPengingat) {
      Alert.alert('Gagal', 'Maaf Nama Pengingat Belom Diisi');
    }
    const formData = new FormData();
    formData.append('nama_pengingat', namaPengingat);
    formData.append('keterangan_pengingat', ketaranganPengingat);
    Alert.alert('nama', namaPengingat);
    dispatch(
      postUpdatePengingat({formData, pengingatId: route.params.pengingatId}),
    );
    setIsSubmiting(true);
    navigation.push('home');
  };

  return (
    <View style={styles.wrapper}>
      <Text>{pengingatDetail?.nama_pengingat}</Text>
      <View>
        <ButtonbackComponent onPress={() => navigation.goBack()} />
      </View>
      <View>
        <TextInput
          maxLength={20}
          variant="standard"
          label="Nama Pengingat"
          style={{margin: 16}}
          color="black"
          value={namaPengingat}
          onChangeText={value => setNamaPengingat(value)}
        />
        <TextInput
          maxLength={60}
          variant="standard"
          label="Keterangan"
          style={{margin: 16}}
          color="black"
          value={ketaranganPengingat}
          onChangeText={value => setKetaranganPengingat(value)}
        />
        <TextInput
          variant="standard"
          label="Tambah Editor"
          style={{margin: 16}}
          color="black"
        />
        <View style={styles.wrapperContent2}>
          <View style={styles.conten1}>
            <ListItem title="List Item" />
          </View>
          <View style={styles.conten2}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={'red'} />
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={SubmitData}>
          <ButtonComponent
            label="submit"
            backgroundColor="#42A8C3"
            textColor="black"
            borderColor="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalEditPengingat;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 16,
  },
  btn: {
    marginTop: 18,
    marginHorizontal: 16,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContent2: {
    flexDirection: 'row',
  },
  conten1: {
    flex: 3,
  },
  conten2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
