import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView } from 'react-native'
import { Header, Card, Button, ButtonGroup } from 'react-native-elements';
import {
  PieChart
} from 'react-native-chart-kit'


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const data = [
      { name: '% Aktif', population: 60, color: 'rgba(119, 11, 255, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: '% Non Aktif', population: 40, color: 'rgba(255, 99, 132, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ]

    return (
      <View style={{ flex: 1 }}>
        <Header
          // leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: "Dashboard", style: { color: '#fff', fontSize: 24 } }}
          // rightComponent={{ icon: 'home', color: '#fff' }}
          containerStyle={{
            backgroundColor: '#454C59',
            shadowOpacity: 0,
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          <Card
            title='KEAKTIFAN MAHASISWA'
          >
            <PieChart
              data={data}
              width={Dimensions.get('window').width - 80} // from react-native
              height={220}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              chartConfig={{
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
          </Card>
          <Card
            title='BANYAK KEGIATAN'
          >
            <Text style={{ color: '#000', fontSize: 34, textAlign: 'center', marginBottom: 10 }}>100</Text>
            <Button
              buttonStyle={{ borderRadius: 5, backgroundColor: '#FA8A47' }}
              title='Detail' 
              onPress={() => {
                this.props.navigation.navigate('Kegiatan', { username: item.id, nama_kegiatan: item.nama })
              }}
              />
          </Card>
        </ScrollView>
      </View>
    )
  }
}
