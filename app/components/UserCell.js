import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native';

export default class UserCell extends Component {
  render() {

  //-----------------------------------
  // RENDERING
  //-----------------------------------

    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>

        <View style={styles.row}>
          <Image source={{uri: this.props.user.avatar_url}}
          style={styles.cellImage}/>
        <View style={styles.textContainer}>
          <Text style={styles.userLogin}>{this.props.user.login}</Text>
        </View>
      </View>
        </TouchableElement>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  userLogin: {
    flex: 1,
    fontSize: 16,
    marginBottom: 2,
    fontFamily: 'HelveticaNeue-Medium'
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: '#d6d7da',
    marginRight: 10,
    marginLeft: 20,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});

