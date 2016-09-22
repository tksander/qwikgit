import React, {Component, PropTypes} from 'react';
import { Navigator, Text, TouchableHighlight, View } from 'react-native';

export default class QwikGitNavigator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ id: 'first' }}
        renderScene={this.navigatorRenderScene} />
    )
  }
  navigatorRenderScene(route, navigator) {
      _navigator = navigator;
      switch (route.id)
      case 'first':
          return (<View><Text>First</Text></View>);
      case 'second':
          return (<View><Text>Second</Text></View>);
  }
}
