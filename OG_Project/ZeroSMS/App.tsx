/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {ModalPortal} from 'react-native-modals';
import StackNavigator from './StackNavigator';

function App(): React.JSX.Element {
  return (
    <>
      <StackNavigator />
      <ModalPortal />
    </>
  );
}

export default App;
