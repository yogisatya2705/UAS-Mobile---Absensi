import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements'
import axios from 'axios';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default class EditDetailKeg extends Component {
  constructor(props) {
    super(props)
    prefix_api = 'http://10.0.2.2/uasmobile/';
    // prefix_api = 'http://uasmobileyogi.000webhostapp.com/uasmobile/';
    // prefix_api = 'http://localhost/uasmobile/';
    this.state = {
      id: "",
      keterangan: "",
      aktifsesi: "",

      myradio: [
        { label: 'Non Aktif   ', value: 0 },
        { label: 'Aktif  ', value: 1 }
      ]
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
    this.setState({ id: this.props.navigation.state.params.id });
    this.setState({ keterangan: this.props.navigation.state.params.keterangan });
    this.setState({ aktifsesi: this.props.navigation.state.params.aktifsesi });
  }

  _postData = () => {
    var msg = null;

    axios.post(prefix_api + 'update_detailkegiatan.php', {
      "id": this.state.id,
      "keterangan": this.state.keterangan,
      "aktifsesi": this.state.aktifsesi
    })
      .then(function (response) {
        console.log(response);
        msg = response;
      })
      .catch(function (error) {
        console.log(error);
        msg = error;
      });

    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ margin: 10 }}>
            <Input
              containerStyle={{ marginBottom: 10 }}
              placeholder='id'
              label='ID :'
              value={this.state.id}
              inputStyle={{ color: '#808080' }}
              editable={false}
            />

            <Input
              containerStyle={{ marginBottom: 10 }}
              placeholder='Input keterangan'
              label='Keterangan :'
              labelStyle={{ marginBottom: 5 }}
              numberOfLines={3}
              multiline={true}
              underlineColorAndroid="transparent"
              inputStyle={{ borderWidth: 1, textAlignVertical: 'top' }}
              value={this.state.keterangan}
              onChangeText={(keterangan) => {
                this.setState({ keterangan })
              }}
            />

            <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
              <Text style={{ marginBottom: 5, fontWeight: 'bold', fontSize: 16 }}>Aktif Sesi :</Text>
              <RadioForm
                radio_props={this.state.myradio}
                initial={Number(this.props.navigation.state.params.aktifsesi)}
                formHorizontal={true}
                labelHorizontal={true}
                animation={true}
                onPress={(aktifsesi) => { this.setState({ aktifsesi: aktifsesi }) }}
              />
            </View>

            <Button
              title="SIMPAN"
              onPress={this._postData}
              buttonStyle={{ backgroundColor: '#314B55', marginBottom: 5, marginHorizontal: 10 }}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}
