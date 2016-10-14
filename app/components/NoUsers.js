import React, {Component} from 'react';
import { View,
         Text,
         StyleSheet} from 'react-native';

export default class NoUsers extends Component {

  //-----------------------------------
  // RENDERING
  //-----------------------------------
  //
  render() {
    let text = '';
    if (this.props.filter) {
      text = `No results for "${this.props.filter}"`;
    } else if (!this.props.isLoading) {
      text = 'No users found';
    }

    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noUsersText}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  noUsersText: {
    marginTop: 80,
    color: '#888888',
  },
});
