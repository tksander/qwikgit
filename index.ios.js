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
      dataSource: ds.cloneWithRows({rowHasChanged: this._rowHasChanged}),
      avatarUrl: '',
      repos: null,
      text: '',
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

  onUpdate(text) {
    console.log('Text in parent: ' + text)
  }

  render() {

    if (this.state.dataSource && this.state.avatarUrl) {
      return (
        <View>
          <Text>QwikGit</Text>
          <SearchBar onUpdate={this.onUpdate}/>
          <View>
            <Header pic={{ uri:  this.state.avatarUrl }}></Header>
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
          <Text>Loading...</Text>
        </View>
      )
  }
}

class Header extends Component {
  render() {
    return (
      <View>
          <Image source={this.props.pic} style={{width: 80, height: 80}}/>
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
  render() {
    return (
      <View>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={this.update.bind(this)}
            placeholder="Search a user..."
        />
      </View>
    );
  }
  update(text) {
    console.log('Text in child: ' + text)
    this.props.onUpdate(text)
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
