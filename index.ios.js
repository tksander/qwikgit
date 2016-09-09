/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class AwesomeProject extends Component {
  //test
  render() {
    let pic = {
      uri:  'https://avatars.githubusercontent.com/u/8528358?v=3' };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          QwikGit(hub)
        </Text>
        <Repo name='Tommy'> Some text here </Repo>
        <Repo name='Bob'> Some text here </Repo>
        <Image source={pic} style={{width: 200, height: 310}}/>
      </View>
    );
  }
}
class Repo extends Component {
  render() {
    return (
      <View style={styles.instructions}>
       <Text> Repo author: {this.props.name} </Text>
       <Text> Other text: {this.props.children} </Text>
      </View>
    )
  }
}

fetch('https://api.github.com/users/tksander/repos')
.then(function(response) {
  // console.log("JSON Response: " + response.blob())
  return response.json()
})
.then(function(responseJSON){
  debugger
  console.log("JSON Response: " + responseJSON)
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
