import React, { Component } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import axios from 'axios';

export default class DetailKeg extends Component {
  constructor(props) {
    super(props)
    prefix_api = 'http://10.0.2.2/uasmobile/';
    // prefix_api = 'http://uasmobileyogi.000webhostapp.com/uasmobile/';
    // prefix_api = 'http://localhost/uasmobile/';
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
    username = this.props.navigation.state.params.username;
    axios.get(prefix_api + `read_listdetailkegiatan_byusername.php?username=` + username)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({ data });
      })
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => {
    var menu = this.props.navigation.state.params.menu;
    var strnav = "";

    if (menu == 1) {
      strnav = "AbsensiScanBarcode"
    }else if (menu == 2) {
      strnav = "AbsensiListPeserta";
    }

    return (
      <View>
        <ListItem
          title={item.keterangan}
          titleStyle={{ color: '#000' }}
          subtitle={item.tanggal}
          onPress={
            () => {
              this.props.navigation.navigate(strnav, { id: item.id, idkeg: item.id_kegiatan, menu : this.props.navigation.state.params.menu })
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
