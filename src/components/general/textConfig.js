import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput } from 'react-native';
const win = Dimensions.get('window');

export default class TextConfig extends Component {
  render() {
    return (
      <View style={styles.positionInput}>
        <Text style={styles.titleInput}>{this.props.title}</Text>
        <Text style={styles.textInput}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    color: '#000000',
    flex: 3,
    borderBottomWidth: 1,
    paddingTop: 10,
    borderBottomColor: '#d3d3d3'
  }
});
