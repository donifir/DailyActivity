import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const ScanScreenUser = () => {
  return (
    <Animated.View
    entering={FadeIn.duration(500)}
    exiting={FadeOut.duration(500)}
    style={[styles.wrapper]}>
      <Text>Fitur Belum Tersedia</Text>
      </Animated.View>
  )
}

export default ScanScreenUser

const styles = StyleSheet.create({
  wrapper:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  }
})