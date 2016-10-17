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
        <View style={styles.container}>
          <View style={styles.userContent}>
              <Image source={{uri: this.state.user.avatar_url}}
                     style={{width: 120, height: 120}}/>
              <View>
                <Text style={styles.userName}>{this.state.user.name}</Text>
                <Text style={styles.loginName}>{this.state.user.login}</Text>
                <Text>Email: {this.state.user.email}</Text>
                <Text>Created: {this.state.user.created_at}</Text>
                <Text>Location: {this.state.user.location}</Text>
               </View>
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
        debugger
        this.setState({
            user: response
        })
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  userName: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 16
  },
  userContent: {
      flex: 1,
      flexDirection: 'row',
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
