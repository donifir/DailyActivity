import {
  Alert,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, FC, useEffect, useState} from 'react';
import {TextInput} from '@react-native-material/core';
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMugSaucer, faPiggyBank} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {pengingatSelectors} from '../../../features/pengingatSlide';
import {
  getListKegiatan,
  kegiatanSelectors,
  postCreateKegiatan,
  postUpdateKegiatan,
  postUpdateKegiatanCeklist,
} from '../../../features/detailKegiatanSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/StackNavigation';
import ButtonbackComponent from '../../../componen/buttonbackComponent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
type Props = NativeStackScreenProps<RootStackParamList, 'ListPengingat'>;

const ListPengingat = ({route, navigation}: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<any>();
  const [namaPengingat, setNamaPengingat] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const idKegiatan = route.params.kegiatanId;

  const listPenginat = useAppSelector(kegiatanSelectors.selectAll);

  useEffect(() => {
    dispatch(getListKegiatan(idKegiatan));
  }, [dispatch, idKegiatan, JSON.stringify(listPenginat)]);

 

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nama_kegiatan', namaPengingat);
    formData.append('id_pengingat', idKegiatan);
    await dispatch(postCreateKegiatan(formData));
    setNamaPengingat('');
  };

  const Truehandle = async (pengingat: any) =>{
    setIsChecked(!pengingat.status);
    const formData = new FormData();
    formData.append('status', Number(!pengingat.status));

    await dispatch(
      postUpdateKegiatanCeklist({formData, idKegiatan: pengingat.id}),
    );
    dispatch(getListKegiatan(idKegiatan));
    // Alert.alert('status',String(isChecked))
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* <Text>{idKegiatan}</Text> */}
      <ImageBackground
        source={require('./../../../assets/image/Union1.png')}
        style={{flex: 1, alignItems: 'center'}}>
        <View>
          {/* <Text>{idKegiatan}</Text> */}
          <ButtonbackComponent onPress={() => navigation.goBack()} / >
        </View>
        {listPenginat.map((pengingat, index) => (
          <TouchableOpacity
            style={styles.wrapperText}
            key={index}
            onPress={() =>
              navigation.push('EditKegiatanScreen', {kegiatanId: pengingat.id})
            }>
            <View
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <BouncyCheckbox
                size={26}
                // value={Number(isChecked)}
                isChecked={Boolean(pengingat.status)}
                onPress={() => Truehandle(pengingat)}
                fillColor="black"
              />
            </View>
            <View style={{flex: 9}}>
              <Text style={styles.texth1}>{pengingat.nama_kegiatan}/{pengingat.status}</Text>
              <Text style={styles.texth2}>
                Time:{' '}
                {
                  <>
                    {pengingat.mulai_kegiatan
                      ? String(pengingat.mulai_kegiatan)
                      : 'not set'}
                  </>
                }
              </Text>
            </View>
            {/* <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesomeIcon icon={faPiggyBank} />
            </View> */}
          </TouchableOpacity>
        ))}
      </ImageBackground>

      {/* list */}
      <View style={styles.wrapperForm}>
        <View style={styles.form}>
          <TextInput
            label="Pengingat"
            color="black"
            value={namaPengingat}
            onChangeText={value => setNamaPengingat(value)}
          />
        </View>
        <TouchableOpacity style={styles.wrapperBtn} onPress={handleSubmit}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ListPengingat;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperForm: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 8,
    width: 55,
    height: 55,
  },
  wrapperBtn: {
    width: 55,
    height: 55,
    backgroundColor: '#42A8C3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperText: {
    marginVertical: 5,
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
    flexDirection: 'row',
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
});
