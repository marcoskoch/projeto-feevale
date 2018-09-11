import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image, TextInput, Button, AsyncStorage } from 'react-native';
import ImageProfile from './imageProfile';
import { LoginManager } from 'react-native-fbsdk';

const win = Dimensions.get('window');
const primaryColor = '#2d7bdc';

export default class Menu extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      profile_gender: this.props.gender,
      profile_minyear: this.props.minyear,
      profile_maxyear: this.props.maxyear,
      profile_photo: this.props.photo,
    }

  }
  componentDidMount() {
    AsyncStorage.getItem("profile_gender").then((value) => {
      if (value == 'female') {
        this.setState({"profile_gender": 'Feminino'});
      } else if (value == 'male') {
        this.setState({"profile_gender": 'Masculino'});
      } else {
        this.setState({"profile_gender": 'Ambos'});
      }
    }).done();
    AsyncStorage.getItem("profile_minyear").then((value) => {
        this.setState({"profile_minyear": value});
    }).done();
    AsyncStorage.getItem("profile_maxyear").then((value) => {
        this.setState({"profile_maxyear": value});
    }).done();
    AsyncStorage.getItem("profile_photo").then((value) => {
        this.setState({"profile_photo": value});
    }).done();

  }
  logOut = (navigate) => {
    LoginManager.logOut();
    navigate('Login');
  }
  _renderMenu = () => {
     if (this.state.profile_gender) {
        return (
          <View>
           <Text style={styles.textTitle}>Idade</Text>
           <Text style={styles.textSubTitle}>Entre {this.state.profile_minyear} e {this.state.profile_maxyear} Anos</Text>
           <Text style={styles.textTitle}>Gênero de interesse</Text>
           <Text style={styles.textSubTitle}>{this.state.profile_gender}</Text>
          </View>
        );
      } else {
          return null;
      }
   }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.backgroundLogin}>
        <View style={styles.colorNavigation}>
        </View>
        <View style={styles.positionTextCenter}>
          <Text style={styles.textPerfil}>Meu Perfil</Text>
        </View>
        <View style={styles.positionPhoto}>
        <Image borderRadius={65}
          style={styles.imagePhoto}
          source={{ url: this.state.profile_photo}}/>
        </View>
        <View style={styles.positionTextStart}>
           {this._renderMenu()}
        </View>
        <TouchableOpacity style={styles.positionTextMenu} onPress={() => navigate('Events')}>
          <Text style={styles.textTitle}>Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.positionTextStart} onPress={() => navigate('ProfileUser')}>
          <Text style={styles.textTitle}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.positionTextStart} onPress={() => this.logOut(navigate)}>
          <Text style={styles.textTitle}>Sair</Text>
        </TouchableOpacity>
      </View>
  );
}
}

const styles = StyleSheet.create({
  colorNavigation: {
    backgroundColor: primaryColor,
    height: 20
  },
  backgroundLogin: {
    backgroundColor: primaryColor,
    flex: 1,
    flexDirection: 'column'
  },
  positionPhoto: {
    marginTop: 20,
    alignItems: 'center'
  },
  positionTextEnd: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 20
  },
  positionTextCenter: {
    alignItems: 'center',
    marginTop: 20
  },
  positionTextStart: {
    alignItems: 'flex-start',
    marginTop: 20,
    marginLeft: 20
  },
  positionTextMenu: {
    alignItems: 'flex-start',
    marginTop: 50,
    marginLeft: 20
  },
  imagePhoto: {
    width: win.width / 3,
    height: win.width / 3,
    borderWidth: 0.5,
    borderColor: '#7e7e7e'
  },
  textPerfil: {
    fontSize: 25,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
    // fontFamily: 'segoeuil'
  },
  textTitle: {
    fontSize: 20,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
    // fontFamily: 'segoeuil'
  },
  textSubTitle: {
    fontSize: 15,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
    // fontFamily: 'segoeuil'
  },
  textEditar: {
    fontSize: 15,
    color: '#FFF',
    justifyContent: 'flex-end'
    // fontFamily: 'segoeuil'
  },
});
