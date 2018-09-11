import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Dimensions,TextInput, TouchableOpacity,Image, Text, Alert, AsyncStorage } from 'react-native';
import    Topo          from './general/topo';
import    Menu          from './general/menu';
import    InputConfig   from './general/inputConfig';
import    TextConfig    from './general/textConfig';
import    SliderConfig  from './general/sliderConfig';
import    SideMenu      from 'react-native-side-menu';
import    ImagePicker   from 'react-native-image-picker';

import    FormProfile   from './FormProfile';

const win = Dimensions.get('window');
const primaryColor = '#2d7bdc';

export default class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      avatarSource: null,
      profile_photo: ''
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("profile_photo").then((value) => {
        this.setState({"profile_photo": value});
    }).done();
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
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
    header:  null
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
            <Topo title='Hit On' showMenu={true}/>
          </TouchableOpacity>
          <View>
            <View style={styles.positionPhoto}>
              <Image borderRadius={65}
                style={styles.imagePhoto}
                source={{ url: this.state.profile_photo}}/>
              {/*</TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <Text style={styles.textImage}> Alterar Foto do perfil </Text>
              </TouchableOpacity>
              */}
            </View>
            <FormProfile navigate={this.props.navigation} />
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
  positionPhoto: {
    paddingTop:10,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  positionLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3'
  },
  textImage: {
    color: primaryColor,
    marginTop: 5,
    marginBottom:15
  },
  positionText: {
    alignItems: 'center',
    marginTop: 15
  },
  textEntrar: {
    fontSize: 20,
    color: primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
    // fontFamily: 'segoeuil'
  },
  imagePhoto: {
    width: win.width/3,
    height: win.width/3,
    borderWidth: 0.5,
    borderColor: '#7e7e7e',
    marginBottom: 15
  },
});
