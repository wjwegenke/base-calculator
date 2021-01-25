import React, { useState } from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants'
import Display from './components/Display';
import Keyboard from './components/Keyboard';

export default function App() {
  const [base, setBase] = useState(10);

  const onKeypadPress = (e, value) => {
    console.log(value);
  };

  return (
    <View style={styles.container}>
      <Display />
      <Keyboard onKeypadPress={onKeypadPress} base={base} />
    </View>
  );
}

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
};
