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


// export default class User extends Component {

  //-----------------------------------
  // RENDERING
  //-----------------------------------
  // render() {
    // return (
      // <View>
       // <Text>User: {this.props.login}</Text>
      // </View>
    // )
  // }
// }




export default class UserCell extends Component {
  render() {
    // Pass info as this.props.whatever
    // var criticsScore = this.props.movie.ratings.critics_score;

  // Pic: avatar_url
  // Login: login

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
            <Text style={styles.userLogin}>User: {this.props.user.login}</Text>
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
    fontWeight: '500',
    marginBottom: 2,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});

