import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAddressCard, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {
  onPress:()=>void
}
  

const ButtonbackComponent: FC<Props> =(props) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
      <FontAwesomeIcon icon={faArrowLeft} size={24} color={'#42A8C3'} />
    </TouchableOpacity>
  );
};

export default ButtonbackComponent;

const styles = StyleSheet.create({
  wrapper: {
    width: windowWidth,
    height: 40,
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
