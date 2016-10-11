import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';

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
      <View style={{alignSelf: 'stretch', paddingHorizontal: 20}}>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onKeyPress={this._handleKeyPress.bind(this)}
            onChangeText={(moreText) => this.setState({text: moreText})}
            placeholder="Search for a user..."
            autoCapitalize="words"
            auotCorrect="false"
        />
      </View>
    );
  }

  //-----------------------------------
  // PRIVATE METHODS
  //-----------------------------------

  _handleKeyPress(event) {
    if (event.nativeEvent.key === 'Enter') {
      this._update(this.state.text)
    }
  }

  _update(text) {
    this.props.onUpdate(text)
  }
}
