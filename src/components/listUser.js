import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  RefreshControl,
  AsyncStorage,
  Alert
} from 'react-native';
import axios from 'axios';

import Topo from './general/topo';
import Menu from './general/menu';
import CardUser from './general/cardUser';
import SideMenu from 'react-native-side-menu';
import Modal from 'react-native-modal'
import Spinner from 'react-native-loading-spinner-overlay';

const win = Dimensions.get('window');
const primaryColor = '#2d7bdc';

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.checkHit = this.checkHit.bind(this);

    this.state = {
      isOpen: false,
      showMenu: false,
      isModalVisible: false,
      refreshing: false,
      visibleLoading: true,
      itemSelected: [],
      listUsers: [],
      apiToken: '',
      profile_id: '',
      idEvent: '',
      nameEvent: '',
      hitedPhoto: '',
      hitedPhone: ''
    };
  }

  componentWillMount() {
    var keys = ['idEvent', 'nameEvent', 'profile_id', 'apiToken'];
    AsyncStorage.multiGet(keys, (err, data) => {
      this.setState({
        idEvent: data[0][1],
        nameEvent: data[1][1],
        profile_id: data[2][1],
        apiToken: data[3][1]
      });

      var url = "http://159.89.33.119:3000/api/users/"+this.state.profile_id+"/event/" + this.state.idEvent;
      var AuthStr = "bearer " + this.state.apiToken;
      axios.get(url, { headers: { Authorization: AuthStr } }).then(response => {
        console.log('deu certo ' + response);
        this.setState({
          listUsers: [...this.state.listUsers, ...response.data]
        });
        this.setState({ visibleLoading: false });
        alert(listUsers.length);
        if (listUsers.length == 0) {
          alert('sem usuário');
        }
      })
      .catch((error) => {
        console.log('error ' + error);
      });
    }).done();


    AsyncStorage.getItem("facebookToken").then((value) => {

    }).done();
  }

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  _onRefresh() {
    this.setState({ refreshing: true });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  };

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

  checkHit(hited) {
    const body = {
      "hitId": this.state.profile_id,
      "hitedId": hited.id,
      "eventId": this.state.idEvent
    }
    const api = {
      "Content-Type": "application/json",
      "Authorization": "bearer " + this.state.apiToken
    }
    let self = this;
    axios.post(
        "http://159.89.33.119:3000/api/hits",
        body,
        {headers: api}
    ).then(function (response) {
        console.log(response);
        self.setState({ 
          isModalVisible: response.data.mutual,
          hitedPhoto: hited.picture,
          hitedPhone: hited.phone
        })
    }).catch(function (error) {
      console.log(error);
      Alert.alert(
        'Ops',
        'Tente novamente mais tarde!',
        [
          {text: 'OK', onPress: () => this.props.navigation('Events')},
        ],
        { cancelable: false }
      )
    });
  }

  render() {
    const menu = <Menu navigation={this.props.navigation} />;
    return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        menu={menu}>
        <View style={styles.backgroundLogin}>
          <TouchableOpacity onPress={this.toggle}>
            <Topo title='Hit On' showMenu={this.state.showMenu} />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
          /* refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          } */
          >
            <View>
            <View style={{ flex: 1 }}>
              <Spinner visible={this.state.visibleLoading} textContent={"Carregando..."} color='#2d7bdc' textStyle={{ color: '#2d7bdc' }} />
            </View>
              {this.state.listUsers.map(item => (
                <CardUser
                  key={item.id}
                  item={item}
                  checkHit={this.checkHit}
                />
              ))}
            </View>
          </ScrollView>

          <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.container}>
              <Text style={styles.txtTitulo}>Deu Hit em Você!</Text>
              <View style={styles.cardImage}>
                <Image
                  style={styles.imageEvent}
                  source={{ uri: this.state.hitedPhoto }}
                />
              </View>
              <View style={styles.buttonBlue}>
                <Text style={styles.txtSubTitle}>Salve o número, para marcarem um hit</Text>
              </View>
              <View style={styles.buttonBlue}>
                <Text style={styles.txtSubTitle}>{this.state.hitedPhone}</Text>
              </View>
              <TouchableOpacity onPress={this._toggleModal}>
                <Text style={styles.txtReturn}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </Modal>

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

  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImage: {
    alignItems: 'center',
    height: win.width - 60,
    backgroundColor: '#000000'
  },
  imageEvent: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width - 60,
    height: win.width - 60,
    opacity: 0.9
  },
  buttonBlue: {
    backgroundColor: primaryColor,
    width: 300,
    height: 40,
    borderRadius: 65,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtTitulo: {
    fontSize: 25,
    color: '#FFF',
    marginBottom: 25,
    //fontFamily: 'segoeuil'
  },
  txtSubTitle: {
    fontSize: 15,
    color: '#FFF'
    //fontFamily: 'segoeuil'
  },
  txtReturn: {
    fontSize: 15,
    marginTop: 15,
    color: '#FFF'
    //fontFamily: 'segoeuil'
  },
});
