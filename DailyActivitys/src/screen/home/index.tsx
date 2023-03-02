import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from 'react-native-reanimated';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {postDataLogout} from '../../features/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';
import NavMenu from '../../componen/NavMenu';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAddressCard,
  faCamera,
  faCameraAlt,
  faCameraRetro,
  faCommentAlt,
  faComments,
  faHeart,
  faHomeAlt,
  faIdBadge,
  faMugSaucer,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import HomeScreenUser from '../user/homeScreenUser';
import ContactScreenUser from '../user/contactScreenUser';
import SetingSreenUser from '../user/setingScreenUser';
import ScanScreenUser from '../user/scanScreenUser';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = NativeStackScreenProps<RootStackParamList, 'home'>;
const Home = ({route, navigation}: Props) => {
  const [page, setPage] = useState<string>('Home');

  return (
    <SafeAreaView style={styles.wrapper}>
      {page === 'Home' ? (
        <HomeScreenUser />
      ) : page === 'Contact' ? (
        <ContactScreenUser />
      ) : page === 'Scan' ? (
        <ScanScreenUser />
      ) : (
        <SetingSreenUser />
      )}

      {/* ---------------------- */}
      <View style={styles.wrapperNav}>
        <TouchableOpacity onPress={() => setPage('Home')}>
          <NavMenu
            status={page === 'Home' ? true : false}
            label="Home"
            image={
              <FontAwesomeIcon
                icon={faHomeAlt}
                size={24}
                color={page === 'Home' ? '#42A8C3' : '#D6D6D6'}
              />
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage('Contact')}>
          <NavMenu
            status={page === 'Contact' ? true : false}
            label="Contact"
            image={
              <FontAwesomeIcon
                icon={faAddressCard}
                size={24}
                color={page === 'Contact' ? '#42A8C3' : '#D6D6D6'}
              />
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage('Scan')}>
          <NavMenu
            status={page === 'Scan' ? true : false}
            label="Scan"
            image={
              <FontAwesomeIcon
                icon={faCameraAlt}
                size={24}
                color={page === 'Scan' ? '#42A8C3' : '#D6D6D6'}
              />
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage('Setting')}>
          <NavMenu
            status={page === 'Setting' ? true : false}
            label="Setting"
            image={
              <FontAwesomeIcon
                icon={faUser}
                size={24}
                color={page === 'Setting' ? '#42A8C3' : '#D6D6D6'}
              />
            }
          />
        </TouchableOpacity>
      </View>
      {/* ---------------------- */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5F5FA',
  },
  wrapperNav: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: 42,
    backgroundColor: '#F5F5FA',
    flexDirection: 'row',
    shadowOpacity: 0.3,
  },
});
