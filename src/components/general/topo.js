import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import NavigationBar from 'react-native-navbar';

class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.txtTitulo}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

class IconMenu extends Component {
  render() {
    if (!this.props.showMenu) {
      return (
        <View style={styles.icon}>
          <Icon name="arrow-left" size={18} color="#FFF" />
        </View>
      );
    } else {
      return (
        <View style={styles.icon}>
          <Icon name="menu" size={20} color="#FFF" />
        </View>
      );
    }
  }
}

class Topo extends Component {
  render() {
    return (
      <View>
        <NavigationBar style={styles.menus}
          title={<Title title={this.props.title}/>}
          leftButton={<IconMenu showMenu={this.props.showMenu}/>}
          tintColor={'#2d7bdc'}
        />
      </View>
    );
  }
}

export default Topo;

const styles = StyleSheet.create({
  menus: {
    backgroundColor: '#2d7bdc'
  },
  txtTitulo: {
    fontSize: 25,
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
    //fontFamily: 'segoeuil'
  },
  icon: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
