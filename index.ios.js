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
      repos: null
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

  render() {
    const self = this
    let pic = { uri:  this.state.avatarUrl };
    let row = []

    if (this.state.repos && this.state.avatarUrl) {
      this.state.repos.forEach((repo) => {
       row.push(<Repo name={repo.name} link={repo.html_url} key={repo.id}></Repo>)
      })
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}> QwikGit(hub) </Text>
          <table>
            {row.slice(0,3)}
          </table>
          <Image source={pic} style={{width: 200, height: 310}}/>
        </View>
      )
    }
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
  }
}

class Repo extends Component {
  render() {
    return (
      <View style={styles.instructions}>
        <tr>
           <td><Text> Repo name: {this.props.name}</Text></td>
           <td><Text> link: {this.props.link}</Text></td>
        </tr>
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
