// REFACTOR: PREVIOUSLY index.ios.js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  Navigator,
} from 'react-native';

import User from './client/components/User.js'
import SearchBar from './client/components/SearchBar.js'
import githubService from './client/services/githubService.js'


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
  }


  //-----------------------------------
  // RENDERING
  //-----------------------------------

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
          <Navigator
            initialRoute={{ title: 'Search Scene', index: 0 }}
            renderScene={(route, navigator) => {
               return (
                <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                  <Text style={{paddingVertical: 20}}>Search for a Github User</Text>
                  <SearchBar onUpdate={this.onUpdate.bind(this)}/>
                </View>
               )
            }}
          />
      )
  }

  //-----------------------------------
  // PUBLIC METHODS
  //-----------------------------------

  onUpdate(text) {
    githubService.searchUser(text).then(response => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.items)
        })
      })
  }

  //-----------------------------------
  // PRIVATE METHODS
  //-----------------------------------


  _renderRow(rowData) {
   return (<User login={rowData.login}/>)
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
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);