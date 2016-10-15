import helpers from '../helpers.js';

const services = {
  searchUser,
  getUser,

}

  function searchUser(user) {
    debugger
    const url = 'https://api.github.com/search/users?q=' + user + '&per_page=20'
    return fetch(url)
      .then(helpers.checkStatus)
      .then(helpers.parseJson)
      .then(data => data)
      .catch(error => {
        console.log('[Github Service] Error /search/users : '  + error.toString());
      })
  }

  function getUser(user) {
    const url = 'https://api.github.com/users/' + user
    return fetch(url)
      .then(helpers.checkStatus)
      .then(helpers.parseJson)
      .then(data => data)
      .catch(error => {
        console.log('[Github Service] Error /user : '  + error);
      })
  }


export default services;

