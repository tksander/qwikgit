import React, {Component} from 'react';
import { View,
         Text,
         ActivityIndicator,
         StyleSheet} from 'react-native';
import githubService from '../services/githubService'

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
        user: {}
    }
  }


  //-----------------------------------
  // RENDERING
  //-----------------------------------

  render() {
    if(!(Object.keys(this.state.user).length === 0)) {
      return (
        <View>
          <Text>TEst</Text>
        </View>
      )
    }
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    );
  }

  //-----------------------------------
  // PRIVATE METHODS
  //-----------------------------------
  //
  //
  componentDidMount() {
    githubService.getUser(this.props.user.login)
      .then(response => {
        debugger
        this.setState({
            user: response
        })
      })
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
