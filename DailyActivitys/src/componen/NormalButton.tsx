import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

type Props={
  label:string
}

const NormalButton:FC<Props> = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={{color:'white', fontSize:16}}>{props.label}</Text>
    </View>
  )
}

export default NormalButton

const styles = StyleSheet.create({
  wrapper:{
    width:100,
    height:40,
    backgroundColor:'#407BFF',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  }
})