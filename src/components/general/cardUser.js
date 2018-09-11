import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import HideableView from '../customComponent/HideableView';
import DoubleClick from '../customComponent/DoubleClick';

const win = Dimensions.get('window');
const primaryColor = '#2d7bdc';

class CardUser extends Component {
  constructor(props) {
      super(props);
      this.state = {
          visible: false
      };
      this.toggle = this.toggle.bind(this);
  }
  toggle() {
      this.setState({
          visible: !this.state.visible
      });
      setTimeout(() => this.setState({
          visible: !this.state.visible
      }), 700);
  }
  render () {
    const item = this.props.item;
    return (
      <View style={styles.cardView}>
        <DoubleClick onClick={(event) => { this.toggle(); this.props.checkHit(item);}} >
            <View style={styles.cardImage}>
              <View>
                <Image
                  style={styles.imageEvent}
                  source={{uri: item.picture}}
                />
              </View>
              <HideableView visible={this.state.visible} duration={250}>
                <Image
                  style={styles.imageDoubleTap}
                  source={require('../../assets/images/HIT-On.png')}
                />
              </HideableView>
            </View>

            <View style={styles.viewText}>
              <Text style={styles.nameTitle}>{item.name}, {item.age}</Text>
            </View>
          </DoubleClick>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    height: win.width-10
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardImage: {
    alignItems: 'center',
    height: win.width-60,
    backgroundColor: '#000000'
  },
  imageEvent: {
    flex: 1,
    alignSelf: 'stretch',
    width:win.width-60,
    height:win.width-60,
    opacity: 0.9
  },
  imageDoubleTap: {
    width:120,
    height:120,
    alignItems: 'center',
    marginTop: -(win.width+60)/2

  },
  viewText: {
    flexDirection: 'row',
    margin: 5
  },
  nameTitle: {
    fontSize: 22,
    marginTop: 5,
    color: primaryColor
  }
});

export default CardUser;
