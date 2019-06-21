import React, { Component } from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import axios from 'axios';

export default class DetailKegiatan extends Component {
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
    id = this.props.navigation.state.params.id;
    axios.get(prefix_api + `read_listdetailkegiatan_byidkegiatan.php?id=` + id)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({ data });
      })
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <View>
      <ListItem
        title={item.keterangan}
        titleStyle={{ color: '#000' }}
        subtitle={item.tanggal}
        rightIcon={<Icon name='create' color='#000' /* onPress={() => { navigation.goBack(); }} */ />}
        onPress={
          () => {
            this.props.navigation.navigate('EditDetailKeg', { id: item.id, keterangan: item.keterangan, aktifsesi: item.aktifsesi })
          }
        }
      />
    </View>
  )


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
