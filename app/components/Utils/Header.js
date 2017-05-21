import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { STYLES } from './../../config/style';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const HEADER = (
  <View
    style={STYLES.header}
  >
    <Image
      source={require('./../../img/logo.png')}
      style={{ width: SCREEN_WIDTH * 0.57 }}
      resizeMode="contain"
    />
  </View>
);
