import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Card, Button } from 'react-native-elements'
import axios from 'axios';
import { PieChart } from 'react-native-svg-charts'

export default class DashboardMenu extends Component {
  constructor(props) {
    super(props)
    prefix_api = 'http://10.0.2.2/uasmobile/';
    // prefix_api = 'http://uasmobileyogi.000webhostapp.com/uasmobile/';
    // prefix_api = 'http://localhost/uasmobile/';
    dataaktif = 0;
    datanonaktif = 0;
    this.state = {
      dataKeg: [],
      dataKeh: [],
    }
  }


  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this._loadDataKegiatan();
        this._loadDataKehadiran();
      }
    );
  }

  _loadDataKegiatan = () => {
    axios.get(prefix_api + `read_countkegiatan.php`)
      .then(res => {
        const dataKeg = res.data;
        console.log(dataKeg);
        this.setState({ dataKeg });
      })
  }


  _loadDataKehadiran = () => {
    axios.get(prefix_api + `read_persentasekehadiran.php`)
      .then(res => {
        const dataKeh = res.data;
        console.log(dataKeh);
        this.setState({ dataKeh });
      })
  }

  _keyExtractor = (item, index) => index.toString()

  render() {
    this.state.dataKeh.map((data) => {
      dataaktif = data.val
      datanonaktif = 100 - data.val
    })

    const data = [Number((+dataaktif).toFixed(2)), Number((+datanonaktif).toFixed(2))]

    const color = ['#00CC33', '#FF3333']
    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: color[index],
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }))

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Card title="Persentase Kehadiran">
              <View style={{ width: '100%', flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ flex: 1, marginHorizontal: 5, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}></View>
                  <Text style={{ textAlign: 'right', marginRight: 5 }}>{data[0]}% Aktif</Text>
                  <View style={{ borderWidth: 10, borderColor: color[0] }}></View>
                </View>
                <View style={{ flex: 1, marginHorizontal: 5, flexDirection: 'row' }}>
                  <Text style={{ textAlign: 'left', marginRight: 5 }}>{data[1]}% Non Aktif</Text>
                  <View style={{ borderWidth: 10, borderColor: color[1] }}></View>
                </View>
              </View>
              <PieChart
                style={{ height: 200 }}
                data={pieData}
              />
            </Card>

            <Card title="Jumlah Kegiatan">
              <View style={{ width: '100%', marginBottom: 10, }}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: '#000' }}>
                  {
                    this.state.dataKeg.map((data) => {
                      return (
                        <Text key={this._keyExtractor}>{data.val}</Text>
                      )
                    })
                  } Kegiatan</Text>
              </View>

              <Button
                title="Detail Kegiatan"
                buttonStyle={{ backgroundColor: '#FFA348' }}
                onPress={() => {
                  this.props.navigation.navigate('Kegiatan')
                }}
              />
            </Card>
          </ScrollView>
        </View>
      </View >
    )
  }
}
