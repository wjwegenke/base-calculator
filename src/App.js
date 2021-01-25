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

  const onKeyFunctionPress = (e, value) => {
    console.log(value);
  }

  return (
    <View style={styles.container}>
      <Display style={styles.display}/>
      <Keyboard style={styles.keyboard} onKeypadPress={onKeypadPress} onKeyFunctionPress={onKeyFunctionPress} base={base} />
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
  display: {
    flex: 1,
  },
  keyboard: {
    height: 346,
  }
};
