import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements' // SEMENTARA BUTTON
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanBarcode extends Component {
  constructor(props) {
    super(props)
    prefix_api = 'http://10.0.2.2/uasmobile/';
    prefix_img = 'http://10.0.2.2/uasmobile/imguser/';
    // prefix_api = 'http://uasmobileyogi.000webhostapp.com/uasmobile/';
    // prefix_img = 'http://uasmobileyogi.000webhostapp.com/uasmobile/imguser/';
    // prefix_api = 'http://localhost/uasmobile/';
    // prefix_img = 'http://localhost/uasmobile/imguser/';

    let scanner;
    errGetPes = 0;
    this.state = {
      nama: "",
      idpes: "",
      notelp: "",
      jk: "",
      idpeskegcur: "", // PASS DARI LIST PESERTA
      idpeskegbar: "",  // DARI BACODE
      isModalVisible: false,
      isPeserta: 0,
      idkeg: "",
      iddetailkeg: "",
      fotopes: "",

      username: "",

      data: [],
      dataPes: [],
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
    if (this.props.navigation.state.params.menu) {
      this.setState({ idkeg: this.props.navigation.state.params.idkeg });
      this.setState({ iddetailkeg: this.props.navigation.state.params.id });
    } else {
      this.setState({ idpeskegcur: this.props.navigation.state.params.idpeskeg }, () => {
        this._getDataPes(this.state.idpeskegcur);
      });
      this.setState({ idkeg: this.props.navigation.state.params.idkeg });
      this.setState({ iddetailkeg: this.props.navigation.state.params.iddetkeg });
    }
  }

  toggleModal = (e) => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  _scanBarcode = (e) => { // MASIH BUTTON BIASA BELUM BARCODE
    // alert(this.state.idkeg);
    this.setState({ idpeskegbar: e.data }, () => {
      this._getDataPes(this.state.idpeskegbar);
      if (errGetPes != 1) {
        errGetPes = 0;
        this._cekAbsen();
      }
    });
  }
  startScan = () => {
    if (scanner) {
      scanner._setScanning(false);
    }
  };
  _getDataPes(idpes) {
    axios.get(prefix_api + `read_peserta_byid.php?id=` + idpes)
      .then(res => {
        const dataPes = res.data;
        console.log(dataPes);
        this.setState({ dataPes }, () => {
          var mystr = "{\"myval\": " + JSON.stringify(this.state.dataPes) + "}";
          var Jsonval = JSON.parse(mystr);
          try {
            this.setState({ idpes: Jsonval.myval[0].id });
            this.setState({ nama: Jsonval.myval[0].nama });
            this.setState({ notelp: Jsonval.myval[0].notelp });
            this.setState({ jk: Jsonval.myval[0].jk });
            this.setState({ fotopes: Jsonval.myval[0].foto });
          } catch (error) {
            // alert(error);
            this.setState({ isPeserta: 2 });
            this.toggleModal();
            errGetPes = 1;
          }
        });
      })
  }

  _cekAbsen = () => {
    if (!this.props.navigation.state.params.menu) {
      if (this.state.idpeskegbar != this.state.idpeskegcur) {
        this.setState({ isPeserta: 0 });
        this.toggleModal();
        return
      }
    }

    axios.get(prefix_api + `read_ispesertakegiatan_byidpeskeg_idkeg.php?idpeskeg=` + this.state.idpeskegbar + `&idkeg=` + this.state.idkeg)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({ data }, () => {
          var mystr = "{\"myval\": " + JSON.stringify(this.state.data) + "}";
          var Jsonval = JSON.parse(mystr);
          var val = null;
          try {
            val = Jsonval.myval[0].val;
          } catch (error) {
            alert(error);
            val = 0;
          }

          if (val == "1") {
            this.setState({ isPeserta: 1 });
            this._postSimpanAbsen();
            this.toggleModal();
          } else {
            this.setState({ isPeserta: 2 });
            this.toggleModal();
          }
        });
      })
  }

  _postSimpanAbsen = () => {
    var msg = null;

    axios.post(prefix_api + 'create_absensi.php', {
      "id_detailkegiatan": this.state.iddetailkeg,
      "id_peserta": this.state.idpeskegbar,
    })
      .then(function (response) {
        console.log(response);
        msg = response;
      })
      .catch(function (error) {
        console.log(error);
        msg = error;
      });
  }

  _mymodal = () => {
    if (this.state.isPeserta == 1) {
      return (
        <Modal
          isVisible={this.state.isModalVisible}
          onSwipeComplete={() => this.toggleModal}
          swipeDirection="left"
        >
          <View style={{ flex: 1, backgroundColor: '#fff', marginVertical: 50, marginHorizontal: 10, borderRadius: 10, padding: 20 }}>
            <View style={{ width: '100%', paddingBottom: 10, borderBottomWidth: 1, marginBottom: 20, alignItems: 'center' }}>
              <Ionicons name='ios-checkmark-circle' size={100} color='#009926' />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Image
                source={{ uri: prefix_img + this.state.fotopes }}
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
            <Button title="OK" onPress={() => {
              this.props.navigation.goBack();
            }}
              buttonStyle={{ backgroundColor: '#FFA348' }} />
          </View>
        </Modal>
      )
    } else if (this.state.isPeserta == 0) {
      return (
        <Modal
          isVisible={this.state.isModalVisible}
          onSwipeComplete={() => this.toggleModal}
          swipeDirection="left"
        >
          <View style={{ flex: 1, backgroundColor: '#fff', marginVertical: 50, marginHorizontal: 10, borderRadius: 10, padding: 20 }}>
            <View style={{ width: '100%', paddingBottom: 10, borderBottomWidth: 1, marginBottom: 20, alignItems: 'center' }}>
              <Ionicons name='ios-close-circle' size={100} color='#990000' />
            </View>

            <Text style={{ fontSize: 34 }}>Tolong scan barcode AN. {this.state.nama} - {this.state.idpes} </Text>

            <View style={{ flex: 1 }}></View>
            <Button title="OK" onPress={() => { this.toggleModal(); this.setState({ isPeserta: 0 }); this.startScan(); }}
              buttonStyle={{ backgroundColor: '#FFA348' }} />
          </View>
        </Modal>
      )
    } else if (this.state.isPeserta == 2) {
      return (
        <Modal
          isVisible={this.state.isModalVisible}
          onSwipeComplete={() => this.toggleModal}
          swipeDirection="left"
        >
          <View style={{ flex: 1, backgroundColor: '#fff', marginVertical: 50, marginHorizontal: 10, borderRadius: 10, padding: 20 }}>
            <View style={{ width: '100%', paddingBottom: 10, borderBottomWidth: 1, marginBottom: 20, alignItems: 'center' }}>
              <Ionicons name='ios-close-circle' size={100} color='#990000' />
            </View>

            <Text style={{ fontSize: 34 }}>Tolong scan barcode kembali, data peserta tidak ditemukan! </Text>

            <View style={{ flex: 1 }}></View>
            <Button title="OK" onPress={() => { this.toggleModal(); this.setState({ isPeserta: 0 }); this.startScan(); }}
              buttonStyle={{ backgroundColor: '#FFA348' }} />
          </View>
        </Modal>
      )
    }
  }

  _renderTextAN = () => {
    if (!this.props.navigation.state.params.menu) {
      return (
        <View style={{ flex: 1, margin: 20 }}>

          <View style={{ flex: 1 }}>

          </View>
          <Text style={{ fontSize: 34 }}>AN. {this.state.nama} - {this.state.idpes} </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 2 }}>

        {
          this._mymodal()
        }


        <View>

          <QRCodeScanner
            ref={(camera) => scanner = camera}
            onRead={this._scanBarcode}
            cameraStyle={{
              height: 100
            }}
            // topContent={
            //   <Text style={styles.centerText}>
            //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
            // </Text>
            // }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.startScan()}>
                <Text style={styles.buttonText}>REACTIVATE</Text>
              </TouchableOpacity>
            }
          />
        </View>
        {
          this._renderTextAN()
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
