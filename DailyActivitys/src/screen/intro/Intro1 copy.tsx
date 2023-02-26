import React from 'react';
import Animated, {
  BounceInLeft,
  FadeInLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import {Button, StyleSheet, View, SafeAreaView, Text} from 'react-native';

const Intro1 = () => {
  const [state, setState] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const Slide1 = () => {
    return <Text>Intro2</Text>;
  };

  //   function Slide2 (){
  //     <Text>Intro2</Text>
  // }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Button onPress={() => setVisible(!visible)} title="Create/Remove" />
        <Button onPress={() => setState(!state)} title="Update" />
        {visible && (
          <Animated.View
            entering={FadeInLeft.duration(100)}
            exiting={FadeOutRight.duration(100)}
            layout={Layout.springify()}
            style={[
              styles.box,
              {
                marginLeft: state ? 200 : 0,
                backgroundColor: state ? 'red' : 'blue',
              },
            ]}>
            <Slide1/>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Intro1;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 300,
  },
  box: {
    width: 100,
    height: 100,
  },
});
