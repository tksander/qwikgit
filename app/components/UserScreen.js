import React, {Component} from 'react';
import { View,
         Image,
         Text,
         ActivityIndicator,
         StyleSheet} from 'react-native';
import githubService from '../services/githubService'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'

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
    let createDate = moment(this.state.user.created_at).format('MMM Do, YYYY')
    if(!(Object.keys(this.state.user).length === 0)) {
      return (
        <View style={styles.container}>
          <View style={styles.userContent}>
              <Image source={{uri: this.state.user.avatar_url}}
                     style={styles.userImage}/>
              <View>
                <View style={styles.namesContainer}>
                  <Text style={styles.userName}>{this.state.user.name}</Text>
                  <Text style={styles.loginName}>{this.state.user.login}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.rowInfo}>
                    <Icon name="envelope-o" size={18} style={styles.infoIcon} /><Text style={styles.infoText}>{this.state.user.email}</Text>
                  </View>
                  <View style={styles.rowInfo}>
                    <Icon name="github" size={18} style={styles.infoIcon} /><Text style={styles.infoText}>Joined {createDate}</Text>
                  </View>
                  <View style={styles.rowInfo}>
                    <Icon name="globe" size={18} style={styles.infoIcon} /><Text style={styles.infoText}>{this.state.user.location}</Text>
                  </View>
                </View>
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
        this.setState({
            user: response
        })
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  infoIcon: {
      color: 'grey',
      paddingHorizontal: 5
  },
  rowInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      fontFamily: 'Helvetica',
      fontSize: 13,
      paddingVertical: 3
  },
  infoText: {
      fontFamily: 'Helvetica',
      fontSize: 12,
  },
  userImage: {
      width: 120,
      height: 120,
      borderRadius: 4
  },
  userName: {
      fontFamily: 'Helvetica-Bold',
      fontSize: 16
  },
  loginName: {
      fontFamily: 'Helvetica',
      fontSize: 13,
      color: 'grey',
  },
  namesContainer: {
    paddingHorizontal: 15,
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
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
