import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import Display from './components/Display';
import Keyboard from './components/Keyboard';

export default function App() {
  return (
    <View style={styles.container}>
      <Display />
      <Keyboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
