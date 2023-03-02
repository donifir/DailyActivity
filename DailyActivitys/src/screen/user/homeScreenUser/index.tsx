import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreenUser = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[styles.wrapper]}>
      {/* content */}

      <View style={styles.wrapperCard}>
        <ImageBackground
          source={require('./../../../assets/image/Vector74.png')} imageStyle={{ borderRadius: 20}}
          >
          <View style={styles.wrapperTextHead}>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
              Mengatur Lalulintas
            </Text>
            <Text style={{fontSize: 14, color: '#5a656b'}}>
              Mengatur Lalulintas
            </Text>
          </View>

          <View style={styles.wrapperTime}>
            <View style={styles.subWrapperTime}>
              <Text>18 Januari 2023</Text>
              <Text>09.00</Text>
            </View>
            <View style={styles.subWrapperTo}>
              <Text>To</Text>
            </View>
            <View style={styles.subWrapperTime}>
              <Text>19 Januari 2023</Text>
              <Text>09.00</Text>
            </View>
          </View>
          <View style={styles.wrapperStatus}>
            <Text>Prosess</Text>
          </View>
          <View style={styles.wrapperTag}>
            <Text style={{fontSize: 14, color: '#2EA3F8'}}>
              @doni, @firman, @syah
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.wrapperCard}>
        <ImageBackground
          source={require('./../../../assets/image/Vector74.png')} imageStyle={{ borderRadius: 20}}
          >
          <View style={styles.wrapperTextHead}>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
              Mengatur Lalulintas
            </Text>
            <Text style={{fontSize: 14, color: '#5a656b'}}>
              Mengatur Lalulintas
            </Text>
          </View>

          <View style={styles.wrapperTime}>
            <View style={styles.subWrapperTime}>
              <Text>18 Januari 2023</Text>
              <Text>09.00</Text>
            </View>
            <View style={styles.subWrapperTo}>
              <Text>To</Text>
            </View>
            <View style={styles.subWrapperTime}>
              <Text>19 Januari 2023</Text>
              <Text>09.00</Text>
            </View>
          </View>
          <View style={styles.wrapperStatus}>
            <Text>Prosess</Text>
          </View>
          <View style={styles.wrapperTag}>
            <Text style={{fontSize: 14, color: '#2EA3F8'}}>
              @doni, @firman, @syah
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* content */}
    </Animated.View>
  );
};

export default HomeScreenUser;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems:'center'
  },
  wrapperCard: {
    marginTop: 20,
    width: windowWidth * 0.9,
    height: windowWidth * 0.4,
    backgroundColor: '#F5F5FA',
    borderRadius: 20,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    position: 'relative',
  },
  wrapperTextHead: {
    // backgroundColor:'red',
    height: '40%',
    width: '100%',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5a656b',
  },
  wrapperTime: {
    // backgroundColor:'red',
    height: '30%',
    width: '100%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    // borderColor: '#2EA3F8',
  },
  subWrapperTime: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subWrapperTo: {
    flex: 1,
    borderEndWidth: 1,
    borderStartWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#2EA3F8',
  },
  wrapperStatus: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperTag: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
