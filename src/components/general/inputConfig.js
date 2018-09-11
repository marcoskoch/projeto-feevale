import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput } from 'react-native';
const win = Dimensions.get('window');

export default class InputConfig extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.input };
  }
  render() {
    return (
      <View style={styles.positionInput}>
        <Text style={styles.titleInput}>{this.props.title}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={this.props.title}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
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
    borderBottomColor: '#d3d3d3'
  }
});
