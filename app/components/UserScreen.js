import React, {Component} from 'react';
import { View,
         Image,
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

  // avatar_url, bio, email, name, created_at, location
  render() {
    if(!(Object.keys(this.state.user).length === 0)) {
      return (
        <View>
          <View>
              <Image source={{uri: this.state.user.avatar_url}}
                     style={{width: 120, height: 120}}/>
              <Text>User: {this.state.user.name}</Text>
              <Text>Email: {this.state.user.email}</Text>
              <Text>Created: {this.state.user.created_at}</Text>
              <Text>Location: {this.state.user.location}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/GitHub-Mark-32px.png')} style={styles.githubLogo}/>
          </View>
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
  githublogo: {
    opacity: 0.3,
    marginBottom: 10,
    marginTop: 10,
  },
  imagecontainer: {
    borderTopWidth: 0.5,
    borderTopColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
