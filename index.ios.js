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
    // this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    // this.dataSource = ds.cloneWithRows(this._genRows({}))
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows({rowHasChanged: this._rowHasChanged}),
      avatarUrl: '',
      repos: null,
    }
  }

  _onDataArrived(newData) {
    debugger
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData)
    })
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


  render() {
    const self = this
    let pic = { uri:  this.state.avatarUrl };

    // Refactor to map
    if (this.state.dataSource && this.state.avatarUrl) {
       // row.push(<Repo name={repo.name} link={repo.html_url}></Repo>)
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}> QwikGit(hub) </Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData => <Text>{rowData.name}</Text>)}
            />
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
