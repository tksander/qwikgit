import React, {Component} from 'react';
import { View, Text } from 'react-native';

export default class User extends Component {

  //-----------------------------------
  // RENDERING
  //-----------------------------------
  render() {
    return (
      <View>
       <Text>User: {this.props.login}</Text>
      </View>
    )
  }
}
