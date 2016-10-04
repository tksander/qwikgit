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
            <Text>User: {this.props.user.login}</Text>
            <Image source={{uri: this.props.user.avatar_url}}
                   style={{width: 40, height: 40}}/>
          </View>
        </TouchableElement>
      </View>
    );
  }
}

var styles = StyleSheet.create({
});

