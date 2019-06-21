import React, { Component } from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon, Header } from 'react-native-elements'

import DashboardMenu from './screens/dashboard/DashboardMenu'
import Kegiatan from './screens/dashboard/Kegiatan'
import DetailKegiatan from './screens/dashboard/DetailKegiatan'
import EditDetailKeg from './screens/dashboard/EditDetailKeg'

import AbsensiMenu from './screens/absensi/AbsensiMenu'
import AbsensiDetailKeg from './screens/absensi/list/DetailKeg'
import AbsensiListPeserta from './screens/absensi/list/ListPeserta'
import AbsensiScanBarcode from './screens/absensi/scan/ScanBarcode'
import AbsensiDelAbsensi from './screens/absensi/del/DelAbsensi'

import LoginScreen from './screens/login/Login'

global.globalusername = '';

const DashboardStack = createStackNavigator(
  {
    DashboardMenu: {
      screen: DashboardMenu,
      navigationOptions: {
        // headerTitle: 'DASHBOARD',
        header: <Header
          centerComponent={{ text: 'DASHBOARD', style: { color: '#fff', fontSize: 24 } }}
          containerStyle={{ backgroundColor: '#314B55' }}
        />
      }
    },
    Kegiatan: {
      screen: Kegiatan,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header
            leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => {
              navigation.goBack();
            }} />}
            centerComponent={{ text: 'KEGIATAN', style: { color: '#fff', fontSize: 24 } }}
            containerStyle={{ backgroundColor: '#314B55' }}
          />
        };
      }
    },
    DetailKegiatan: {
      screen: DetailKegiatan,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header
            leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => {
              navigation.goBack();
            }} />}
            centerComponent={{ text: 'DETAIL KEGIATAN', style: { color: '#fff', fontSize: 24 } }}
            containerStyle={{ backgroundColor: '#314B55' }}
          />
        };
      }
    },
    EditDetailKeg: {
      screen: EditDetailKeg,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header
            leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => {
              navigation.goBack();
            }} />}
            centerComponent={{ text: 'EDIT', style: { color: '#fff', fontSize: 24 } }}
            containerStyle={{ backgroundColor: '#314B55' }}
          />
        };
      }
    },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    initialRouteName: 'DashboardMenu',
    navigationOptions: {
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#000",
      },
      headerTintColor: "#fff"
    }
  }
);
const AbsensiStack = createStackNavigator(
  {
    AbsensiMenu: {
      screen: AbsensiMenu,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header
            centerComponent={{ text: 'ABSENSI', style: { color: '#fff', fontSize: 24 } }}
            containerStyle={{ backgroundColor: '#314B55' }}
          />
        };
      }
    },
    AbsensiDetailKeg: {
      screen: AbsensiDetailKeg,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header
            leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => {
              navigation.goBack();
            }} />}
            centerComponent={{ text: 'PILIH DETAIL KEGIATAN', style: { color: '#fff', fontSize: 24 } }}
            containerStyle={{ backgroundColor: '#314B55' }}
          />
        };
      }
    },
    AbsensiListPeserta: {
      screen: AbsensiListPeserta,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header
            leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => {
              navigation.goBack();
            }} />}
            centerComponent={{ text: 'LIST PESERTA KEGIATAN', style: { color: '#fff', fontSize: 24 } }}
            containerStyle={{ backgroundColor: '#314B55' }}
          />
        };
      }
    },
    AbsensiScanBarcode: {
      screen: AbsensiScanBarcode,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header
            leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => {
              navigation.goBack();
            }} />}
            centerComponent={{ text: 'SCAN BARCODE PESERTA', style: { color: '#fff', fontSize: 24 } }}
            containerStyle={{ backgroundColor: '#314B55' }}
          />
        };
      }
    },
    AbsensiDelAbsensi: {
      screen: AbsensiDelAbsensi,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header
            leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => {
              navigation.goBack();
            }} />}
            centerComponent={{ text: 'PESERTA - ' + navigation.state.params.id, style: { color: '#fff', fontSize: 24 } }}
            containerStyle={{ backgroundColor: '#314B55' }}
          />
        };
      }
    },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    initialRouteName: 'AbsensiMenu',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    DashboardStack,
    AbsensiStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'DashboardStack') {
          iconName = `ios-home`;
        } else if (routeName === 'AbsensiStack') {
          iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
      tabBarLabel: () => {
        const { routeName } = navigation.state
        let title = null
        if (routeName === 'DashboardStack') {
          title = 'Dashboard'
        } else if (routeName === 'AbsensiStack') {
          title = 'Absensi'
        }
        return <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>{title}</Text>
      },
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#DBDBDB',
      activeBackgroundColor: '#314B55',
      inactiveBackgroundColor: '#446671',
    },
  }
);

const DrawerNavigator = createDrawerNavigator({
  //Drawer Optons and indexing
  LoginScreen: { //Title
    screen: LoginScreen,
    // navigationOptions: {
    //   drawerLabel: "Demo Screen 1"
    // }
  },
  TabNavigator
});

export default createAppContainer(DrawerNavigator);