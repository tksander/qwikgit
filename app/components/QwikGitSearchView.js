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


export default class SearchView extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([]),
      avatarUrl: '',
      repos: null,
      text: '',
      isLoading: false,
      isLoadingTail: false,
      filter: '',
      queryNumber: 0,
    }
    this.resultsCache = {
      dataForQuery: {},
      nextPageNumberForQuery: {},
      totalForQuery: {},
    };
    this.LOADING = {};
  }



  //-----------------------------------
  // LIFECYCLE
  //-----------------------------------
  componentDidMount: function() {
    this.searchMovies('');
  },


  //-----------------------------------
  // RENDERING
  //-----------------------------------

  render() {
    if (this.state.dataSource.getRowCount() > 0) {
      return (
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            />
        </View>
      )
    }
      return (
        <View style={styles.container}>
          <SearchBar onSearchChange={this.onSearchChange} />
          <View style={styles.separator} />
        </View>
      )
  }

  //-----------------------------------
  // PUBLIC METHODS
  //-----------------------------------
  //

  // TODO: Break out into private functions
  searchMovies: function(query: string) {
    this.timeoutID = null;

    this.setState({filter: query});

    var cachedResultsForQuery = this.resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!this.LOADING[query]) {
        this.setState({
          dataSource: this._getDataSource(cachedResultsForQuery),
          isLoading: false
        });
      } else {
        this.setState({isLoading: true});
      }
      return;
    }

    this.LOADING[query] = true;
    this.resultsCache.dataForQuery[query] = null;
    this.setState({
      isLoading: true,
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: false,
    });

    // TODO replace with github service
    fetch(this._urlForQueryAndPage(query, 1))
      .then((response) => response.json())
      .catch((error) => {
        this.LOADING[query] = false;
        this.resultsCache.dataForQuery[query] = undefined;

        this.setState({
          dataSource: this._getDataSource([]),
          isLoading: false,
        });
      })
      .then((responseData) => {
        this.LOADING[query] = false;
        this.resultsCache.totalForQuery[query] = responseData.total;
        this.resultsCache.dataForQuery[query] = responseData.movies;
        this.resultsCache.nextPageNumberForQuery[query] = 2;

        if (this.state.filter !== query) {
          // do not update state if the query is stale
          return;
        }

        this.setState({
          isLoading: false,
          dataSource: this._getDataSource(responseData.movies),
        });
      })
      .done();
  },

  onSearchChange: function(event: Object) {
    var filter = event.nativeEvent.text.toLowerCase();

    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchMovies(filter), 100);
  },

  // Old Method
  // onUpdate(text) {
    // githubService.searchUser(text).then(response => {
        // this.setState({
          // dataSource: this.state.dataSource.cloneWithRows(response.items)
        // })
      // })
  // }

  //-----------------------------------
  // PRIVATE METHODS
  //-----------------------------------
  //

  _getDataSource: function(users: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(users);
  },

  _selectUser(user: Object) {
    this.props.buttonHandler(user)
  }

  _renderRow( user, sectionID, rowID, highlightRowFunc) {
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
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  default: {
    flex: 1,
}
});

