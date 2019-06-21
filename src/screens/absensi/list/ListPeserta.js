import React, { Component } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ListPeserta extends Component {
  constructor(props) {
    super(props)
    prefix_api = 'http://10.0.2.2/uasmobile/';
    prefix_img = 'http://10.0.2.2/uasmobile/imguser/';
    // prefix_api = 'http://uasmobileyogi.000webhostapp.com/uasmobile/';
    // prefix_img = 'http://uasmobileyogi.000webhostapp.com/uasmobile/imguser/';
    // prefix_api = 'http://localhost/uasmobile/';
    // prefix_img = 'http://localhost/uasmobile/imguser/';
    this.state = {
      data: []
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
    id = this.props.navigation.state.params.id;
    axios.get(prefix_api + `read_peskeg_byiddetailkeg.php?iddetailkeg=` + id)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({ data });
      })
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => {
    var foto = prefix_img;

    if (item.foto != "") {
      foto = foto + item.foto;
    } else {
      foto = foto + "default.jpg";
    }

    if (item.isHadir) {
      icon = "ios-checkmark-circle";
      coloricon = "#009926";
    } else {
      icon = "ios-close-circle";
      coloricon = "#990000";
    }

    return (
      <View>
        <ListItem
          title={item.nama}
          titleStyle={{ color: '#000' }}
          subtitle={item.notelp}
          leftAvatar={{ source: { uri: foto } }}
          rightIcon={
            <Ionicons name={icon} size={25} color={coloricon} />
          }
          onPress={
            () => {
              if (item.isHadir) {
                this.props.navigation.navigate('AbsensiDelAbsensi', { idabsen: item.isHadir, id: item.idListPesKeg, notelp: item.notelp, jk: item.jk, idpes: item.id, nama: item.nama, idpeskeg: item.idListPesKeg, fotopes: foto })
              } else {
                this.props.navigation.navigate('AbsensiScanBarcode', { iddetkeg: this.props.navigation.state.params.id, idkeg: this.props.navigation.state.params.idkeg, notelp: item.notelp, jk: item.jk, idpes: item.id, nama: item.nama, idpeskeg: item.idListPesKeg, fotopes: foto })
              }
            }
          }
        />
      </View>
    )
  }


  render() {
    return (
      <ScrollView>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </ScrollView>
    )
  }
}
