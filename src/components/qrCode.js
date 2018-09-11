import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  NavigatorIOS,
  Text } from 'react-native';
  import SideMenu from 'react-native-side-menu';

import Topo from './general/topo';
import Menu from './general/menu';
import CardUser from './general/cardUser';
import QRCodeScanner from './qrcodeScanner';

const win = Dimensions.get('window');
const primaryColor = '#2d7bdc';

const getEvent = () => {
  try {
    const nameEvent = AsyncStorage.getItem('nameEvent').then(nameEvent);
    if (nameEvent !== null) {
      return nameEvent.toString();
    }
  } catch (error) {
    Alert.alert(
      'Ops',
      'Tente novamente mais tarde!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }
}

export default class QrCode extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      nameEvent: '',
      idEvent: '',
      showMenu: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("nameEvent").then((value) => {
      this.setState({ "nameEvent": value });
    }).done();
    AsyncStorage.getItem("idEvent").then((value) => {
      this.setState({ "idEvent": value });
    }).done();
  }

  toggle() {
    if (this.state.showMenu) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    } else {
      const { navigate } = this.props.navigation;
      navigate('Events');
    }
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  static navigationOptions = {
    header: null
  };
  render() {
    const menu = <Menu navigation={this.props.navigation} />;
    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        menu={menu}>
        <View style={styles.backgroundLogin}>
          <TouchableOpacity onPress={this.toggle}>
            <Topo title={this.state.nameEvent} showMenu={this.state.showMenu} />
          </TouchableOpacity>
          <View contentContainerStyle={styles.contentContainer}>
            <QRCodeScanner navigation={this.props.navigation} />
          </View>
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  backgroundLogin: {
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'column'
  },
  scanQRCode: {
    marginTop: 50
  }
});
