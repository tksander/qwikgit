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




export default class UserCell extends React.Component {
  render() {
    // Pass info as this.props.whatever
    // var criticsScore = this.props.movie.ratings.critics_score;


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
            <Text>User: {this.props.login}</Text>
            <Image
              source={getImageSource(this.props.movie, 'det')}
              style={styles.cellImage}/>
          </View>
        </TouchableElement>

      </View>
    );
  }
}

var styles = StyleSheet.create({
});

