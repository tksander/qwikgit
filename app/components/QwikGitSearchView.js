// REFACTOR: PREVIOUSLY index.ios.js
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

import UserCell from './UserCell.js'
import SearchBar from './SearchBar.js'
import githubService from '../services/githubService.js'
import NoUsers from './NoUsers.js'
let invariant = require('invariant');

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
            renderSeparator={this._renderSeparator.bind(this)}
            renderFooter={this._renderFooter.bind(this)}
            onEndReached={this._onEndReached.bind(this)}
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
        <View style={styles.imageContainer}>
          <Image source={require('../assets/GitHub-Mark-32px.png')} style={styles.githubLogo}/>
        </View>
      </View>
    );
  }

  //-----------------------------------
  // PUBLIC METHODS
  //-----------------------------------
  //

  /**
   * @method onSearchChange
   * @public
   * @see https://facebook.github.io/react-native/docs/textinput.html#onsubmitediting
   * @param event {Object} React Native event object
   * @returns {undefined}
   */
  onSearchChange(event: Object) {
    var that = this
    const filter = event.nativeEvent.text.toLowerCase();

    clearTimeout(this.timeoutID: Number);
    this.timeoutID = setTimeout(() => that._searchUsers(filter), 1000)
  }

  //-----------------------------------
  // PRIVATE METHODS
  //-----------------------------------


  /**
   * @method _hasMore
   * @private
   * @returns {undefined}
   */
  _hasMore() {
    var query = this.state.filter;
    if (!this.resultsCache.dataForQuery[query]) {
      console.log('[SearchView]: hasMore:  No more results ')
      return true;
    }
    return (
      this.resultsCache.totalForQuery[query] !==
      this.resultsCache.dataForQuery[query].length
    );
  }

  /**
   * @method _renderSeparator
   * @private
   * @param 
   * @returns {undefined}
   */
  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  }

  _renderFooter() {
    if (!this._hasMore() || !this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }

    return <ActivityIndicator style={styles.scrollSpinner} />;
  }

  _onEndReached() {
    console.log('[SearchView]: End Reached')
    var query = this.state.filter;
    if (!this._hasMore() || this.state.isLoadingTail) {
      console.log('[SearchView]: No more results or alredy fetching results')
      console.log('[SearchView]: onEndReached: hasMore: ' + this._hasMore())
      console.log('[SearchView]: onEndReached: isLoadingTail: ' + this.state.isLoadingTail)
      // We're already fetching or have all the elements so noop
      return;
    }

    if (this.LOADING[query]) {
      console.log('[SearchView]: LOADING, no query')
      return;
    }

    this.LOADING[query] = true;
    this.setState({
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: true,
    });

    let page = this.resultsCache.nextPageNumberForQuery[query];
    invariant(page != null, 'Next page number for "%s" is missing', query);
    // fetch(this._urlForQueryAndPage(query, page))
    githubService.searchUser(query, page)
      .then(function(responseData) {
      console.log('[SearchView]: onEndReached: Github service results: ' + responseData)
        let usersForQuery = this.resultsCache.dataForQuery[query].slice();

        this.LOADING[query] = false;
        // We reached the end of the list before the expected number of results
        if (!responseData.items) {
          this.resultsCache.totalForQuery[query] = usersForQuery.length;
        } else {
          for (var i in responseData.items) {
            usersForQuery.push(responseData.items[i]);
          }
          this.resultsCache.dataForQuery[query] = usersForQuery;
          this.resultsCache.nextPageNumberForQuery[query] += 1;
        }

        if (this.state.filter !== query) {
          console.log('[SearchView]: State Data, not updating state')
          // do not update state if the query is stale
          return;
        }

        this.setState({
          isLoadingTail: false,
          dataSource: this._getDataSource(this.resultsCache.dataForQuery[query]),
        })
      }.bind(this))
      .catch(function(error) {
        console.error(error);
        this.LOADING[query] = false;
        this.setState({
          isLoadingTail: false,
        }.bind(this));
      })
  }

  // TODO: Break out into private functions
  _searchUsers(query: string) {
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

    githubService.searchUser(query)
      .then(function(responseData) {
      console.log('[SearchView]: searchUser: Github service results: ' + responseData)

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
     }.bind(this))
     // TODO remove old function syntax for bind
    .catch(function(error) {
      console.log('[SearchView] error retrieving user: ' + error)
       this.LOADING[query] = false;
       this.resultsCache.dataForQuery[query] = undefined;
       this.setState({
        dataSource: this._getDataSource([]),
         isLoading: false,
       });
    }.bind(this))
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
  rowSeparator: {
    height: 1,
    marginLeft: 4,
    marginTop: 3,
    marginBottom: 3,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  githubLogo: {
    opacity: 0.3,
    marginBottom: 10,
    marginTop: 10,
  },
  imageContainer: {
    borderTopWidth: 0.5,
    borderTopColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

