import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Image, Dimensions, AsyncStorage } from 'react-native';
import { MaskService } from 'react-native-masked-text';
import Moment from 'moment';
const win = Dimensions.get('window');
const primaryColor = '#2d7bdc';

class CardEvent extends Component {
  constructor(props) {
    super(props);
    Moment.locale('en');
    if (props.item != null) {
      this.state = {
        date: Moment(props.item.start_time).format('DD/MM'),
        city: this.returnNameCity(props.item.place),
        name: props.item.name,
        place: this.returnPlaceEvent(props.item.place.name),
        photo: props.item.cover.source
      };
    }


  };

  returnPlaceEvent(item) {
    if (item.length > 19) {
        return item.substr(0, 15) + ' ...';
    }
    return item;
  }

  returnNameCity(item) {
    if (item != null) {
      if (item.location != null) {
        if (item.location.city != null) {
          return item.location.city;
        }
      }
    }
    return 'Desconhecido';
  }

  componentWillMount() {
    AsyncStorage.getItem("facebookToken").then((value) => {
        this.setState({"facebookToken": value});
    }).done();

  }

  render() {
    const item = this.props.item;
    return (
      <View style={styles.cardView}>
        <View style={styles.cardImage}>
          <Image
            style={styles.imageEvent}
            source={{ uri: this.state.photo }}
          />
        </View>
        <View style={styles.viewText}>
          <Text style={styles.dateTitle}>{this.state.date}</Text>
          <View>
            <Text numberOfLines={1} style={styles.nameTitle}>{this.state.name}</Text>
            <Text style={styles.localTitle}>{this.state.place} - {this.state.city}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 200,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4
  },
  cardImage: {
    alignItems: 'center',
    height: 150
  },
  imageEvent: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width - 20,
    height: 150
  },
  viewText: {
    flexDirection: 'row',
    margin: 5
  },
  dateTitle: {
    fontSize: 36,
    color: primaryColor,
    marginRight: 10,
    marginLeft: 10
    // alignItems: 'flex-start'
  },
  nameTitle: {
    fontSize: 20,
    width: 230,
    color: primaryColor
  },
  localTitle: {
    color: '#d6d7da'
  }
});

export default CardEvent;
