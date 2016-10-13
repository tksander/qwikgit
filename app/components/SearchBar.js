import React, {Component} from 'react';
import { View,
         Text,
         TextInput,
         ActivityIndicator,
         StyleSheet} from 'react-native';

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  //-----------------------------------
  // RENDERING
  //-----------------------------------

  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput
            style={styles.searchBarInput}
            onKeyPress={this._handleKeyPress.bind(this)}
            onChangeText={(moreText) => this.setState({text: moreText})}
            placeholder=" Search for a user..."
            autoCapitalize="words"
            auotCorrect="false"
        />
        <ActivityIndicator
          animating={this.props.isLoading}
          style={styles.spinner}
        />
      </View>
    );
  }

  //-----------------------------------
  // PRIVATE METHODS
  //-----------------------------------

  _handleKeyPress(event) {
    debugger
    console.log('EVENT', event)
    if (event.nativeEvent.key === 'Enter') {
      this._update(this.state.text)
    }
  }

  _update(text) {
    this.props.onUpdate(text)
  }
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  searchBarInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
  },
  spinner: {
    width: 30,
  },
});
