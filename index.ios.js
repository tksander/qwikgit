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
  render() {
    let pic = {
      uri:  'https://avatars.githubusercontent.com/u/8528358?v=3' };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          QwikGit(hub)
        </Text>
        <Text>Github repos: {this.props.repo}</Text>
        <Image source={pic} style={{width: 200, height: 310}}/>
      </View>
    );
  }
}
class ListNames extends Component {
  render() {
    return (
      <View style={styles.instructions}>
       <AwesomeProject repo='Tommy' />
       <AwesomeProject repo='Bob' />
      </View>
    ) 
  }
}

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
