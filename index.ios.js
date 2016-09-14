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
  ListView,
  ActivityIndicator,
  TextInput,
} from 'react-native';

// var SearchBar = require('./SearchBar.ios.js')


class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([]),
      avatarUrl: '',
      repos: null,
      text: '',
    }
  }

  componentDidMount() {
    // Abstract to Service
    // const self = this;
    // fetch('https://api.github.com/users/tksander')
      // .then((response) => {
        // return response.json()
      // })
      // .then((responseJson) => {
        // self.setState({
          // avatarUrl: responseJson.avatar_url
        // })
      // })

    // fetch('https://api.github.com/users/tksander/repos')
      // .then((response) => {
        // return response.json()
      // })
      // .then((responseJson) => {
        // self.setState({
          // dataSource: self.state.dataSource.cloneWithRows(responseJson)
        // })
      // })
  }


   // return (<Repo name={rowData.name} link={rowData.html_url}></Repo>)

  _renderRow(rowData) {
   return (<User login={rowData.login}/>)
  }

  _searchGitHub(user) {
    const self = this;
    const url = 'https://api.github.com/search/users?q=' + user
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        self.setState({
          dataSource: self.state.dataSource.cloneWithRows(responseJson.items)
        })
      })
  }

  onUpdate(text) {
    this._searchGitHub(text)
  }

  render() {
    if (this.state.dataSource.getRowCount() > 0) {
      return (
        <View>
          <Text>QwikGit</Text>
          <View>
          </View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            />
        </View>
      )
    }
      return (
        <View>
          <Text>Search for a Github User</Text>
          <SearchBar onUpdate={this.onUpdate.bind(this)}/>
        </View>
      )
  }
}

            // <Header pic={{ uri:  this.state.avatarUrl }}></Header>
class Header extends Component {
  render() {
    return (
      <View>
          <Image source={this.props.pic} style={{width: 80, height: 80}}/>
      </View>
    )
  }
}

class User extends Component {
  render() {
    return (
      <View>
       <Text>User: {this.props.login}</Text>
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

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  render() {
    return (
      <View>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onKeyPress={this._handleKeyPress.bind(this)}
            onChangeText={(moreText) => this.setState({text: moreText})}
            placeholder="Search a user..."
        />
      </View>
    );
  }

  _handleKeyPress(event) {
    if (event.nativeEvent.key === 'Enter') {
      this.update(this.state.text)
    }
  }

  update(text) {
    console.log('Text in child: ' + text)
    this.props.onUpdate(text)
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
