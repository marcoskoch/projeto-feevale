import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StackNavigator } from 'react-navigation';

import ListUser from './src/components/listUser';
import Login from './src/components/login';
import Events from './src/components/events';
import ProfileUser from './src/components/profileUser';
import QrCode from './src/components/qrCode';
import reducers from './src/reducers';

export const SimpleApp = StackNavigator({
  Login: { screen: Login },
  Events: { screen: Events },
  ProfileUser: { screen: ProfileUser },
  QrCode: { screen: QrCode },
  ListUser: { screen: ListUser }
});

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Provider store={createStore(reducers)}>
          <SimpleApp />
        </Provider>
      </View>
    );
  }
}
