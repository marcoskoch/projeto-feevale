import React, { Component } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert,
  AppState
} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';

import Topo from './general/topo';
import CardEvent from './general/cardEvent';
import Menu from './general/menu';
import SideMenu from 'react-native-side-menu';

const win = Dimensions.get('window');
const primaryColor = '#FFFFFF';
const facebookToken = '';

const saveEvent = (navigate, itemId, itemName) => {

  var keys = ['profile_phone', 'profile_gender', 'profile_minyear', 'profile_maxyear'];

  var checkPerfil = true;

  AsyncStorage.multiGet(keys, (err, stores) => {
    stores.map((result, i, store) => {
      let value = store[i][1];
      console.log(value);
      if (value == null) {
        checkPerfil = false;
      }
    });
  }).then( () => {
    if(checkPerfil) {
      try {
        AsyncStorage.setItem('idEvent', itemId.toString());
        AsyncStorage.setItem('nameEvent', itemName.toString().substr(0, 25));
        navigate('QrCode');
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
    } else {
      Alert.alert('Complete seu perfil');
    }
  }
  )
}


class Events extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    Moment.locale('en');
    var value = Moment().valueOf()
    sinceTime = value.toString().substr(0, 10);
    this.state = {
      isOpen: false,
      visibleLoading: true,
      listaItens: [],
      facebookToken: '',
      baseURL: [
        'https://graph.facebook.com/v2.11/tr3snh/events?fields=cover,start_time,name,place&since=' + sinceTime + '&access_token=',
        'https://graph.facebook.com/v2.11/SenseClub-NH-353990601312933/events?fields=cover,start_time,name,place&since=' + sinceTime + '&access_token=',
        'https://graph.facebook.com/v2.11/innloungebarnh/events?fields=cover,start_time,name,place&since=' + sinceTime + '&access_token=',
        'https://graph.facebook.com/v2.11/gruposambary/events?fields=cover,start_time,name,place&since=' + sinceTime + '&access_token=',
        'https://graph.facebook.com/v2.11/maoribeachclub/events?fields=cover,start_time,name,place&since=' + sinceTime + '&access_token=',
        'https://graph.facebook.com/v2.11/300cosmodiningroom/events?fields=cover,start_time,name,place&since=' + sinceTime + '&access_token=',
        'https://graph.facebook.com/v2.11/hitonapp/events?fields=cover,start_time,name,place&since=' + sinceTime + '&access_token='
      ],
    };

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    var cont = 0;
    AsyncStorage.getItem("facebookToken").then((value) => {
      this.setState({ "facebookToken": value });
      this.state.baseURL.forEach((value, index, array) => {
        axios.get(value + this.state.facebookToken).then(response => {
          console.log(response);
          this.setState({
            listaItens: [...this.state.listaItens, ...response.data.data]
          });
          cont++;
          if (cont === array.length) {
            var list = this.state.listaItens.sort(function compare(a, b) {
              var dateA = new Date(a.start_time);
              var dateB = new Date(b.start_time);
              return dateA - dateB;
            });
            this.setState({ listaItens: list });
            this.setState({ visibleLoading: false });
          }
        }).catch(() => {
          cont++;
          console.log('Erro ao recuperar os eventos');
        });
      });
    }).done();

  }

  render() {
    const menu = <Menu navigation={this.props.navigation} />;
    const { navigate } = this.props.navigation;

    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        menu={menu}>
        <View style={styles.backgroundLogin}>
          <TouchableOpacity onPress={this.toggle}>
            <Topo title='Hit On' showMenu={true} />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View>
              <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visibleLoading} textContent={"Carregando..."} color='#2d7bdc' textStyle={{ color: '#2d7bdc' }} />
              </View>
              {this.state.listaItens.map(item => (
                <TouchableOpacity key={item.id} style={styles.positionText} onPress={() => saveEvent(navigate, item.id, item.name)} >
                  <CardEvent
                    item={item}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SideMenu>
    );
  }
}

export default Events;

const styles = StyleSheet.create({
  backgroundLogin: {
    backgroundColor: primaryColor,
    flex: 1,
    flexDirection: 'column'
  }
});
