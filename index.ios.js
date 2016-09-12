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
  Image,
  ListView
} from 'react-native';


class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows({rowHasChanged: this._rowHasChanged}),
      avatarUrl: '',
      repos: null,
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
          dataSource: self.state.dataSource.cloneWithRows(responseJson)
        })
      })
  }


  _renderRow(rowData) {
   return (<Repo name={rowData.name} link={rowData.html_url}></Repo>)
  }

  render() {
    const self = this
    let pic = { uri:  this.state.avatarUrl };

    if (this.state.dataSource && this.state.avatarUrl) {
      return (
        <View style={styles.container}>
          <Text>Hello</Text>
          <View>
            <Header></Header>
          </View>
          <Image source={pic} style={{width: 80, height: 80}}/>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            />
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

class Header extends Component {
  render() {
    return (
      <View>
      <Text>QwikGit</Text>
      </View>
    )
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
