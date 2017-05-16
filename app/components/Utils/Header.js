import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const HEADER = (
  <View
    style={{ flex: 1, marginTop: 0, justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center' }}
  >
    <Image
      source={require('./../../img/logo.png')}
      style={{ width: SCREEN_WIDTH * 0.57 }}
      resizeMode="contain"
    />
  </View>
);
