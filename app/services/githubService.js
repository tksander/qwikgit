import helpers from '../helpers.js';

const services = {
  searchUser
}

  function searchUser(user) {
    const url = 'https://api.github.com/search/users?q=' + user
    return fetch(url)
      .then(helpers.checkStatus)
      .then(helpers.parseJson)
      .then(data => data)
      .catch(error => {
        console.log('[Github Service] Error /search/users : '  + error);
        throw error;
      })
  }


export default services;

