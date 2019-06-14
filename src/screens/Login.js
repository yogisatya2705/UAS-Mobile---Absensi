import React, { Component } from 'react'
import { Text, View, ImageBackground } from 'react-native'
import { Header, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props)
    prefix_api = 'http://10.0.2.2/uasmobile/';
    // prefix_api = 'http://uasmobileyogi.000webhostapp.com/db/';
    this.state = {
      username: "",
      password: "",
    }
  }

  _loginproses = () => {
    // BELUM LOGIN
    this.props.navigation.navigate('Home', { username: this.state.username });
  }

  render() {
    var err = this.props.navigation.getParam('err', "0");

    if (err == "0") {
      return (
        <View>
          <Header
            // leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: "Login", style: { color: '#fff', fontSize: 24 } }}
            // rightComponent={{ icon: 'home', color: '#fff' }}
            containerStyle={{
              backgroundColor: '#454C59',
              shadowOpacity: 0,
            }}
          />

          <View style={{ margin: 20, borderRadius: 20 }}>
            <Text style={{ color: '#000', fontSize: 20 }}>Selamat datang !</Text>
            <Text style={{ color: '#000', fontSize: 16, marginBottom: 20 }}>Sistem Absensi Kegiatan (SISETAN) Login Page</Text>

            <Input
              leftIcon={
                <Icon
                  name='user'
                  size={16}
                  color='#6B7F8E'
                />
              }
              leftIconContainerStyle={{
                paddingRight: 10
              }}
              placeholder='Username'
              inputStyle={{
                color: '#000', fontSize: 16,
              }}
              inputContainerStyle={{
                borderWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5
              }}
              placeholderTextColor='#D4D4D4'
              onChangeText={(username) => this.setState({ username })}
            />
            <Input
              leftIcon={
                <Icon
                  name='lock'
                  size={16}
                  color='#6B7F8E'
                />
              }
              leftIconContainerStyle={{
                paddingRight: 10
              }}
              placeholder='Password'
              inputStyle={{
                color: '#000', fontSize: 16,
              }}
              inputContainerStyle={{
                borderWidth: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5
              }}
              placeholderTextColor='#D4D4D4'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          <Button
            title="Login"
            buttonStyle={{ marginHorizontal: 20, borderRadius: 5, backgroundColor: '#FA8A47' }}
            containerStyle={{ margin: 0 }}
            onPress={() => {
              this._loginproses();
            }}
          />
        </View>
      )
    } else {
      return (
        <View>
          <Header
            // leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: "Login", style: { color: '#fff', fontSize: 24 } }}
            // rightComponent={{ icon: 'home', color: '#fff' }}
            containerStyle={{
              backgroundColor: '#454C59',
              shadowOpacity: 0,
            }}
          />

          <View style={{ margin: 20, borderRadius: 20 }}>
            <Text style={{ color: '#000', fontSize: 20 }}>Selamat datang !</Text>
            <Text style={{ color: '#000', fontSize: 16, marginBottom: 20 }}>Sistem Absensi Kegiatan (SISETAN) Login Page</Text>

            <Input
              leftIcon={
                <Icon
                  name='user'
                  size={16}
                  color='#6B7F8E'
                />
              }
              leftIconContainerStyle={{
                paddingRight: 10
              }}
              placeholder='Username'
              inputStyle={{
                color: '#000', fontSize: 16,
              }}
              inputContainerStyle={{
                borderWidth: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5
              }}
              placeholderTextColor='#D4D4D4'
              onChangeText={(username) => this.setState({ username })}
            />
            <Input
              leftIcon={
                <Icon
                  name='lock'
                  size={16}
                  color='#6B7F8E'
                />
              }
              leftIconContainerStyle={{
                paddingRight: 10
              }}
              placeholder='Password'
              inputStyle={{
                color: '#000', fontSize: 16,
              }}
              inputContainerStyle={{
                borderWidth: 1, borderBottomLeftRadius: 5, borderBottomRightRadius: 5
              }}
              placeholderTextColor='#D4D4D4'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
              errorStyle={{ color: 'red' }}
              errorMessage='Username / Password Salah!'
            />
          </View>
          <Button
            title="Login"
            buttonStyle={{ marginHorizontal: 20, borderRadius: 5, backgroundColor: '#FA8A47' }}
            containerStyle={{ margin: 0 }}
            onPress={() => {
              this._loginproses();
            }}
          />
        </View>
      )
    }
  }
}
