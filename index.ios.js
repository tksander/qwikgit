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
      avatarUrl: '',
      repos: []
    }
  }

  componentDidMount() {
    // Abstract to Service
    const self = this;
    fetch('https://api.github.com/users/tksander')
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        self.setState({
          avatarUrl: responseJson.avatar_url
        })
      })

    fetch('https://api.github.com/users/tksander/repos')
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        self.setState({
          repos: responseJson
        })
      })
  }
  componentWillUnmount() {
    // Cancel outstanding requests -- necessary?
  }

  render() {
    let pic = { uri:  this.state.avatarUrl };


    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> QwikGit(hub) </Text>
        debugger
      <Repo name={this.state.repos[0].name} link={this.state.repos.state.repos[0].html_url}></Repo>
        <Image source={pic} style={{width: 200, height: 310}}/>
      </View>
    );
  }
}

class Repo extends Component {
  render() {
    return (
      <View style={styles.instructions}>
       <Text> Repo name: {this.props.name} link: {this.props.link}</Text>
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
