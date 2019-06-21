import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements' // SEMENTARA BUTTON
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props)
    prefix_api = 'http://10.0.2.2/uasmobile/';
    // prefix_api = 'http://uasmobileyogi.000webhostapp.com/uasmobile/';
    this.state = {
      username: "",
      password: "",

      err: 0
    }
  }

  _login = () => {
    axios.get(prefix_api + `read_login.php?username=` + this.state.username + `&password=` + this.state.password)
      .then(res => {
        const data = res.data;
        console.log(data);

        var mystr = "{\"myval\": " + JSON.stringify(data) + "}";
        var Jsonval = JSON.parse(mystr);
        var val = null;
        try {
          val = Jsonval.myval[0].val;
        } catch (error) {
          alert(error);
          val = 0;
        }

        globalusername = this.state.username;

        if (+val > 0) {
          this.setState({ err: 0 })
          this.props.navigation.navigate('TabNavigator');
        } else {
          this.setState({ err: 1 })
        }
      })
  }

  _showForm = () => {
    if (this.state.err == 0) {
      return (
        <View style={{ margin: 20, padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 24, color: '#000' }}>Selamat Datang!</Text>
          <Text style={{ fontSize: 16, color: '#000' }}>Sistem Absensi Kegiatan (SISETAN) Login Page</Text>

          <Input
            containerStyle={{ marginBottom: 10 }}
            leftIcon={
              <Ionicons
                name='ios-person'
                size={24}
                color='#404040'
              />
            }
            onChangeText={(username) => {
              this.setState({ username })
            }}
            leftIconContainerStyle={{
              paddingRight: 10
            }}
            placeholder="Username"
            inputStyle={{ color: '#000' }}
          />
          <Input
            containerStyle={{ marginBottom: 10 }}
            leftIcon={
              <Ionicons
                name='ios-lock'
                size={24}
                color='#404040'
              />
            }
            onChangeText={(password) => {
              this.setState({ password })
            }}
            leftIconContainerStyle={{
              paddingRight: 10
            }}
            placeholder="Password"
            inputStyle={{ color: '#000' }}
            secureTextEntry={true}
          />
          <Button
            title="LOGIN"
            onPress={() => {
              this._login();
            }}
            containerStyle={{ marginTop: 10 }}
            buttonStyle={{ backgroundColor: '#314B55' }}
          />
        </View>
      )
    } else {
      return (
        <View style={{ margin: 20, padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 24, color: '#000' }}>Selamat Datang!</Text>
          <Text style={{ fontSize: 16, color: '#000' }}>Sistem Absensi Kegiatan (SISETAN) Login Page</Text>

          <Input
            containerStyle={{ marginBottom: 10 }}
            leftIcon={
              <Ionicons
                name='ios-person'
                size={24}
                color='#404040'
              />
            }
            onChangeText={(username) => {
              this.setState({ username })
            }}
            leftIconContainerStyle={{
              paddingRight: 10
            }}
            placeholder="Username"
            inputStyle={{ color: '#000' }}
          />
          <Input
            containerStyle={{ marginBottom: 10 }}
            leftIcon={
              <Ionicons
                name='ios-lock'
                size={24}
                color='#404040'
              />
            }
            onChangeText={(password) => {
              this.setState({ password })
            }}
            leftIconContainerStyle={{
              paddingRight: 10
            }}
            placeholder="Password"
            inputStyle={{ color: '#000' }}
            secureTextEntry={true}
            errorMessage="Username atau Password Salah!"
            errorStyle={{ color: 'red' }}
          />
          <Button
            title="LOGIN"
            onPress={() => {
              this._login();
            }}
            containerStyle={{ marginTop: 10 }}
            buttonStyle={{ backgroundColor: '#314B55' }}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          this._showForm()
        }
      </View>
    )
  }
}
