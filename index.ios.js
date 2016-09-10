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
  constructor(props) {
    super(props)
    this.state = {
      avatarUrl: ''
    }
  }

  componentDidMount() {
    // Abstract to Service
    const self = this;
    this.serverRequest =  fetch('https://api.github.com/users/tksander')
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        self.setState({
          avatarUrl: responseJson.avatar_url
        })
        debugger
      })
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    debugger
    let pic = { uri:  this.state.avatarUrl };
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
