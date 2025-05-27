import React from 'react';
import { ImageBackground } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

export default function CustomTabBar(props) {
  return (
    <ImageBackground
      source={require('../assets/img/menu/background.png')}
      style={{
        width: '100%',
        height: 80,
        zIndex: 100, // Highest
      }}
      resizeMode="cover"
    >
      <BottomTabBar {...props} />
    </ImageBackground>
  );
}