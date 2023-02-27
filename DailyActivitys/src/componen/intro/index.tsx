import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { color, FadeIn, FadeOut } from 'react-native-reanimated'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Intro1 = () => {
  return (
    <Animated.View
    entering={FadeIn.duration(1500)}
    exiting={FadeOut.duration(1500)}
    style={[styles.box1]}
  >
    <View style={styles.wrapperImage}>
      <Image source={require('./../../assets/image/cuate.png')} />
    </View>

    <View style={styles.wrapperText}>
      <Text style={styles.h1}>Introduction 1</Text>
      <Text style={styles.h2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi nulla purus neque quisque dictum dui. Accumsan fames adipiscing.</Text>
    </View>
   
  </Animated.View>
  )
}

export const Intro2 = () => {
  return (
    <Animated.View
    entering={FadeIn.duration(1500)}
    exiting={FadeOut.duration(1500)}
    style={[styles.box1]}
  >
    <View style={styles.wrapperImage}>
      <Image source={require('./../../assets/image/rafiki.png')} />
    </View>

    <View style={styles.wrapperText}>
      <Text style={styles.h1}>Introduction 2</Text>
      <Text style={styles.h2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi nulla purus neque quisque dictum dui. Accumsan fames adipiscing.</Text>
    </View>
   
  </Animated.View>
  )
}

export const Intro3 = () => {
  return (
    <Animated.View
    entering={FadeIn.duration(1500)}
    exiting={FadeOut.duration(1500)}
    style={[styles.box1]}
  >
    <View style={styles.wrapperImage}>
      <Image source={require('./../../assets/image/bro.png')} />
    </View>

    <View style={styles.wrapperText}>
      <Text style={styles.h1}>Introduction 3</Text>
      <Text style={styles.h2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi nulla purus neque quisque dictum dui. Accumsan fames adipiscing.</Text>
    </View>
   
  </Animated.View>
  )
}

export const Intro4 = () => {
  return (
    <Animated.View
    entering={FadeIn.duration(1500)}
    exiting={FadeOut.duration(1500)}
    style={[styles.box1]}
  >
    <View style={styles.wrapperImage}>
      <Image source={require('./../../assets/image/rafiki2.png')} />
    </View>

    <View style={styles.wrapperText}>
      <Text style={styles.h1}>Introduction 4</Text>
      <Text style={styles.h2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi nulla purus neque quisque dictum dui. Accumsan fames adipiscing.</Text>
    </View>
   
  </Animated.View>
  )
}

export  const ComponentDotInactive =()=>{
  return(
    <View style={styles.dot}>

    </View>
  )
}

export  const ComponentDotActive =()=>{
  return(
    <View style={styles.dotActive}>

    </View>
  )
}



const styles = StyleSheet.create({
  box1:{
    justifyContent:'center',
    alignItems:'center'
  },
  wrapperImage:{
    paddingTop:55,
    height:350,
    // backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  wrapperText:{
    marginHorizontal:windowWidth*0.1,
    marginTop:10,
  },
  h1:{
    fontSize:24,
    fontWeight:'bold',
    color:'black',
    textAlign:'center',
  },
  h2:{
    marginTop:10,
    fontSize:15,
    color:'#575555',
    textAlign:'center',
  },
  dot:{
    width:8.5,
    height:8.5,
    backgroundColor:"#E9E6E6",
    margin:6,
    borderRadius:8.5/2
  },
  dotActive:{
    width:29.5,
    height:8.5,
    backgroundColor:"#407BFF",
    margin:6,
    borderRadius:8.5/2
  }
})