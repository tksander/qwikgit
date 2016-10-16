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
import NoUsers from './NoUsers.js'


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
  componentDidMount() {
    this._searchUsers('');
  }
  componentWillUnmount() {
      clearTimeout(this.timer)
  }


  //-----------------------------------
  // RENDERING
  //-----------------------------------

  render() {

    let content = this.state.dataSource.getRowCount() === 0 ?
      <NoUsers
        filter={this.state.filter}
        isLoading={this.state.isLoading}
      /> :
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            // New attributes
            renderSeparator={this.renderSeparator}
            renderFooter={this.renderFooter.bind(this)}
            onEndReached={this.onEndReached.bind(this)}
            />
        </View>


    return (
      <View style={styles.container}>
        <SearchBar
          onSearchChange={this.onSearchChange.bind(this)}
          isLoading={this.state.isLoading}
          onFocus={() =>
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo({ x: 0, y: 0 })}
        />
        <View style={styles.separator} />
        {content}
      </View>
    );
  }

  //-----------------------------------
  // PUBLIC METHODS
  //-----------------------------------
  //

  onSearchChange(event: Object) {
    debugger
    var that = this
    const filter = event.nativeEvent.text.toLowerCase();

    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(() => {that._searchUsers(filter)}, 1000)
  }

  //-----------------------------------
  // PRIVATE METHODS
  //-----------------------------------
  //

  onEndReached() {
    var query = this.state.filter;
    if (!this.hasMore() || this.state.isLoadingTail) {
      // We're already fetching or have all the elements so noop
      return;
    }

    if (LOADING[query]) {
      return;
    }

    LOADING[query] = true;
    this.setState({
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: true,
    });

    var page = resultsCache.nextPageNumberForQuery[query];
    invariant(page != null, 'Next page number for "%s" is missing', query);
    fetch(this._urlForQueryAndPage(query, page))
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        LOADING[query] = false;
        this.setState({
          isLoadingTail: false,
        });
      })
      .then((responseData) => {
        var moviesForQuery = resultsCache.dataForQuery[query].slice();

        LOADING[query] = false;
        // We reached the end of the list before the expected number of results
        if (!responseData.movies) {
          resultsCache.totalForQuery[query] = moviesForQuery.length;
        } else {
          for (var i in responseData.movies) {
            moviesForQuery.push(responseData.movies[i]);
          }
          resultsCache.dataForQuery[query] = moviesForQuery;
          resultsCache.nextPageNumberForQuery[query] += 1;
        }

        if (this.state.filter !== query) {
          // do not update state if the query is stale
          return;
        }

        this.setState({
          isLoadingTail: false,
          dataSource: this.getDataSource(resultsCache.dataForQuery[query]),
        });
      })
      .done();
  }

  // TODO: Break out into private functions
  _searchUsers(query: string) {
    var that = this
    console.log('[SearchView] search users query:' + query)
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

    that = this
    githubService.searchUser(query)
      .then((responseData) => {
        debugger
      // TODO
      this.LOADING[query] = false;

      // TODO
      this.resultsCache.totalForQuery[query] = responseData.total_count;
      this.resultsCache.dataForQuery[query] = responseData.items;

      // TODO what does this do
      this.resultsCache.nextPageNumberForQuery[query] = 2;

      if (this.state.filter !== query) {
        // do not update state if the query is stale
        return;
      }

      this.setState({
        isLoading: false,
        dataSource: this._getDataSource(responseData.items),
      });
     })
    .catch((error) => {
       this.LOADING[query] = false;
       this.resultsCache.dataForQuery[query] = undefined;
       this.setState({
        dataSource: this._getDataSource([]),
         isLoading: false,
       });
    })
  }

  _getDataSource(users: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(users);
  }

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
    flex: 2,
    backgroundColor: 'white'
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  default: {
    flex: 1,
}
});

