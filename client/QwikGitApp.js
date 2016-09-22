import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import QwikGitNavigator from './client/QwikGitNavigator.js'

class QwikGitApp extends Component {

  //-----------------------------------
  // RENDERING
  //-----------------------------------

  render() {
    return (
      <View>
        <StatusBar
          translucent={true}
          backgroundColor="rbga(0,0,0,0.2)"
          barStyle="light-content"/>
        <QwikGitNavigator />
      </View>
    )
  }

  //-----------------------------------
  // PUBLIC METHODS
  //-----------------------------------


  //-----------------------------------
  // PRIVATE METHODS
  //-----------------------------------


const styles = StyleSheet.create({
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
