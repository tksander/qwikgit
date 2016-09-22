import React, {Component, PropTypes} from 'react';
import { Navigator, Text, TouchableHighlight, View } from 'react-native';

export default class Navigation extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) =>
          return (
            <MyScene
              title={route.title}

              onForward={ () => {
                const nextIndex = route.index + 1;
                navigator.push({
                  title: 'Scene ' + nextIndex,
                  index: nextIndex,
                });
              }}

              // Function to call to go back to the previous scene
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}
            />
          )
        }

        // Refactor
        navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) =>
                { return (<Text>Cancel</Text>); },
               RightButton: (route, navigator, index, navState) =>
                 { return (<Text>Done</Text>); },
               Title: (route, navigator, index, navState) =>
                 { return (<Text>Awesome Nav Bar</Text>); },
             }}
             style={{backgroundColor: 'gray'}}
           />
        }

      />
    )
  }

}
