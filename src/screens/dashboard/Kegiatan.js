import React, { Component } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import axios from 'axios';

export default class Kegiatan extends Component {
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
        this._loadDataKeg();
      }
    );
  }

  _loadDataKeg = () => {
    axios.get(prefix_api + `read_listkegiatan.php`)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({ data });
      })
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <ListItem
      title={item.nama}
      titleStyle={{color: '#000'}}
      subtitle={item.id}
      onPress={
        () => {
          this.props.navigation.navigate('DetailKegiatan', { id: item.id, title: item.nama })
        }
      }
    />
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    )
  }
}
