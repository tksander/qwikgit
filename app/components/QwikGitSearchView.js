// REFACTOR: PREVIOUSLY index.ios.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import UserCell from './UserCell.js'
import SearchBar from './SearchBar.js'
import githubService from '../services/githubService.js'


export default class AwesomeProject extends Component {
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
            renderRow={this._renderRow.bind(this)}
            />
        </View>
      )
    }
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

  _selectUser(movie: Object) {
   debugger 
      props.onButtonPress()
    // if (Platform.OS === 'ios') {
      // this.props.navigator.push({
        // title: movie.title,
        // component: MovieScreen,
        // passProps: {movie},
      // });
    // } else {
      // dismissKeyboard();
      // this.props.navigator.push({
        // title: movie.title,
        // name: 'movie',
        // movie: movie,
      // });
    // }
  }

  _renderRow( user, sectionID, rowID, highlightRowFunc) {
    // TODO This is lost because invoked inside another function.
    // Pass this in and invoke in selectUser.
    return (
      <UserCell
        key={user.id}
        onSelect={() => this._selectUser(user)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        user={user}
      />
    );
  }
}

const styles = StyleSheet.create({
});

