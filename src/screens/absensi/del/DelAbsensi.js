import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements'
import axios from 'axios';

export default class DelAbsensi extends Component {
  constructor(props) {
    super(props)
    prefix_api = 'http://10.0.2.2/uasmobile/';
    // prefix_api = 'http://uasmobileyogi.000webhostapp.com/uasmobile/';
    // prefix_api = 'http://localhost/uasmobile/';
    this.state = {
      nama: "",
      idpes: "",
      notelp: "",
      jk: "",

      icon: "ios-checkmark-circle",
      iconcolor: "#009926",

      isHapus: false
    }
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this._loadData();
      }
    );
  }

  _loadData = () => {
    this.setState({ nama: this.props.navigation.state.params.nama });
    this.setState({ idpes: this.props.navigation.state.params.id });
    this.setState({ notelp: this.props.navigation.state.params.notelp });
    this.setState({ jk: this.props.navigation.state.params.jk });
  }

  _iconClickHandle = () => {
    this.setState({ isHapus: !this.state.isHapus }, () => {
      if (this.state.isHapus) {
        this.setState({ icon: "ios-close-circle" });
        this.setState({ iconcolor: "#990000" });
      } else {
        this.setState({ icon: "ios-checkmark-circle" });
        this.setState({ iconcolor: "#009926" });
      }
    });
  }

  _simpanPerubahan = () => {
    if (this.state.isHapus) {
      var idabsen = this.props.navigation.state.params.idabsen;
      axios.post(prefix_api + 'delete_absensi.php', {
        id_absensi: idabsen,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ width: '100%', paddingBottom: 10, borderBottomWidth: 1, marginBottom: 20, alignItems: 'center' }}>
          <Ionicons onPress={this._iconClickHandle} name={this.state.icon} size={100} color={this.state.iconcolor} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <Image
            source={{ uri: this.props.navigation.state.params.fotopes }}
            style={{ height: 50, width: 50, borderRadius: 200, }}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={{ padding: 5, borderBottomWidth: 1, marginHorizontal: 5, marginBottom: 10 }}>
              <Text style={{ fontSize: 14, color: '#000' }}>Nama : {this.state.nama}</Text>
            </View>
            <View style={{ padding: 5, borderBottomWidth: 1, marginHorizontal: 5, marginBottom: 10 }}>
              <Text style={{ fontSize: 14, color: '#000' }}>Jenis Kelamin : {this.state.jk}</Text>
            </View>
            <View style={{ padding: 5, borderBottomWidth: 1, marginHorizontal: 5, marginBottom: 10 }}>
              <Text style={{ fontSize: 14, color: '#000' }}>No Telp : {this.state.notelp}</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}></View>
        <Button title="SIMPAN PERUBAHAN"
          onPress={this._simpanPerubahan}
          buttonStyle={{ backgroundColor: '#FFA348' }} />
      </View>
    )
  }
}
