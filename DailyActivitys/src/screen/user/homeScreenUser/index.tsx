import {
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {
  getListPengingat,
  pengingatSelectors,
} from '../../../features/pengingatSlide';
import ButtonCreatePengingat from '../../../componen/ButtonCreatePengingat';
import ModalCreate from '../../../componen/modal/modalCreate';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleDoubleRight,
  faAngleDoubleUp,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// type Props = NativeStackScreenProps<RootStackParamList, 'EditKegiatanScreen'>;

const HomeScreenUser = () => {
  const [userId, setUserId] = useState<string>('');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const listPenginat = useAppSelector(pengingatSelectors.selectAll); //cara ambil data dari store

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

  useEffect(() => {
    getData();
    dispatch(getListPengingat(userId));
  }, [dispatch, userId, userId]);

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[styles.wrapper]}>
      <ScrollView style={{marginBottom: 45}}>
        {/* content */}
        <Text style={{color: 'red'}}>ahahha:{userId}</Text>
        {listPenginat.map(
          (pengingat, index) => (
            // pengingat
            <View style={styles.wrapperCard} key={index}>
              <ImageBackground
                source={require('./../../../assets/image/Vector74.png')}
                imageStyle={{borderRadius: 20}}>
                <TouchableOpacity
                // style={{backgroundColor:'blue'}}
                  onPress={() =>
                    navigation.push('ListPengingat', {kegiatanId: pengingat.id})
                  }>
                <View style={styles.wrapperTextHead}>
                  <Text
                    style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                    {pengingat.nama_pengingat.substring(0, 30)}
                  </Text>
                  <Text style={{fontSize: 14, color: '#5a656b'}}>
                    {pengingat.keterangan_pengingat.substring(0, 40)}
                  </Text>
                </View>
              
                  <View style={styles.wrapperTime}>
                    <View style={styles.subWrapperTime}>
                      <Text style={styles.textTimeStyle}>
                        {<>{pengingat.mulai_pengingat}</>}
                      </Text>
                      {/* <Text>09.00</Text> */}
                    </View>
                    <View style={styles.subWrapperTo}>
                      <Text style={styles.textTimeStyle}>To</Text>
                    </View>
                    <View style={styles.subWrapperTime}>
                      <Text style={styles.textTimeStyle}>
                        {<>{pengingat.selesai_pengingat}</>}
                      </Text>
                      {/* <Text>09.00</Text> */}
                    </View>
                  </View>
                  <View style={styles.wrapperStatus}>
                    <Text>Prosess</Text>
                  </View>
                  <View style={styles.wrapperTag}>
                    <Text style={{fontSize: 14, color: '#2EA3F8'}}>
                      @doni, @firman, @syah
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.wrapperButtonDetail}
                  onPress={() =>
                    navigation.navigate('EditPengingatScreen', {
                      pengingatId: pengingat.id,
                    })
                  }>
                  <FontAwesomeIcon
                    icon={faAngleDoubleUp}
                    size={24}
                    color={'white'}
                  />
                </TouchableOpacity>
              </ImageBackground>
              
            </View>
          ),
          // pengingat
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.wrapperPengingat}
        onPress={() => navigation.navigate('ModalForm')}>
        <ButtonCreatePengingat />
      </TouchableOpacity>
      {/* content */}
    </Animated.View>
  );
};

export default HomeScreenUser;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  wrapperCard: {
    marginTop: 10,
    marginBottom: 10,
    width: windowWidth * 0.9,
    height: windowWidth * 0.4,
    backgroundColor: '#F5F5FA',
    borderRadius: 20,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    position: 'relative',
  },
  wrapperTextHead: {
    height: '40%',
    width: '100%',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5a656b',
  },
  wrapperTime: {
    // backgroundColor:'red',
    height: '30%',
    width: '100%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    // borderColor: '#2EA3F8',
  },
  subWrapperTime: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subWrapperTo: {
    flex: 1,
    borderEndWidth: 1,
    borderStartWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#2EA3F8',
  },
  wrapperStatus: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTag: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperPengingat: {
    position: 'absolute',
    bottom: 60,
    right: 15,
  },
  textTimeStyle: {
    color: 'black',
  },
  wrapperButtonDetail: {
    position: 'absolute',
    top: 10,
    right: 10,
    // backgroundColor:'red'
  },
});
