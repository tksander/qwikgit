const services = {
  searchUser
}

  function searchUser(user) {
    const url = 'https://api.github.com/search/users?q=' + user
    debugger
    fetch(url)
      .then((response) => {
        debugger
        return response.json();
      })
      .then((responseJson) => {
        debugger
        return responseJson;
      })
      .catch(error => {
        console.log('[Github Service] Error /search/users : '  + error);
        throw error;
      })
  }


export default services;

