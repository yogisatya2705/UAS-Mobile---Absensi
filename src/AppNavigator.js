import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, } from 'react-navigation';

import Home from './screens/Home';
import Login from './screens/Login';
import Kegiatan from './screens/Kegiatan'
import DetailKegiatan from './screens/DetailKegiatan'

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Home: {
      screen: Home,
    },
    Kegiatan: {
      screen: Kegiatan,
    },
    DetailKegiatan: {
      screen: DetailKegiatan,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName: 'Login',
  }
);

export default createAppContainer(AppNavigator);
