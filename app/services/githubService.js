import helpers from '../helpers.js';

const services = {
  searchUser,
  getUser,
}

  /**
   * Attempts to fetch user name from Github based in user input
   * @method searchUser
   * @param {string} user - User inputed string of searched for user name
   * @param {number} page - Page of pagination
   * @return {Promisei<response>} Promise of API response
   */
  function searchUser(user, page) {
    const url = `https://api.github.com/search/users?q=${user}&per_page=20&page=${page}`
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Attempts to get a user based on user name
   * @method getUser
   * @param {string} user - Github user name
   * @return {Promise<response>} Promise of API response
   */
  function getUser(user) {
    const url = `https://api.github.com/users/${user}`
    return fetch(url)
      .then(helpers.checkStatus)
      .then(helpers.parseJson)
      .then(data => data)
      .catch(error => {
        console.log(`[Github Service] Error /user : ${error}`);
        throw error;
      })
  }


export default services;

