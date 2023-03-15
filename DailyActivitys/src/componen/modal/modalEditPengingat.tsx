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
import {faArrowLeft, faUser} from '@fortawesome/free-solid-svg-icons';
import {
  getDattarUserPengingat,
  getListUserPengingat,
  pengingatSelectors,
  postUpdatePengingat,
  removeItem,
} from '../../features/pengingatSlide';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import DropDownPicker from 'react-native-dropdown-picker';
import {friendSelectors} from '../../features/friendSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<RootStackParamList, 'EditPengingatScreen'>;

const ModalEditPengingat = ({route, navigation}: Props) => {
  const [namaPengingat, setNamaPengingat] = useState<any>('');
  const [ketaranganPengingat, setKetaranganPengingat] = useState<any>('');
  const [isSubmiting, setIsSubmiting] = useState<boolean>();
  const [userId, setUserId] = useState<string>('');
  // const [removeIdItem, setRemoveIdItem] = useState<any>([]);
  const [removeIdItem, setRemoveIdItem] = useState<string>('');
  const [removeLimitItem, setRemoveLimitItem] = useState<boolean>(false);

  // setvalue dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<any>([]);

  const pengingatId = route.params.pengingatId;
  const dispatch = useAppDispatch();
  const pengingatDetail = useAppSelector(state =>
    pengingatSelectors.selectById(state, route.params.pengingatId),
  );

  useEffect(() => {
    setNamaPengingat(pengingatDetail?.nama_pengingat);
    setKetaranganPengingat(pengingatDetail?.keterangan_pengingat);
  }, [dispatch]);

  const SubmitData = async () => {
    if (!namaPengingat) {
      Alert.alert('Gagal', 'Maaf Nama Pengingat Belom Diisi');
    } else {
      Alert.alert('Sukses', 'Data berhasil diupdate');
      const formData = new FormData();
      formData.append('nama_pengingat', namaPengingat);
      formData.append('keterangan_pengingat', ketaranganPengingat);
      formData.append('datalistuser', value);
      formData.append('remove_id_item', removeIdItem);
      dispatch(
        postUpdatePengingat({formData, pengingatId: route.params.pengingatId}),
      );
      setIsSubmiting(true);
      navigation.push('home');
    }
  };

  // getData user
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      if (value !== null) {
        setUserId(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const dataDaftarUser = useAppSelector(
    state => state.pengingat.dataDaftarUser,
  );
  const dataListUser = useAppSelector(state => state.pengingat.dataListUser);

  useEffect(() => {
    if (pengingatId) {
      dispatch(getListUserPengingat(pengingatId));
    }
  }, [pengingatId])
  
  useEffect(() => {
    if (userId && pengingatId) {
      dispatch(getDattarUserPengingat({pengingatId, userId}));
    }
  }, [pengingatId,userId])
  
  useEffect(() => {
    getData();
    if (dataDaftarUser) {
      let newArray = dataDaftarUser.map(item => {
        return {value: item.email, label: item.email};
      });
      setItems(newArray);
    }
  }, [JSON.stringify(dataDaftarUser)]);

  // remove item
  const removeItems = (id: any) => {
    dispatch(removeItem(id));
    // setRemoveIdItem(()=> [...removeIdItem,id] )
    setRemoveIdItem(id);
    setRemoveLimitItem(true);
    // setRemoveIdItem(removeIdItem+id)
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <ButtonbackComponent onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.wrapperTextHeader}>
        <Text style={styles.textHeader}>Ubah Data Pengingat</Text>
      </View>
      <View>
        <TextInput
          maxLength={20}
          variant="outlined"
          label="Nama Pengingat"
          style={{margin: 16}}
          color="black"
          value={namaPengingat}
          onChangeText={value => setNamaPengingat(value)}
        />
        <TextInput
          maxLength={60}
          variant="outlined"
          label="Keterangan"
          style={{margin: 16}}
          color="black"
          value={ketaranganPengingat}
          onChangeText={value => setKetaranganPengingat(value)}
        />

        <View style={styles.wrapperDropdowm}>
          <View style={{marginTop: 70}}>
            {dataListUser.map((data, index) => (
              <View style={styles.wrapperContent2} key={index}>
                <View style={styles.conten1}>
                  <ListItem title={data.email} />
                </View>
                {removeLimitItem ==false ? (
                  <TouchableOpacity
                    style={styles.conten2}
                    // onPress={() => Alert.alert('id', String(data.id))}>
                    onPress={() => removeItems(data.id)}>
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      size={24}
                      color={'red'}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.conten2}>
                    <FontAwesomeIcon
                      icon={faUser}
                      size={24}
                      color={'blue'}
                    />
                    <Text>Limit</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.btn} onPress={SubmitData}>
            <ButtonComponent
              label="submit"
              backgroundColor="white"
              textColor="black"
              borderColor="black"
            />
          </TouchableOpacity>

          <View style={styles.dropdown}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
        </View>
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
  wrapperTextHeader: {
    paddingTop: 16,
    marginBottom:16,
    paddingHorizontal: 16,
  },
  textHeader: {
    fontSize: 26,
  },
  btn: {
    marginTop: 60,
    marginHorizontal: 16,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContent2: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  conten1: {
    flex: 3,
  },
  conten2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  wrapperDropdowm: {},
  dropdown: {
    width: windowWidth,
    paddingHorizontal: 16,
    // margin: 16,
    position: 'absolute',
  },
});
