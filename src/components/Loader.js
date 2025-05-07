import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, ImageBackground, Text} from 'react-native';
import GradientText from './GradientText';

const Loader = () => {
  const firstImageOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loopAnimation();
  }, [firstImageOpacity]);

  const loopAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(firstImageOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(firstImageOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => loopAnimation());
  };

  return (
    <ImageBackground
      source={require('../assets/img/onboardBg.png')}
      style={styles.container}>
      <View
        style={{
          position: 'absolute',
          bottom: 150,
          marginHorizontal: 24,
          alignItems: 'center',
        }}>
        <Animated.View style={{opacity: firstImageOpacity}}>
          <GradientText colors={['#FD0404', '#FBE30A']} style={styles.title}>
            Splash & Track: Big Fishing
          </GradientText>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'Chango-Regular',
    textAlign: 'center',
  },
});

export default Loader;
