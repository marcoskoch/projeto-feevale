import React, { Component } from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
const win = Dimensions.get('window');

export default class ImageProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
        <Image borderRadius={65}
          style={styles.imagePhoto}
          source={ require('../../assets/images/user_photo.jpg')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagePhoto: {
    width: win.width/3,
    height: win.width/3,
    borderWidth: 0.5,
    borderColor: '#7e7e7e'
  },
});
