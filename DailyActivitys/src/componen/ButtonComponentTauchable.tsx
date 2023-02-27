import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';

const windowWidth = Dimensions.get('window').width;

type Props = {
  label: String;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  onPress: () => void;
};
const ButtonComponentTauchable: FC<Props> = ({label,backgroundColor,textColor,borderColor,onPress}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      style={[
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        styles.wrapperButton,
      ]}>
      <Text style={[{color: textColor}, styles.text]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponentTauchable;

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
