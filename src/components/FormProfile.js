import React , { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, AsyncStorage, Alert  } from 'react-native';
import { connect } from 'react-redux';
import { modificaName, modificaEmail,
  modificaMaxYear, modificaMinYear,
  modificaGender, modificaPhone,
  saveProfile } from '../actions/ProfileActions';
import { Picker } from 'react-native-picker-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import axios from 'axios';

const win = Dimensions.get('window');
const primaryColor = '#2d7bdc';

class formProfile extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = {
        profile_name: this.props.name,
        profile_email: this.props.email,
        profile_phone: this.props.phone,
        profile_gender: this.props.gender,
        profile_minyear: this.props.minyear,
        profile_maxyear: this.props.maxyear,
        profile_id: this.props.profileId,
        profile_photo: this.props.profilePhoto,
        profile_birthday: this.props.profile_birthday,
        profile_gender_me: this.props.profileGenderMe,
        apiToken: this.props.apiToken,
      }
      this.setNome = this.setValueNome.bind(this)
      this.setEmail = this.setValueEmail.bind(this)
      this.setPhone = this.setValuePhone.bind(this)
      this.setGender = this.setValueGender.bind(this)
      this.setMinYear = this.setValueMinYear.bind(this)
      this.setMaxYear = this.setValueMaxYear.bind(this)
    }
    componentDidMount() {
      AsyncStorage.getItem("profile_name").then((value) => {
          this.setState({"profile_name": value});
      }).done();
      AsyncStorage.getItem("profile_email").then((value) => {
          this.setState({"profile_email": value});
      }).done();
      AsyncStorage.getItem("profile_phone").then((value) => {
          this.setState({"profile_phone": value});
      }).done();
      AsyncStorage.getItem("profile_gender").then((value) => {
          this.setState({"profile_gender": value});
      }).done();
      AsyncStorage.getItem("profile_minyear").then((value) => {
          this.setState({"profile_minyear": value});
      }).done();
      AsyncStorage.getItem("profile_maxyear").then((value) => {
          this.setState({"profile_maxyear": value});
      }).done();
      AsyncStorage.getItem("profile_id").then((value) => {
          this.setState({"profile_id": value});
      }).done();
      AsyncStorage.getItem("profile_photo").then((value) => {
          this.setState({"profile_photo": value});
      }).done();
      AsyncStorage.getItem("profile_birthday").then((value) => {
          this.setState({"profile_birthday": value});
      }).done();
      AsyncStorage.getItem("profile_gender_me").then((value) => {
          this.setState({"profile_gender_me": value});
      }).done();
      AsyncStorage.getItem("apiToken").then((value) => {
          this.setState({"apiToken": value});
      }).done();
    }

    setValueNome(profile_name) {
      this.setState({ profile_name })
      this.props.modificaName(profile_name);
    }

    setValueEmail(profile_email) {
      this.setState({ profile_email })
      this.props.modificaName(profile_email);
    }

    setValuePhone(profile_phone) {
      this.setState({ profile_phone })
      this.props.modificaName(profile_phone);
    }

    setValueGender(profile_gender) {
      this.setState({ profile_gender })
      this.props.modificaGender(profile_gender);
    }

    setValueMinYear(profile_minyear) {
      this.setState({ profile_minyear })
      this.props.modificaName(profile_minyear);
    }

    setValueMaxYear(profile_maxyear) {
      this.setState({ profile_maxyear })
      this.props.modificaName(profile_maxyear);
    }

    _saveProfile(state) {
        const name = state.profile_name;
        const email = state.profile_email;
        const minYear = state.profile_minyear;
        const maxYear = state.profile_maxyear;
        const gender = state.profile_gender;
        const birthday = state.profile_birthday;
        const phone = state.profile_phone;
        const photo = state.profile_photo;
        const profileGenderMe = state.profile_gender_me;
        if(this.validProfile(state)) {
            this.props.saveProfile({ name, email, minYear, maxYear, gender, phone });
            const body = {
              "name": name,
              "birthday" : birthday,
              "picture" : photo,
              "gender": profileGenderMe,
              "phone": phone,
            	"interestedIn": gender,
            	"minAge": minYear,
            	"maxAge": maxYear
            }
            const api = {
              "Content-Type": "application/json",
              "Authorization": "bearer " + this.state.apiToken
            }
            axios.put(
                "http://159.89.33.119:3000/api/users/" + this.state.profile_id,
                body,
                {headers: api}
            ).then(function (response) {
              console.log(response);
              Alert.alert(
                'Meus Dados',
                'Dados Salvos com sucesso!',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            }).catch(function (error) {
              console.log(error);
              Alert.alert(
                'Ops',
                'Tente novamente mais tarde!',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            });
        }
    }

    validProfile(state) {
      if (!this.validEmpty(state.profile_phone) || !this.validLength(state.profile_phone, 15)) {
        this.alertProfile('Telefone inválido!');
        return false;
      } else if (!this.validEmpty(state.profile_minyear) || !this.validLength(state.profile_minyear, 2)) {
        this.alertProfile('Idade Mínima inválida!');
        return false;
      } else if (!this.validEmpty(state.profile_maxyear) || !this.validLength(state.profile_maxyear, 2)) {
        this.alertProfile('Idade Máxima inválida!');
        return false;
      } else if (state.profile_maxyear <= state.profile_minyear) {
        this.alertProfile('Idade Máxima deve ser maior do que a idade mínima!');
        return false;
      }
      return true;
    }

    alertProfile(msg) {
      Alert.alert(
        'Meus Dados',
        msg,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }

    validEmpty(value) {
      if (value == null || value == '') {
        return false;
      }
      return true;
    }

    validLength(value, length) {
      if (value != null || value != '') {
        if (value.length >= length) {
          return true;
        }
      }
      return false;
    }

    render(){
        return (
            <View>
                <View style={styles.positionInput}>
                    <Text style={styles.titleInput}>Nome</Text>
                    <TextInput
                    style={styles.textInput}
                    placeholder="Nome"
                    editable={false}
                    value={this.state.profile_name}
                    onChangeText={texto => this.setNome(texto) }
                    />
                </View>
                <View style={styles.positionInput}>
                    <Text style={styles.titleInput}>E-mail</Text>
                    <TextInput
                    style={styles.textInput}
                    placeholder="E-mail"
                    keyboardType='email-address'
                    editable={false}
                    value={this.state.profile_email}
                    onChangeText={texto => this.setEmail(texto) }
                    />
                </View>
                <View style={styles.positionInput}>
                    <Text style={styles.titleInput}>Telefone</Text>
                    <TextInputMask
          						ref="Telefone"
                      type={'cel-phone'}
                      keyboardType='numeric'
                      returnKeyType='done'
          						style={styles.textInput}
                      value={this.state.profile_phone}
                      onChangeText={texto => this.setPhone(texto) }
          					/>
                </View>
                <View style={styles.positionInput}>
                  <Text style={styles.titleInput}>Gênero Interesse</Text>
                  <Picker
                    selectedValue={this.state.profile_gender}
                    onValueChange={this.setGender}
                    mode="dialog"
                    style={styles.textInput}
                    textStyle={styles.pickerText} >
                    <Picker.Item label="Feminino" value="female" />
                    <Picker.Item label="Masculino" value="male" />
                    <Picker.Item label="Ambos" value="both" />
                  </Picker>
                </View>
                <View style={styles.positionInput}>
                    <Text style={styles.titleInput}>Idade Mínima</Text>
                    <TextInputMask
          						ref="Idade Mínima"
          						type={'only-numbers'}
                      style={styles.textInput}
                      keyboardType='numeric'
                      returnKeyType='done'
                      value={this.state.profile_minyear}
                      maxLength={2}
                      onChangeText={texto => this.setMinYear(texto) }
          					/>
                </View>
                <View style={styles.positionInput}>
                    <Text style={styles.titleInput}>Idade Máxima</Text>
                    <TextInputMask
          						ref="Idade Máxima"
          						type={'only-numbers'}
                      style={styles.textInput}
                      keyboardType='numeric'
                      returnKeyType='done'
                      value={this.state.profile_maxyear}
                      maxLength={2}
                      onChangeText={texto => this.setMaxYear(texto) }
          					/>
                </View>
                <TouchableOpacity style={styles.positionText} onPress={() => this._saveProfile(this.state)}>
                    <Text style={styles.textEntrar}>Salvar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const lineProfile = () => {
    return (
        <View style={styles.positionLine}>
        </View>
    );
}

const styles = StyleSheet.create({
    positionLine: {
      borderBottomWidth: 1,
      borderBottomColor: '#d3d3d3'
    },
    pickerText: {
      color: '#000000',
    },
    positionInput: {
        flexDirection: 'row',
    },
    titleInput: {
        color: '#000000',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1
    },
    textInput: {
        flex: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3'
    },
    textEntrar: {
        fontSize: 20,
        color: primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
        // fontFamily: 'segoeuil'
    },
    positionText: {
        alignItems: 'center',
        marginTop: 15
      },
  });

const mapStateToProps = state => (
    {
        name: state.ProfileReducer.name,
        email: state.ProfileReducer.email,
        minYear: state.ProfileReducer.minYear,
        maxYear: state.ProfileReducer.maxYear,
        phone: state.ProfileReducer.phone,
        gender: state.ProfileReducer.gender
    }
)

export default connect(
    mapStateToProps,
    {
        modificaName,
        modificaEmail,
        modificaMaxYear,
        modificaMinYear,
        modificaGender,
        modificaPhone,
        saveProfile
    }
)(formProfile);
