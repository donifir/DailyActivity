import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props={
  status:boolean,
  image:any,
  label:string,
}

const NavMenu:FC<Props> = ({status, image,label}) => {
  return (
    <View style={styles.wrapperIcon}>
      {/* <Image source={require('./../assets/image/Home.png')} /> */}
      {image}
      {status==true?<Text style={styles.text}>{label}</Text>:<></>}
      
    </View>
  )
}

export default NavMenu

const styles = StyleSheet.create({
  wrapperIcon: {
    width:windowWidth*0.25,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  text: {
    fontSize: 14,
    color: '#42A8C3',
    marginHorizontal: 6,
  },
})