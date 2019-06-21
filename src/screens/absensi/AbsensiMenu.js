import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

export default class AbsensiMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="PENGABSENAN"
          onPress={() => { this.props.navigation.navigate('AbsensiDetailKeg', { username: globalusername, menu: 1 }) }} // MASIH STATIS
          buttonStyle={{ backgroundColor: '#314B55', marginBottom: 5, marginHorizontal: 10, marginTop: 10 }}
        />
        <Button
          title="LIST ABSENSI"
          onPress={() => { this.props.navigation.navigate('AbsensiDetailKeg', { username: globalusername, menu: 2 }) }} // MASIH STATIS
          buttonStyle={{ backgroundColor: '#314B55', marginBottom: 5, marginHorizontal: 10 }}
        />
      </View>
    )
  }
}
