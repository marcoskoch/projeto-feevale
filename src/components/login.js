import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image, TextInput, AsyncStorage } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import axios from 'axios';
import Modal from 'react-native-modal'

const win = Dimensions.get('window');
const primaryColor = '#2d7bdc';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }
  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        AsyncStorage.setItem('facebookToken', data.accessToken);
        if (data != null) {
          navigate('Events');
        }
      })
    return (
      <View style={styles.backgroundLogin}>
        <View style={styles.positionLogo}>
          <Image style={styles.imageLogo}
            source={require('../assets/images/HIT-On.png')} />
          <Text style={styles.textEntrar}>Hit On</Text>
        </View>
        <View style={styles.positionText}>
          <LoginButton
            readPermissions={["public_profile", 'email', 'user_birthday']}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("Login failed with error: " + result.error);
                } else if (result.isCancelled) {
                  alert("Login was cancelled");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      AsyncStorage.setItem('facebookToken', data.accessToken);
                      axios.post('http://159.89.33.119:3000/api/auth/login', {
                        facebookToken: data.accessToken,
                      }).then(function (response) {
                        var dataItem = response.data;
                        var dataUser = dataItem.user
                        AsyncStorage.setItem('profile_name', dataUser.name.toString());
                        AsyncStorage.setItem('profile_gender_me', dataUser.gender.toString());
                        AsyncStorage.setItem('profile_birthday', dataUser.birthday.toString());
                        AsyncStorage.setItem('profile_email', dataUser.email.toString());
                        AsyncStorage.setItem('profile_photo', dataUser.picture.toString());
                        AsyncStorage.setItem('profile_id', dataUser.id.toString());
                        AsyncStorage.setItem('apiToken', dataItem.token.toString());
                        navigate('Events');
                      }).catch(function (error) {
                        console.log(error);
                      });
                    })
                }
              }
            }
            onLogoutFinished={() => alert("User logged out")} />
        </View>
        <TouchableOpacity style={styles.positionContato} onPress={this._toggleModal}>
          <Text style={styles.textContato}>Contato</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.container}>
            <Text style={styles.txtTitulo}>Contato dos desenvolvedores!</Text>
            <Text style={styles.txtTitulo}>apphiton@gmail.com</Text>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text style={styles.txtReturn}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </Modal>


      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  backgroundLogin: {
    backgroundColor: primaryColor,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  positionLogo: {
    marginTop: 75,
    alignItems: 'center',
    flex: 4
  },
  imageLogo: {
    width: win.width / 2.5,
    height: win.width / 2.5
  },
  textEntrar: {
    fontSize: 35,
    marginTop: 15,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
    // fontFamily: 'segoeuil'
  },
  positionContato: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textContato: {
    fontSize: 15,
    color: '#FFFFFF',
    // fontFamily: 'segoeuil'
  },
  positionText: {
    alignItems: 'center',
    marginTop: 35,
    flex: 5
  },
  txtTitulo: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 20,
    //fontFamily: 'segoeuil'
  },
  txtReturn: {
    fontSize: 15,
    marginTop: 15,
    color: '#FFF'
    //fontFamily: 'segoeuil'
  },
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
