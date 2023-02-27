import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

const windowWidth = Dimensions.get('window').width;

type Props = {
  label: String;
  backgroundColor: string;
  textColor: string;
  borderColor:string;
};
const ButtonComponent: FC<Props> = props => {
  return (
    <View
      style={[{backgroundColor: props.backgroundColor, borderColor:props.borderColor}, styles.wrapperButton]}>
      <Text style={[{color: props.textColor}, styles.text]}>{props.label}</Text>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  wrapperButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.85,
    // backgroundColor: '#57419D',
    height: 44,
    borderRadius: 40,
    marginVertical: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
