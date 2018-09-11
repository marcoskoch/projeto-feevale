import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
const win = Dimensions.get('window');

export default class SliderConfig extends Component {
  state = {
     multiSliderValue: [18, 25],
  };

  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
  }

  render() {
    return (
      <View style={styles.positionInput}>
        <Text style={styles.titleInput}>{this.props.title}</Text>
        <Text style={styles.textInput}>De {this.state.multiSliderValue[0]} a {this.state.multiSliderValue[1]} anos</Text>
        <View style={styles.sliderOne}>
          <MultiSlider
            values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
            sliderLength={280}
            onValuesChange={this.multiSliderValuesChange}
            min={18}
            max={55}
            step={1}
            allowOverlap
            snapped
          />
        </View>
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
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 10,
    flex: 1
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
  }
});
