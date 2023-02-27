import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  ComponentDotActive,
  ComponentDotInactive,
  Intro1,
  Intro2,
  Intro3,
  Intro4,
} from '../../componen/intro';
import NormalButton from '../../componen/NormalButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'intro'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Intro = ({ route, navigation }: Props) => {
  const [page, setPage] = useState<number>(1);
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapperContentSlide}>
        {page === 1 ? (
          <Intro1 />
        ) : page === 2 ? (
          <Intro2 />
        ) : page === 3 ? (
          <Intro3 />
        ) : (
          <Intro4 />
        )}
      </View>
      <View style={styles.wrapperBtn}>
        <View style={styles.wrapperDotSlide}>
          {page === 1 ? <ComponentDotActive /> : <ComponentDotInactive />}
          {page === 2 ? <ComponentDotActive /> : <ComponentDotInactive />}
          {page === 3 ? <ComponentDotActive /> : <ComponentDotInactive />}
          {page === 4 ? <ComponentDotActive /> : <ComponentDotInactive />}
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={page===4?() => navigation.navigate('welcomeScreen'):() => setPage(page + 1)}>
            <NormalButton label={page===4?'Finish':'Next'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapperContentSlide: {
    height: windowHeight * 0.8,
  },
  wrapperDotSlide: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  wrapperBtn: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth * 0.9,
    flexDirection: 'row',
    height: windowHeight * 0.15,
    alignItems: 'center',
    marginHorizontal: windowWidth * 0.05,
  },
});
