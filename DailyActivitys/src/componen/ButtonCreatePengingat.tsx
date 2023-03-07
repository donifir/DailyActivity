import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ButtonCreatePengingat = () => {
  return (
    <View style={styles.wrapperBtn}>
      <Text style={styles.text}>Create</Text>
    </View>
  )
}

export default ButtonCreatePengingat

const styles = StyleSheet.create({
  wrapperBtn:{
    width:90,
    height:35,
    backgroundColor:'#42A8C3',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderWidth:1,
  },
  text:{
    fontSize:18,
    fontWeight:'500',
    color:'white'
  }
})